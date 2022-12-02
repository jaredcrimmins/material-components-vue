import Vue, {CreateElement} from 'vue';

export default Vue.extend({
  name: 'mdc-tooltip-rich-actions',

  inheritAttrs: true,

  render(c: CreateElement) {
    return c(
      'div',
      {
        staticClass: 'mdc-tooltip--rich-actions'
      },
      this.$slots.default
    );
  }
})
