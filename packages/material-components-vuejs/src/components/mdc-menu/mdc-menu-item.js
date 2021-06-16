import {MDCListItem} from "./../mdc-list";

export default {
  name: "mdc-menu-item",

  components: {
    "mdc-list-item": MDCListItem
  },

  props: {
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
          value: this.value
        }
      },
      this.$slots.default
    );
  }
}