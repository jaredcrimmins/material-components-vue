import Vue, {VueConstructor, VNode} from 'vue';

interface Injections {
  mdcDialogTitleID__: string
}

export default (<VueConstructor<Vue & Injections>>Vue).extend({
  name: 'mdc-dialog-title',

  inheritAttrs: true,

  inject: ['mdcDialogTitleID__'],

  render(c): VNode | void {
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
});
