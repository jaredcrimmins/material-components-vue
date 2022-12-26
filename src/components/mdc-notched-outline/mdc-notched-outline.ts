import {MDCFloatingLabel} from '../mdc-floating-label';
import {MDCNotchedOutlineFoundation, cssClasses} from '@material/notched-outline';
import Vue, {CreateElement, VNode} from 'vue';

export default Vue.extend({
  name: 'mdc-notched-outline',

  components: {
    'mdc-floating-label': MDCFloatingLabel
  },

  props: {
    floatLabel: Boolean,
    label: {
      type: String,
      default: null
    },
    labelID: {
      type: String,
      default: null
    },
    labelRequired: Boolean,
    notched: Boolean,
    notchWidth: {
      type: Number,
      default: null
    },
    shakeLabel: Boolean
  },

  data() {
    return {
      cssClass: {[cssClasses.NO_LABEL]: !this.label} as {[className: string]: boolean},
      mdcFoundation: new MDCNotchedOutlineFoundation(
        MDCNotchedOutlineFoundation.defaultAdapter
      ),
      notchStyle: <{[key: string]: string}>{}
    };
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c: CreateElement): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-notched-outline',
        class: this.cssClass
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
    notched(value) {
      const notchWidth = this.notchWidth || this.getLabelWidth();

      if (!notchWidth) return;

      value ? this.mdcFoundation.notch(notchWidth) : this.mdcFoundation.closeNotch();
    }
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCNotchedOutlineFoundation(this);
      this.mdcFoundation.init();

      this.addClass(cssClasses.OUTLINE_UPGRADED);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genNotch(c: CreateElement) {
      if(this.label) {
        return c(
          'div',
          {
            ref: 'notchEl',
            staticClass: 'mdc-notched-outline__notch',
            style: this.notchStyle
          },
          [
            this.genFloatingLabel(c)
          ]
        );
      }
    },

    genFloatingLabel(c: CreateElement) {
      return c(
        'mdc-floating-label',
        {
          ref: 'floatingLabel',
          props: {
            content: this.label,
            float: this.floatLabel,
            id: this.labelID,
            required: this.labelRequired,
            shake: this.shakeLabel
          }
        }
      );
    },

    //
    // Private/adapter methods
    //

    addClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: true};
    },

    //
    // Public methods
    //

    getLabelWidth() {
      const floatingLabel = <InstanceType<typeof MDCFloatingLabel>>this.$refs.floatingLabel;

      return floatingLabel ? floatingLabel.getWidth() : 0;
    },

    //
    // Adapter methods
    //

    removeClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: false};
    },

    setNotchWidthProperty(width: number) {
      this.notchStyle.width = `${width}px`;
    },

    removeNotchWidthProperty() {
      delete this.notchStyle.width;
    }
  }
});
