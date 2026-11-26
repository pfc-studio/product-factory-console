import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

type Constant = number | bigint | string | boolean | null;
type ReadConstant = (node: ts.Node) => Constant | undefined;

function foldNumber(operator: ts.SyntaxKind, left: number, right: number) {
  switch (operator) {
    case ts.SyntaxKind.PlusToken:
      return left + right;
    case ts.SyntaxKind.MinusToken:
      return left - right;
    case ts.SyntaxKind.AsteriskToken:
      return left * right;
    case ts.SyntaxKind.SlashToken:
      return left / right;
    case ts.SyntaxKind.PercentToken:
      return left % right;
    case ts.SyntaxKind.AsteriskAsteriskToken:
      return left ** right;
    case ts.SyntaxKind.LessThanLessThanToken:
      return left << right;
    case ts.SyntaxKind.GreaterThanGreaterThanToken:
      return left >> right;
    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
      return left >>> right;
    case ts.SyntaxKind.AmpersandToken:
      return left & right;
    case ts.SyntaxKind.BarToken:
      return left | right;
    case ts.SyntaxKind.CaretToken:
      return left ^ right;
  }
}

function foldBigInt(operator: ts.SyntaxKind, left: bigint, right: bigint) {
  // Bound operands and powers so source expressions cannot exhaust memory.
  const magnitudeLimit = 1n << 4096n;
  if (
    left <= -magnitudeLimit ||
    left >= magnitudeLimit ||
    right <= -magnitudeLimit ||
    right >= magnitudeLimit
  ) {
    return;
  }

  switch (operator) {
    case ts.SyntaxKind.PlusToken:
      return left + right;
    case ts.SyntaxKind.MinusToken:
      return left - right;
    case ts.SyntaxKind.AsteriskToken:
      return left * right;
    case ts.SyntaxKind.SlashToken:
      return right === 0n ? undefined : left / right;
    case ts.SyntaxKind.PercentToken:
      return right === 0n ? undefined : left % right;
    case ts.SyntaxKind.AsteriskAsteriskToken:
      return right < 0n || right > 1024n ? undefined : left ** right;
    case ts.SyntaxKind.LessThanLessThanToken:
      return right < -4096n || right > 4096n ? undefined : left << right;
    case ts.SyntaxKind.GreaterThanGreaterThanToken:
      return right < -4096n || right > 4096n ? undefined : left >> right;
    case ts.SyntaxKind.AmpersandToken:
      return left & right;
    case ts.SyntaxKind.BarToken:
      return left | right;
    case ts.SyntaxKind.CaretToken:
      return left ^ right;
  }
}

function foldBinary(node: ts.BinaryExpression, read: ReadConstant) {
  const left = read(node.left);
  const right = read(node.right);
  const operator = node.operatorToken.kind;
  if (left === undefined || right === undefined) return;
  if (
    operator === ts.SyntaxKind.PlusToken &&
    (typeof left === "string" || typeof right === "string")
  ) {
    return String(left) + String(right);
  }
  if (typeof left === "bigint" || typeof right === "bigint") {
    return typeof left === "bigint" && typeof right === "bigint"
      ? foldBigInt(operator, left, right)
      : undefined;
  }
  return foldNumber(operator, Number(left), Number(right));
}

function foldUnary(node: ts.PrefixUnaryExpression, read: ReadConstant) {
  const value = read(node.operand);
  if (value === undefined) return;
  switch (node.operator) {
    case ts.SyntaxKind.PlusToken:
      return typeof value === "bigint" ? undefined : Number(value);
    case ts.SyntaxKind.MinusToken:
      return typeof value === "bigint" ? -value : -Number(value);
    case ts.SyntaxKind.TildeToken:
      return typeof value === "bigint" ? ~value : ~Number(value);
    case ts.SyntaxKind.ExclamationToken:
      return !value;
  }
}

