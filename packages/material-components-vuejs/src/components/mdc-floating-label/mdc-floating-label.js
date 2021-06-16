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
    }
  },

  data() {
    return {
      mdcFoundation: null
    };
  },

  mounted() {
    this.init();
  },

  beforeDestory() {
    this.deinit();
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
    init() {
      this.mdcFoundation = new MDCFloatingLabelFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    addClass(className) {
      this.$el.classList.add(className);
    },

    deregisterInteractionHandler(evtType, handler) {
      this.$el.removeEventListener(evtType, handler);
    },

    getWidth() {
      return estimateScrollWidth(this.$el);
    },

    registerInteractionHandler(evtType, handler) {
      this.$el.addEventListener(evtType, handler);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    }
  },

  watch: {
    float() {
      this.mdcFoundation.float(this.float);
    },

    shake() {
      this.mdcFoundation.shake(this.shake);
    }
  }
}