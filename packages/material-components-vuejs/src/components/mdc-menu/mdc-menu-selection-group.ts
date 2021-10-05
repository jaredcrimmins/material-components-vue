import {cssClasses} from "@material/menu";
import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-menu-selection-group",

  props: {
    icon: {
      type: String,
      default: "check"
    }
  },

  provide() {
    return {
      menuSelectionGroup: true,
      menuSelectionGroupIcon: this.icon
    };
  },

  render(c): VNode {
    return c(
      "li",
      [
        c(
          "ul",
          {
            staticClass: cssClasses.MENU_SELECTION_GROUP
          },
          this.$slots.default
        )
      ]
    );
  }
});
