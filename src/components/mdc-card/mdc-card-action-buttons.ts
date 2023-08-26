import Vue, {VNode, VueConstructor} from 'vue';

export default (<VueConstructor>Vue).extend({
  name: 'mdc-card-action-buttons',

  inheritAttrs: true,

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-card__action-buttons'
      },
      this.$slots.default
    );
  }
});
