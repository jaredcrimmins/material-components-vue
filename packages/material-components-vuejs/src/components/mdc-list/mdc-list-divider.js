export default {
  name: "mdc-list-divider",

  render(c) {
    return c(
      "li",
      {
        staticClass: "mdc-list-divider",
        attrs: {
          role: "seperator"
        }
      }
    );
  }
}