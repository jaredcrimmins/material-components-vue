import {CreateElement} from 'vue';
import {MDCIconButton} from '../mdc-icon-button';
import {iconButtonable} from '../../mixins';
import {mixins} from '../../utils';

const baseMixins = mixins(
  iconButtonable
);

export default baseMixins.extend({
  name: 'mdc-card-icon-button',

  inheritAttrs: true,

  components: {
    'mdc-icon-button': MDCIconButton
  },

  render(c: CreateElement) {
    return c(
      'mdc-icon-button',
      {
        staticClass: 'mdc-card__action mdc-card__action--icon',
        props: this.getIconButtonablePropsOptions(),
        scopedSlots: {
          icon: (iconScopedSlotProps) => {
            if (this.$scopedSlots.icon)
              return this.$scopedSlots.icon(iconScopedSlotProps);
            else return undefined;
          },

          onIcon: (scopedSlotProps) => {
            if (this.$scopedSlots.onIcon)
              return this.$scopedSlots.onIcon(scopedSlotProps);
            else return undefined;
          }
        }
      }
    );
  }
});
