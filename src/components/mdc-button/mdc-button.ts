import {MDCRipple} from '../mdc-ripple';
import {VNode} from 'vue';
import {getSlot, mixins} from '@/utils';
import {buttonable, linkable} from '@/mixins';

const baseMixins = mixins(buttonable, linkable);

export default baseMixins.extend({
  name: 'mdc-button',

  inheritAttrs: true,

  components: {
    'mdc-ripple': MDCRipple
  },

  render(c): VNode {
    return c(
      'mdc-ripple',
      {
        props: {
          disabled: this.rippleDisabled,
          standalone: false
        },
        scopedSlots: {
          root: ({cssClass, on, style}) => {
            const isTagNameButton = this.tag === 'button';
            const scopedSlotProps = {
              cssClass: {'mdc-button__icon': true},
              attrs: {'aria-hidden': true}
            };

            return c(
              this.tag,
              {
                staticClass: 'mdc-button',
                class: Object.assign({
                  'mdc-button--outlined': this.outlined,
                  'mdc-button--raised': this.raised,
                  'mdc-button--unelevated': this.unelevated
                }, cssClass),
                attrs: {
                  disabled: isTagNameButton && this.disabled,
                  href: this.href
                },
                style,
                props: {
                  to: this.to
                },
                on: {
                  blur: on.blur,
                  click: this.onClick,
                  focus: on.focus
                }
              },
              [
                c(
                  'div',
                  {
                    staticClass: 'mdc-button__ripple'
                  }
                ),
                getSlot(this, 'append', scopedSlotProps, true),
                c(
                  'span',
                  {
                    staticClass: 'mdc-button__label'
                  },
                  this.$slots.default
                ),
                getSlot(this, 'trailing', scopedSlotProps, true)
              ]
            );
          }
        }
      }
    );
  }
});
