export default {
  name: 'mdc-dialog-actions',

  inheritAttrs: true,

  render(c) {
    if (!this.$slots.default) return;

    return c(
      'div',
      {
        staticClass: 'mdc-dialog__actions'
      },
      this.$slots.default
    );
  }
}