"use-strict"

import App from "./app.vue";
import Vue from "vue";

Vue.config.productionTip = false;

const app = new Vue({
  render: h => h(App)
});

app.$mount("#app");