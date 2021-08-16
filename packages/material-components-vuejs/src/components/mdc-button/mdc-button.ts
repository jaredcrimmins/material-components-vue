import {MDCRipple} from '../mdc-ripple';
import Vue, {VNode} from 'vue';

export default Vue.extend({
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
    to: {
      type: String,
      default: ''
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
            const tagName = this.to ? 'router-link' : 'button';
            const isTagNameButton = tagName === 'button';

            return c(
              tagName,
              {
                staticClass: 'mdc-button',
                class: Object.assign({
                  'mdc-button--outlined': this.outlined,
                  'mdc-button--raised': this.raised,
                  'mdc-button--unelevated': this.unelevated
                }, cssClass),
                attrs: {
                  disabled: isTagNameButton && this.disabled
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
