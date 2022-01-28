import {MDCFloatingLabelFoundation, cssClasses} from '@material/floating-label';
import {NativeEventListener} from '@/utils';
import Vue, {VNode} from 'vue';
import {ponyfill} from '@material/dom';

export default Vue.extend({
  name: 'mdc-floating-label',

  inheritAttrs: true,

  props: {
    content: {
      default: '',
      type: String
    },
    float: {
      default: false,
      type: Boolean
    },
    id: {
      type: String,
      default: ''
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

  beforeDestroy() {
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

  render(c): VNode {
    return c(
      'label',
      {
        staticClass: cssClasses.ROOT,
        attrs: {
          id: ''
        }
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

    setFloat(shouldFloat: boolean) {
      this.mdcFoundation.float(shouldFloat);
    },

    setRequired(isRequired: boolean) {
      this.mdcFoundation.setRequired(isRequired);
    },

    setShake(shouldShake: boolean) {
      this.mdcFoundation.shake(shouldShake);
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.$el.classList.add(className);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    },

    deregisterInteractionHandler(evtType: string, handler: NativeEventListener) {
      this.$el.removeEventListener(evtType, handler);
    },

    getWidth() {
      return ponyfill.estimateScrollWidth(this.$el);
    },

    registerInteractionHandler(evtType: string, handler: NativeEventListener) {
      this.$el.addEventListener(evtType, handler);
    }
  }
});
