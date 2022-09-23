import {MDCRipple} from '../mdc-ripple';
import {VNode} from 'vue';
import {linkable} from '@/mixins';
import {mixins} from '@/utils';

const baseMixins = mixins(linkable);

export default baseMixins.extend({
  name: 'mdc-button',

  inheritAttrs: true,

  components: {
    'mdc-ripple': MDCRipple
  },

  props: {
    disabled: Boolean,
    outlined: Boolean,
    raised: Boolean,
    rippleDisabled: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    unelevated: Boolean
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
                this.$slots.append,
                c(
                  'span',
                  {
                    staticClass: 'mdc-button__label'
                  },
                  this.$slots.default
                ),
                this.$slots.trailing
              ]
            );
          }
        }
      }
    );
  },

  methods: {
    onClick(event: MouseEvent) {
      this.$emit('click', event);
    }
  }
});
