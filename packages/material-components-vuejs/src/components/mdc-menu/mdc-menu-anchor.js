export default {
  name: "mdc-menu-anchor",

  render(c) {
    return c(
      "div",
      {
        staticClass: "mdc-menu-surface--anchor"
      },
      this.$slots.default
    );
  }
}