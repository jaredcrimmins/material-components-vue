---
title: Getting Started
---

# Getting Started

## Installation

Material Components Vue is dependent the upstream project [Material Components Web](https://github.com/material-components/material-components-web/tree/v10.0.0). Version `1.0` of Material Components Vue implements version `10.0.0` of Material Components Web.

`material-components-web@^10.0.0` must be installed alongside `@jaredcrimmins/material-components-vue`. Material Components Web supports installing the dependencies needed for each individual component in an à la carte fashion, but because of how Material Components Vue is bundled, this won't work.

:::tip
Correct installation
:::

```sh
npm install @jaredcrimmins/material-components-vue material-components-web@^10.0.0
```

:::danger
Incorrect installation — This won't work
:::

```sh
npm install @jaredcrimmins/material-components-vue @material/button@^10.0.0
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