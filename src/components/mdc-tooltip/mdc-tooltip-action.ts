import {VNode} from 'vue';
import {getSlot} from '../../utils';
import {linkable} from '../../mixins';
import {mixins} from '../../utils';

const baseMixins = mixins(linkable);

export default baseMixins.extend({
  name: 'mdc-tooltip-action',

  inheritAttrs: true,

  props: {
    tag: {
      type: String,
      default: 'button'
    }
  },

  render(c): VNode {
    const cssClass = {'mdc-tooltip__action': true};
    const attrs = {'aria-label': 'action'};
    const rootSlot = getSlot(this, 'root', {cssClass, attrs});

    if (rootSlot) return rootSlot[0];

    return c(
      this.tag,
      {
        class: cssClass,
        attrs: {...attrs, ...{href: this.href}},
        props: {
          to: this.to
        }
      },
      this.$slots.default
    );
  }
});
