export default {
  name: "material-icon",

  props: {
    tag: { type: String, default: "i" },
  },

  render(c) {
    return c(
      this.tag,
      {
        staticClass: "material-icons"
      },
      this.$slots.default
    );
  }
};