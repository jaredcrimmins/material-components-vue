# Material Components Vue

Material Design components for Vue

[GitHub](https://github.com/jaredcrimmins/material-components-vue) |
[NPM](https://www.npmjs.com/package/@jaredcrimmins/material-components-vue) | [Docs](https://mcv.crimmins.io)

Material Components Vue implements [Material Components Web](https://github.com/material-components/material-components-web) in Vue, using the advanced approach.

## Install

```shell
npm install @jaredcrimmins/material-components-vue
```

## Usage

The entirety of Material Components Vue can be installed globally, or you can install individual components à la carte.

### Global

```js
// src/main.js
import {MaterialComponentsVue} from '@jaredcrimmins/material-components-vue';
import Vue from 'vue';

// Install plugin
Vue.use(MaterialComponentsVue);
```

### À la carte

```js
// src/main.js
import {MDCButton} from '@jaredcrimmins/material-components-vue';
import Vue from 'vue';

Vue.component(MDCButton);
```
