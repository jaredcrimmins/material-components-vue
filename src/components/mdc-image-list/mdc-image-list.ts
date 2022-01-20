import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-image-list",

  props: {
    masonry: Boolean,
    textProtection: Boolean
  },

  render(c): VNode {
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
});
