import {MDCListItem} from "./../mdc-list";

export default {
  name: "mdc-menu-item",

  components: {
    "mdc-list-item": MDCListItem
  },

  props: {
    rippleDisabled: Boolean,
    value: String
  },

  render(c) {
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
}