import Vue, {VNode, VueConstructor} from 'vue';

export default (<VueConstructor>Vue).extend({
  name: 'mdc-card-actions',

  inheritAttrs: true,

  props: {
    fullBleed: Boolean
  },

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-card__actions',
        class: {
          'mdc-card__actions--full-bleed': this.fullBleed
        }
      },
      this.$slots.default
    );
  }
});