function foldConversion(
  name: string,
  value: Constant | undefined,
  radix: Constant | undefined,
) {
  switch (name) {
    case "Number":
      return value === undefined ? 0 : Number(value);
    case "BigInt":
      if (value === undefined || value === null) return;
      try {
        return BigInt(value);
      } catch (error) {
        if (!(error instanceof RangeError || error instanceof SyntaxError)) {
          throw error;
        }
        return;
      }
    case "parseInt":
      return typeof radix === "bigint"
        ? undefined
        : Number.parseInt(String(value), Number(radix));
    case "parseFloat":
      return Number.parseFloat(String(value));
  }
}

function foldCall(node: ts.CallExpression, read: ReadConstant) {
  const args = node.arguments.map(read);
  if (!args.every((value) => value !== undefined)) return;
  const first = args.at(0);
  const callee = unwrap(node.expression);
  if (ts.isIdentifier(callee)) {
    return foldConversion(callee.text, first, args.at(1));
  }
  if (
    !ts.isPropertyAccessExpression(callee) &&
    !ts.isElementAccessExpression(callee)
  ) {
    return;
  }

  const name = ts.isPropertyAccessExpression(callee)
    ? callee.name.text
    : read(callee.argumentExpression);
  const base = unwrap(callee.expression);
  if (
    ts.isIdentifier(base) &&
    base.text === "Number" &&
    (name === "parseInt" || name === "parseFloat")
  ) {
    return foldConversion(name, first, args.at(1));
  }

  const receiver = read(base);
  if (receiver === undefined || receiver === null) return;
  if (name === "valueOf") return receiver;
  if (name !== "toString") return;
  if (typeof receiver !== "number" && typeof receiver !== "bigint") {
    return String(receiver);
  }
  if (typeof first === "bigint") return;
  const radix = first === undefined ? 10 : Math.trunc(Number(first));
  if (radix >= 2 && radix <= 36) return receiver.toString(radix);
}

function wrappedExpression(node: ts.Node) {
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isTypeAssertionExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    return node.expression;
  }
}

function unwrap(node: ts.Expression): ts.Expression {
  const inner = wrappedExpression(node);
  return inner === undefined ? node : unwrap(inner);
}

function fold(node: ts.Node, read: ReadConstant): Constant | undefined {
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isBigIntLiteral(node)) return BigInt(node.text.slice(0, -1));
  if (ts.isStringLiteralLike(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  const inner = wrappedExpression(node);
  if (inner !== undefined) return read(inner);
  if (ts.isPrefixUnaryExpression(node)) return foldUnary(node, read);
  if (ts.isBinaryExpression(node)) return foldBinary(node, read);
  if (ts.isCallExpression(node)) return foldCall(node, read);
}

function matchesLimit(value: Constant, limits: ReadonlySet<number | null>) {
  if (typeof value === "number") return limits.has(value);
  if (typeof value !== "bigint") return false;
  const number = Number(value);
  return (
    Number.isInteger(number) && limits.has(number) && BigInt(number) === value
  );
}

function scanFile(file: string, limits: ReadonlySet<number | null>) {
  const source = readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest);
  const constants = new Map<ts.Node, Constant>();
  const lines = new Set<number>();
  const read = (node: ts.Node) => constants.get(node);

  function visit(node: ts.Node) {
    ts.forEachChild(node, visit);
    const value = fold(node, read);
    if (value === undefined) return;
    constants.set(node, value);
    if (matchesLimit(value, limits)) {
      lines.add(ast.getLineAndCharacterOfPosition(node.getStart(ast)).line);
    }
  }

  visit(ast);
  const lineStarts = ast.getLineStarts();
  return [...lines]
    .sort((left, right) => left - right)
    .map((line) => {
      const text = source.slice(lineStarts[line], lineStarts[line + 1]).trim();
      return `${file}:${line + 1}: ${text}`;
    });
}

export function findHardCodedLimits(
  sourceDirectory: string,
  limits: ReadonlySet<number | null>,
): string[] {
  return readdirSync(sourceDirectory, { recursive: true, withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() && /\.(?:[cm]?[jt]s|[jt]sx)$/iu.test(entry.name),
    )
    .flatMap((entry) => scanFile(join(entry.parentPath, entry.name), limits));
}
