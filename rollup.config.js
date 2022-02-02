import typescript from '@rollup/plugin-typescript';

const input = 'src/index.ts';
const plugins = [typescript()];
const external = [
  /@material/,
  'vue'
];

export default [
  {
    input,
    output: {
      file: 'dist/material-components-vuejs.esm.js',
      format: 'es',
      sourcemap: true
    },
    plugins,
    external
  },
  {
    input,
    output: {
      file: 'dist/material-components-vuejs.common.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins,
    external
  }
];
