export default {
  name: "mdc-list-group",

  render(c) {
    return c(
      "div",
      {
        staticClass: "mdc-deprecated-list-group"
      },
      this.$slots.default
    );
  }
}