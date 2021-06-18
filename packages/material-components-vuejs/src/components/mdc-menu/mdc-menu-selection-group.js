import {cssClasses} from "@material/menu";

export default {
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

  render(c) {
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
}