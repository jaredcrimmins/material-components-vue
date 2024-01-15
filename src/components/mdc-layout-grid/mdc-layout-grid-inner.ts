import Vue, {CreateElement} from 'vue';

export default Vue.extend({
  name: 'mdc-layout-grid-inner',

  render(c: CreateElement) {
    return c(
      'div',
      {
        staticClass: 'mdc-layout-grid__inner',
      },
      this.$slots.default
    );
  }
});
