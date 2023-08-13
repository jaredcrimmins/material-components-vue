import Vue from 'vue';
import {removeKeys} from '../utils';

const iconButtonableProps = {
  disabled: Boolean,
  rippleDisabled: Boolean,
  icon: String,
  tag: String,
  toggleable: Boolean,
  onIcon: String,
};

type IconButtonableProps = typeof iconButtonableProps;

type IconButtonableUnion = keyof IconButtonableProps;

export default Vue.extend({
  name: 'icon-buttonable',

  props: iconButtonableProps,

  methods: {
    getIconButtonablePropsOptions(omitProps?: IconButtonableUnion[]) {
      return removeKeys(
        {
          disabled: this.disabled,
          rippleDisabled: this.rippleDisabled,
          icon: this.icon,
          tag: this.tag,
          toggleable: this.toggleable,
          onIcon: this.onIcon
        },
        omitProps
      )
    }
  }
});
