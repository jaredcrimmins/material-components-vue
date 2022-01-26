import {MDCListDivider} from "../mdc-list";
import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-menu-divider",

  components: {
    "mdc-list-divider": MDCListDivider
  },

  render(c): VNode {
    return c(
      "mdc-list-divider"
    );
  }
});
