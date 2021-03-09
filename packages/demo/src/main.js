import App from "./app.vue";
import MaterialComponentsVue from "./../../material-components-vuejs/src/index";
import Vue from "vue";

Vue.config.productionTip = false;

Vue.use(MaterialComponentsVue);

export function createApp() {
  const app = new Vue({
    render: c => c(App)
  });

  return {app};
}