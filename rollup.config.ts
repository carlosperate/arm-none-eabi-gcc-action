// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/main.ts',
  output: {
    esModule: true,
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
    // Provide a `require` function for CJS dependencies bundled into this ESM
    // output. Some dependencies (e.g. minimatch v3) use `require('path')` with
    // a try/catch fallback to `{ sep: '/' }`. Without a real `require`, the
    // fallback causes `path.sep` to be '/' on Windows, breaking path matching
    // in @actions/glob (actions/toolkit#2085).
    banner: `import { createRequire as __bundleRequire } from 'module';`,
    intro: `const require = __bundleRequire(import.meta.url);`,
  },
  plugins: [
    typescript(),
    nodeResolve({preferBuiltins: true}),
    commonjs({transformMixedEsModules: true}),
    json()
  ],
};

export default config;
