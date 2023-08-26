import Vue, {VNode, VueConstructor} from 'vue';

export default (<VueConstructor>Vue).extend({
  name: 'mdc-card-action-icons',

  inheritAttrs: true,

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-card__action-icons'
      },
      this.$slots.default
    );
  }
});
