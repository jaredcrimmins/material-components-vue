import {MDCFloatingLabelFoundation, cssClasses} from '@material/floating-label';
import {estimateScrollWidth} from '@material/dom/ponyfill';

export default {
  name: 'mdc-floating-label',

  props: {
    content: {
      default: '',
      type: String
    },
    float: {
      default: false,
      type: Boolean
    },
    shake: {
      default: false,
      type: Boolean
    },
    required: Boolean
  },

  data() {
    return {
      mdcFoundation: new MDCFloatingLabelFoundation(
        MDCFloatingLabelFoundation.defaultAdapter
      )
    };
  },

  mounted() {
    this.init();
  },

  beforeDestory() {
    this.deinit();
  },

  watch: {
    float(value) {
      this.setFloat(value);
    },

    shake(value) {
      this.setShake(value);
    },

    required(value) {
      this.setRequired(value);
    }
  },

  render(c) {
    return c(
      'label',
      {
        staticClass: cssClasses.ROOT
      },
      this.content
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCFloatingLabelFoundation(this);
      this.mdcFoundation.init();
      this.mdcFoundation.setRequired(this.required);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    setFloat(shouldFloat) {
      this.mdcFoundation.float(shouldFloat);
    },

    setRequired(isRequired) {
      this.mdcFoundation.setRequired(isRequired);
    },

    setShake(shouldShake) {
      this.mdcFoundation.shake(shouldShake);
    },

    //
    // Adapter methods
    //

    addClass(className) {
      this.$el.classList.add(className);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    },

    deregisterInteractionHandler(evtType, handler) {
      this.$el.removeEventListener(evtType, handler);
    },

    getWidth() {
      return estimateScrollWidth(this.$el);
    },

    registerInteractionHandler(evtType, handler) {
      this.$el.addEventListener(evtType, handler);
    }
  }
}