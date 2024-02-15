import {linkable} from '@/mixins';
import {MDCListItem} from '../mdc-list';
import {mixins} from '@/utils';

const baseMixins = mixins(linkable);

export default baseMixins.extend({
  name: 'mdc-drawer-list-item',

  components: {
    'mdc-list-item': MDCListItem
  },

  props: {
    primaryText: String,
    rippleDisabled: Boolean,
    secondaryText: String
  },

  render(c) {
    return c(
      'mdc-list-item',
      {
        props: {
          primaryText: this.primaryText,
          rippleDisabled: this.rippleDisabled,
          secondaryText: this.secondaryText,
        },
        scopedSlots: {
          graphic: () => this.$slots.graphic
        }
      },
      this.$slots.default
    );
  }
});
