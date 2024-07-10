## Reproduce

1. run `npm run expo start` and press **w**
2. press **F12** on opened browser page and switch to console tab
3. after bundler finished, you can see this error

```
AppEntry.bundle:87829
Uncaught Syntax Error: Cannot use 'import.meta' outside a module
```

## Others

if you add `"type": "module"` to `package.json` and restart dev server, you will see follow error:

```
Error [ERR_REQUIRE_ESM]: require() of ES Module /xxx/metro.config.js from /xxx/node_modules/metro-config/node_modules/import-fresh/index.js not supported.
metro.config.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.
Instead either rename metro.config.js to end in .cjs, change the requiring code to use dynamic import() which is available in all CommonJS modules, or change "type": "module" to "type": "commonjs" in /xxx/package.json to treat all .js files as CommonJS (using .mjs for all ES modules instead).
```
