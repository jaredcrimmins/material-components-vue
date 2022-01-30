import typescript from '@rollup/plugin-typescript';

const input = 'src/index.ts';
const plugins = [typescript()];
const external = [
  '@material/animation',
  '@material/checkbox',
  '@material/circular-progress',
  '@material/dialog',
  '@material/dom',
  '@material/floating-label',
  '@material/icon-button',
  '@material/linear-progress',
  '@material/line-ripple',
  '@material/list',
  '@material/menu',
  '@material/menu-surface',
  '@material/notched-outline',
  '@material/radio',
  '@material/ripple',
  '@material/snackbar',
  '@material/select',
  '@material/switch',
  '@material/tab',
  '@material/tab-bar',
  '@material/tab-indicator',
  '@material/tab-scroller',
  '@material/textfield',
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
