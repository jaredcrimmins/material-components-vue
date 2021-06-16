import {MDCFloatingLabel} from './../mdc-floating-label';
import {MDCNotchedOutlineFoundation} from '@material/notched-outline';

export default {
  name: 'mdc-notched-outline',

  components: {
    'mdc-floating-label': MDCFloatingLabel
  },
  
  props: {
    floatLabel: Boolean,
    label: String,
    labelRequired: Boolean,
    notched: Boolean,
    notchWidth: Number,
    shakeLabel: Boolean
  },

  data() {
    return {
      mdcFoundation: new MDCNotchedOutlineFoundation(
        MDCNotchedOutlineFoundation.defaultAdapter
      )
    };
  },
  
  mounted() {
    this.init();
  },
  
  beforeDestroy() {
    this.deinit();
  },
  
  render(c) {
    return c(
      'div',
      {
        staticClass: 'mdc-notched-outline mdc-notched-outline--upgraded',
        class: {
          'mdc-notched-outline--no-label': !this.label
        }
      },
      [
        c(
          'div',
          {
            staticClass: 'mdc-notched-outline__leading'
          }
        ),
        this.genNotch(c),
        c(
          'div',
          {
            staticClass: 'mdc-notched-outline__trailing'
          }
        )
      ]
    );
  },

  watch: {
    notched() {
      this.notched ? this.mdcFoundation.notch(this.notchWidth || this.getLabelWidth()) : this.mdcFoundation.closeNotch();
    }
  },

  methods: {
    init() {
      this.mdcFoundation = new MDCNotchedOutlineFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genNotch(c) {
      if(this.label) {
        return c(
          'div',
          {
            ref: 'notchEl',
            staticClass: 'mdc-notched-outline__notch'
          },
          [
            this.genFloatingLabel(c)
          ]
        );
      }
    },

    genFloatingLabel(c) {
      return c(
        'mdc-floating-label',
        {
          ref: 'floatingLabel',
          props: {
            content: this.label,
            float: this.floatLabel,
            required: this.labelRequired,
            shake: this.shakeLabel
          }
        }
      );
    },

    getLabelWidth() {
      const floatingLabel = this.$refs.floatingLabel;

      if(floatingLabel) {
        return floatingLabel.getWidth();
      }
    },

    // Adapter
    addClass(className) {
      this.$el.classList.add(className);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    },

    setNotchWidthProperty(width) {
      const notchEl = this.$refs.notchEl;

      if(notchEl) {
        notchEl.style.setProperty('width', width + 'px');
      }
    },

    removeNotchWidthProperty() {
      const notchEl = this.$refs.notchEl;

      if(notchEl) {
        notchEl.style.removeProperty('width');
      }
    }
  }
}