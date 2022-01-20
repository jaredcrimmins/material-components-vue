import Vue, {VueConstructor, VNode} from 'vue';

interface Injections {
  mdcDialogContentID__: string
}

export default (<VueConstructor<Vue & Injections>>Vue).extend({
  name: 'mdc-dialog-content',

  inheritAttrs: true,

  inject: ['mdcDialogContentID__'],

  render(c): VNode {
    if (!this.$slots.default) c();

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
});
