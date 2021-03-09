export default {
  name: "mdc-image-list",

  props: {
    masonry: Boolean,
    textProtection: Boolean
  },

  render(c) {
    return c(
      "ul",
      {
        staticClass: "mdc-image-list",
        class: {
          "mdc-image-list--masonry": this.masonry,
          "mdc-image-list--with-text-protection": this.textProtection
        }
      },
      this.$slots.default
    );
  }
}