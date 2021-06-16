export default {
  name: 'mdc-dialog-title',

  inheritAttrs: true,

  inject: ['mdcDialogTitleID__'],

  render(c) {
    if (!this.$slots.default) return;

    return c(
      'div',
      {
        staticClass: 'mdc-dialog__title',
        attrs: {
          id: this.mdcDialogTitleID__
        }
      },
      this.$slots.default
    );
  }
}