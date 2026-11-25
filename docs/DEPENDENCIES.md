# Direct dependencies

P0-01 pins Node v24.22.3 in `.nvmrc` and `package.json`. The npm lockfile pins the resolved dependency tree.

| Package | Exact version | Reason | Licence | Maintenance at P0-01 | Lighter alternative |
|---|---|---|---|---|---|
| `@types/node` | 24.19.4 | Type-check Node APIs against the Node 24 line | MIT | DefinitelyTyped publishes updates for Node 24 | Handwritten types for the Node APIs used, with ongoing upkeep |
| `electron` | 45.5.0 | Start the desktop app and host the local shell in a sandboxed renderer | MIT | Current stable major with Chromium security updates | Tauri uses the system webview and adds a Rust toolchain |
| `eslint` | 10.15.0 | Lint app, tests and build scripts | MIT | Maintained major with published rule and bug fixes | TypeScript checks alone, with reduced lint coverage |
| `prettier` | 3.10.1 | Check formatting consistently across source and tooling | MIT | Maintained stable release line | EditorConfig for basic whitespace only |
| `typescript` | 6.0.3 | Compile the main process and enforce strict types | Apache-2.0 | Maintained 6.0 line supported by the pinned lint tooling | JavaScript with `checkJs` still needs the TypeScript checker |
| `typescript-eslint` | 8.74.0 | Parse TypeScript and apply recommended lint rules | MIT | Maintained v8 line with ESLint 10 and TypeScript 6.0 support | TypeScript parser alone, without TypeScript-specific rules |
| `vitest` | 5.1.2 | Run scaffold unit tests and mock the Electron window API | MIT | Maintained stable release line supporting Node 24 | Node's test runner, with separate compile and mocking setup |
