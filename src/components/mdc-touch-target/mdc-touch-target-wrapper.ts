import Vue, {CreateElement} from 'vue';

export default Vue.extend({
  name: 'mdc-touch-target-wrapper',

  provide(): object {
    return {
      mdcTouchTargetWrapperParent__: true
    };
  },

  render(c: CreateElement) {
    return c(
      'div',
      {
        staticClass: 'mdc-touch-target-wrapper'
      },
      this.$slots.default
    );
  }
});
