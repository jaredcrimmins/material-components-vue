import Vue, {CreateElement, VNode} from 'vue';
import {attributes} from '@material/tooltip';
import {getSlot} from '../../utils';

export default Vue.extend({
  name: 'mdc-tooltip-wrapper',

  inheritAttrs: true,

  provide(): object {
    return {
      mdcTooltipWrapperAnchorAttrs__: this.anchorAttrs,
      mdcTooltipWrapperRich__: true
    };
  },

  data() {
    return {
      anchorAttrs: {
        [attributes.ARIA_EXPANDED]: true,
        [attributes.ARIA_HASPOPUP]: 'dialog'
      }
    };
  },

  render(c: CreateElement): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-tooltip-wrapper--rich'
      },
      getSlot(this, 'default', {
        attrs: this.anchorAttrs
      })
    )
  }
});
