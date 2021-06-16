import {MDCButton} from '../../mdc-button';
import {strings} from '@material/dialog';

export default {
  name: 'mdc-dialog-button',

  inheritAttrs: true,

  props: {
    action: String,
    disabled: Boolean,
    initialFocus: Boolean,
    outlined: Boolean,
    raised: Boolean,
    unelevated: Boolean
  },

  components: {
    'mdc-button': MDCButton
  },

  render(c) {
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
}