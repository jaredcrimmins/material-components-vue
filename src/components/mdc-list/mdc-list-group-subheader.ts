import Vue from 'vue';

export default Vue.extend({
  name: 'mdc-list-group-subheader',

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
        staticClass: 'mdc-list-group__subheader'
      },
      this.$slots.default
    );
  }
});
