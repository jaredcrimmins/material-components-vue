import App from "./app.vue";
import MaterialComponentsVue from "./../../material-components-vuejs/src/index";
import {VDebugContent} from "./components";
import Vue from "vue";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(MaterialComponentsVue);
Vue.component("v-debug-content", VDebugContent);

export function createApp() {
  const app = new Vue({
    render: c => c(App)
  });

  return {app};
}