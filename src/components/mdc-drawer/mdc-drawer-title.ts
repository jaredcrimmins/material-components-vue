import Vue from 'vue';

export default Vue.extend({
  name: 'mdc-drawer-title',

  props: {
    tag: {
      type: String,
      default: 'h3'
    }
  },

  render(c) {
    return c(
      this.tag,
      {
        staticClass: 'mdc-drawer__title'
      },
      this.$slots.default
    );
  }
});
