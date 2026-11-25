# Direct dependencies

P0-01 pins Node v26.13.1 in `.nvmrc`, `package.json` and the npm lockfile. Electron 45.5.0 embeds Node v24.22.3, so the app keeps Node 24 types for its main process.

| Package | Exact version | Reason | Licence | Maintenance at P0-01 | Lighter alternative |
|---|---|---|---|---|---|
| `@types/node` | 24.19.4 | Type-check Node APIs against the Node 24 line | MIT | DefinitelyTyped publishes updates for Node 24 | Handwritten types for the Node APIs used, with ongoing upkeep |
| `electron` | 45.5.0 | Start the desktop app and host the local shell in a sandboxed renderer | MIT | Current stable major with Chromium security updates | Tauri uses the system webview and adds a Rust toolchain |
| `eslint` | 10.15.0 | Lint app, tests and build scripts | MIT | Maintained major with published rule and bug fixes | TypeScript checks alone, with reduced lint coverage |
| `prettier` | 3.10.1 | Check formatting consistently across source and tooling | MIT | Maintained stable release line | EditorConfig for basic whitespace only |
| `typescript` | 6.0.3 | Compile the main process and enforce strict types | Apache-2.0 | Maintained 6.0 line supported by the pinned lint tooling | JavaScript with `checkJs` still needs the TypeScript checker |
| `typescript-eslint` | 8.74.0 | Parse TypeScript and apply recommended lint rules | MIT | Maintained v8 line with ESLint 10 and TypeScript 6.0 support | TypeScript parser alone, without TypeScript-specific rules |
| `vitest` | 5.1.2 | Run scaffold unit tests and mock the Electron window API | MIT | Maintained stable release line supporting Node 24 | Node's test runner, with separate compile and mocking setup |

## Config loaders (P0-02)

| Package | Exact version | Reason | Licence | Maintenance | Unpacked bytes | Lighter alternative |
|---|---|---|---|---|---:|---|
| [`yaml`](https://registry.npmjs.org/yaml/2.9.1) | 2.9.1 | Read the committed YAML with bundled types and parser diagnostics | ISC | Stable 2.x, released 2026-09-11 | 686,297 | A restricted local parser adds upkeep for nesting, comments and duplicate keys |
| [`zod`](https://registry.npmjs.org/zod/4.6.7) | 4.6.7 | Validate the three documents with the card’s schema library | MIT | Stable 4.x, released 2026-10-12 | 6,148,944 | Valibot 1.5.0 is 1,865,457 bytes unpacked. The card specifies Zod |

Both packages have zero runtime dependencies.

## Lightning CSS development dependency

On 2026-11-25 at 19:37 UTC, Ashley approved retaining the free, MPL-2.0 Lightning CSS packages in the development toolchain under WORKFLOW §10.11. See [D-025](DECISIONS.md) and [B-003](BLOCKERS.md).

The locked path is `vitest@5.1.2` (dev dependency) → `vite@8.3.8` (required peer) → `lightningcss@1.33.0` → 11 optional platform bindings at `1.33.0`, including `lightningcss-win32-x64-msvc` and `lightningcss-win32-arm64-msvc`. The lockfile marks Vite, Lightning CSS and all those bindings as dev-only. Lightning CSS and its native bindings declare MPL-2.0.

The current app build compiles the TypeScript source and copies the HTML shell. The Lightning CSS chain is absent from `dist` and the production dependency tree. The installer script is a stub. Recheck this scope when installer packaging is introduced.

## GitHub Actions

| Action | Exact version | Reason | Licence | Maintenance at P0-01 | Lighter alternative |
|---|---|---|---|---|---|
| `actions/checkout` | v6.1.0 (`d23441a48e516b6c34aea4fa41551a30e30af803`) | Check out the exact PR head on the Windows runner | MIT | Maintained by GitHub | Plain `git` with explicit authentication and ref handling |
| `actions/setup-node` | v6.5.0 (`249970729cb0ef3589644e2896645e5dc5ba9c38`) | Install the runtime pinned in `.nvmrc` | MIT | Maintained by GitHub | Runner-provided Node, which can drift from the pin |
| `actions/upload-artifact` | v7.0.2 (`cf430e030ddbb5b0abf93d22962f4752f3646cd9`) | Keep the Windows smoke log and app screenshot with the workflow run | [MIT](https://github.com/actions/upload-artifact/blob/cf430e030ddbb5b0abf93d22962f4752f3646cd9/LICENSE) | Maintained by GitHub | Job console log, which cannot retain the screenshot |
