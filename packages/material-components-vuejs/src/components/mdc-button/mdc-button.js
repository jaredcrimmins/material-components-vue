import {MDCRipple} from '../mdc-ripple';

export default {
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
    to: String,
    unelevated: Boolean
  },

  render(c) {
    return c(
      'mdc-ripple',
      {
        props: {
          disabled: this.rippleDisabled,
          standalone: false
        },
        scopedSlots: {
          default: ({cssClass, on}) => {
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
    onClick(event) {
      this.$emit('click', event);
    }
  }
}