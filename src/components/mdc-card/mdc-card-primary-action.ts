import {MDCRipple} from '../mdc-ripple';
import Vue, {VNode, VueConstructor} from 'vue';

export default (<VueConstructor>Vue).extend({
  name: 'mdc-card-primary-action',

  inheritAttrs: true,

  components: {
    'mdc-ripple': MDCRipple
  },

  props: {
    rippleDisabled: Boolean
  },

  render(c): VNode {
    return c(
      'mdc-ripple',
      {
        staticClass: 'mdc-card__primary-action',
        props: {
          disabled: this.rippleDisabled
        },
        attrs: {
          tabindex: '0'
        }
      },
      this.$slots.default
    );
  }
});
