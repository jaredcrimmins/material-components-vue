export default {
  name: 'mdc-dialog-content',

  inheritAttrs: true,

  inject: ['mdcDialogContentID__'],

  render(c) {
    if (!this.$slots.default) return;

    return c(
      'div',
      {
        staticClass: 'mdc-dialog__content',
        attrs: {
          id: this.mdcDialogContentID__
        }
      },
      this.$slots.default
    );
  }
}