import Vue from 'vue';
import {removeKeys} from '../utils';

const buttonableProps = {
  disabled: Boolean,
  outlined: Boolean,
  raised: Boolean,
  rippleDisabled: Boolean,
  tag: {
    type: String,
    deafult: 'button'
  },
  unelevated: Boolean
};

type ButtonablePropsType = typeof buttonableProps;

type ButtonablePropsUnion = keyof ButtonablePropsType;

export default Vue.extend({
  name: 'buttonable',

  props: buttonableProps,

  methods: {
    getButtonablePropsOptions(omitProps?: ButtonablePropsUnion[]) {
      return removeKeys(
        {
          disabled: this.disabled,
          outlined: this.outlined,
          raised: this.raised,
          rippleDisabled: this.rippleDisabled,
          tag: this.tag,
          unelevated: this.unelevated
        },
        omitProps
      )
    },

    onClick(event: MouseEvent) {
      this.$emit('click', event);
    }
  }
});
