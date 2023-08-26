import Vue, {CreateElement, VNode, VueConstructor} from 'vue';

export default (<VueConstructor>Vue).extend({
  name: 'mdc-card',

  inheritAttrs: true,

  props: {
    outlined: Boolean
  },

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-card',
        class: {
          'mdc-card--outlined': this.outlined
        }
      },
      this.$slots.default
    );
  }
});
