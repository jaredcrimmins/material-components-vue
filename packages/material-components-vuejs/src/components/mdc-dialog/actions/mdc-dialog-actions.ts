import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: 'mdc-dialog-actions',

  inheritAttrs: true,

  render(c): VNode | void {
    if (!this.$slots.default) return;

    return c(
      'div',
      {
        staticClass: 'mdc-dialog__actions'
      },
      this.$slots.default
    );
  }
});
