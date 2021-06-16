export default {
  name: "mdc-list-group",

  render(c) {
    return c(
      "div",
      {
        staticClass: "mdc-list-group"
      },
      this.$slots.default
    );
  }
}