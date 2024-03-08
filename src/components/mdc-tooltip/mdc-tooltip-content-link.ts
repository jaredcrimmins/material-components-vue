import {CreateElement} from 'vue';
import {linkable} from '../../mixins';
import {mixins, removeNullish} from '../../utils';

const baseMixins = mixins(linkable);

export default baseMixins.extend({
  name: 'mdc-tooltip-content-link',

  inheritAttrs: true,

  render(c: CreateElement) {
    return c(
      this.tag,
      {
        staticClass: 'mdc-tooltip__content-link',
        attrs: removeNullish({
          href: this.href
        }),
        props: {
          to: this.to
        }
      },
      this.$slots.default
    );
  }
});
