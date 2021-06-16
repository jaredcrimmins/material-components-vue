import {MDCRipple} from '@material/ripple';

export default {
  name: 'mdc-button',
  
  inheritAttrs: true,

  props: {
    disabled: Boolean,
    outlined: Boolean,
    raised: Boolean,
    unelevated: Boolean,
    to: String
  },

  data() {
    return {
      mdcRipple: null
    };
  },

  mounted() {
    this.init();
  },

  render(c) {
    let tagName = 'button';

    if (this.to) tagName = 'router-link';

    return c(
      tagName,
      {
        staticClass: 'mdc-button',
        attrs: {
          disabled: this.disabled
        },
        class: {
          'mdc-button--outlined': this.outlined,
          'mdc-button--raised': this.raised,
          'mdc-button--unelevated': this.unelevated
        },
        on: {
          click: event => {
            this.$emit('click', event);
          }
        },
        props: {
          to: this.to
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
  },

  methods: {
    init() {
      this.mdcRipple = new MDCRipple(this.$el);
    }
  }
}