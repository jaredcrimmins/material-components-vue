import {MDCButton} from '../../mdc-button';
import Vue, {VNode} from 'vue';
import {strings} from '@material/dialog';

export default Vue.extend({
  name: 'mdc-dialog-button',

  inheritAttrs: true,

  props: {
    action: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    initialFocus: Boolean,
    outlined: Boolean,
    raised: Boolean,
    unelevated: Boolean
  },

  components: {
    'mdc-button': MDCButton
  },

  render(c): VNode {
    return c(
      'mdc-button',
      {
        staticClass: 'mdc-dialog__button',
        props: {
          disabled: this.disabled
        },
        attrs: {
          [strings.ACTION_ATTRIBUTE]: this.action,
          [strings.INITIAL_FOCUS_ATTRIBUTE]: this.initialFocus
        }
      },
      this.$slots.default
    );
  }
});
