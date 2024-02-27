import {MDCIconButton} from '../mdc-icon-button';
import Vue from 'vue';

export default Vue.extend({
  name: 'mdc-top-app-bar-action-item',

  inheritAttrs: true,

  components: {
    'mdc-icon-button': MDCIconButton
  },

  props: {
    disabled: Boolean,
    rippleDisabled: Boolean,
    icon: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: 'button'
    }
  },

  render(c) {
    return c(
      'mdc-icon-button',
      {
        staticClass: 'mdc-top-app-bar__action-item',
        props: {
          disabled: this.disabled,
          rippleDisabled: this.rippleDisabled,
          icon: this.icon,
          tag: this.tag
        },
        on: {
          click: () => this.$emit('click')
        }
      }
    );
  }
});
