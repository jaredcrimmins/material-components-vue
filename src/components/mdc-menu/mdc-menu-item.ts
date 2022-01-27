import {MDCListItem} from "./../mdc-list";
import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-menu-item",

  components: {
    "mdc-list-item": MDCListItem
  },

  props: {
    rippleDisabled: Boolean,
    value: {
      type: String,
      default: ""
    }
  },

  render(c): VNode {
    return c(
      "mdc-list-item",
      {
        attrs: {
          role: "menuitem"
        },
        props: {
          rippleDisabled: this.rippleDisabled,
          value: this.value
        }
      },
      this.$slots.default
    );
  }
});
