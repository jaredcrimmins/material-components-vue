import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: 'mdc-dialog-actions',

  inheritAttrs: true,

  render(c): VNode {
    if (!this.$slots.default) c();

    return c(
      'div',
      {
        staticClass: 'mdc-dialog__actions'
      },
      this.$slots.default
    );
  }
});
