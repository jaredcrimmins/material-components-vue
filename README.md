# Material Components Vue.js

Material Design components for Vue

[GitHub](https://github.com/jaredcrimmins/material-components-vuejs) |
[NPM](https://www.npmjs.com/package/@jaredcrimmins/material-components-vuejs)

Material Components Vue.js implements [Material Components Web](https://github.com/material-components/material-components-web) in Vue, using the advanced approach.

## Install

```shell
npm install @jaredcrimmins/material-components-vuejs
```

## Usage

The entirety of Material Components Vue.js can be installed globally, or you can install individual components à la carte.

### Global

```js
// src/main.js
import {MaterialComponentsVuejs} from '@jaredcrimmins/material-components-vuejs';
import Vue from 'vue';

// Install plugin
Vue.use(MaterialComponentsVuejs);
```

### À la carte

```js
// src/main.js
import {MdcButton} from '@jaredcrimmins/material-components-vuejs';
import Vue from 'vue';

Vue.component(MdcButton);
```
