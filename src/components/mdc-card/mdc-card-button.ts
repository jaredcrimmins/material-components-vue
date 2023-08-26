import {CreateElement} from 'vue';
import {MDCButton} from '../mdc-button';
import {buttonable} from '../../mixins';
import {mixins} from '../../utils';

const baseMixins = mixins(
  buttonable
);

export default baseMixins.extend({
  name: 'mdc-card-button',

  inheritAttrs: true,

  components: {
    'mdc-button': MDCButton
  },

  render(c: CreateElement) {
    return c(
      'mdc-button',
      {
        staticClass: 'mdc-card__action mdc-card__action--button',
        props: this.getButtonablePropsOptions(['rippleDisabled']),
        scopedSlots: {
          append: (scopedSlotProps) => {
            if (this.$scopedSlots.append)
              return this.$scopedSlots.append(scopedSlotProps);
            else return undefined;
          },
          trailing: (scopedSlotProps) => {
            if (this.$scopedSlots.trailing)
              return this.$scopedSlots.trailing(scopedSlotProps);
            else return undefined;
          }
        }
      },
      this.$slots.default
    );
  }
});
