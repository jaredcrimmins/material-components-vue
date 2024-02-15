import Vue from 'vue';

export default Vue.extend({
  name: 'mdc-drawer-subtitle',

  props: {
    tag: {
      type: String,
      default: 'h6'
    }
  },

  render(c) {
    return c(
      this.tag,
      {
        staticClass: 'mdc-drawer__subtitle'
      },
      this.$slots.default
    );
  }
});
