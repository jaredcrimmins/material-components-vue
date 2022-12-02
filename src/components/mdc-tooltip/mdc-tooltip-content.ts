import Vue, {CreateElement} from 'vue';

export default Vue.extend({
  name: 'mdc-tooltip-content',

  inheritAttrs: true,

  render(c: CreateElement) {
    return c(
      'p',
      {
        staticClass: 'mdc-tooltip__content'
      },
      this.$slots.default
    );
  }
});
