export default {
  name: "material-icon",

  props: {
    icon: String,
    tag: {
      type: String,
      default: "i"
    }
  },

  render(c) {
    return c(
      this.tag,
      {
        staticClass: "material-icons"
      },
      this.icon
    );
  }
};