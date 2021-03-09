import {MDCRippleFoundation, util} from "@material/ripple";
import {applyPassive} from "@material/dom/events";
import {matches} from "@material/dom/ponyfill";

export default {
  name: "mdc-ripple",

  props: {
    disabled: Boolean,
    standalone: {
      type: Boolean,
      default: () => true
    },
    tagName: {
      type: String,
      default: () => "div"
    },
    unbounded: Boolean
  },

  data() {
    return {
      mdcFoundation: null
    };
  },

  mounted() {
    this.mdcFoundation = new MDCRippleFoundation(this);
    this.mdcFoundation.init();
    this.mdcFoundation.setUnbounded(this.unbounded);
  },

  beforeDestroy() {
    this.mdcFoundation.destroy();
  },

  render(c) {
    return c(
      this.tagName,
      {
        class: {
          "mdc-ripple-surface": this.standalone
        },
        on: {
          focus: this.handleFocus,
          blur: this.handleBlur
        }
      },
      this.$slots.default
    );
  },

  watch: {
    unbounded(value) {
      this.mdcFoundation.setUnbounded(value);
    }
  },

  methods: {
    //
    // Public methods
    //

    activate() {
      this.mdcFoundation.activate();
    },

    deactivate() {
      this.mdcFoundation.deactivate();
    },

    layout() {
      this.mdcFoundation.layout();
    },

    handleFocus() {
      this.mdcFoundation.handleFocus();
    },

    handleBlur() {
      this.mdcFoundation.handleBlur()
    },

    //
    // Adapter methods
    //

    browserSupportsCssVars: () => util.supportsCssVariables(window),

    isUnbounded() {
      return this.unbounded;
    },

    isSurfaceActive() {
      return matches(this.$el, ":active")
    },

    isSurfaceDisabled() {
      return this.disabled;
    },

    addClass(className) {
      this.$el.classList.add(className);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    },

    containsEventTarget(target) {
      return this.$el.contains(target);
    },

    registerInteractionHandler(evtType, handler) {
      this.$el.addEventListener(evtType, handler, applyPassive());
    },

    deregisterInteractionHandler(evtType, handler) {
      this.$el.removeEventListener(evtType, handler, applyPassive());
    },

    registerDocumentInteractionHandler(evtType, handler) {
      document.addEventListener(evtType, handler, applyPassive());
    },

    deregisterDocumentInteractionHandler(evtType, handler) {
      document.removeEventListener(evtType, handler, applyPassive());
    },

    registerResizeHandler(handler) {
      window.addEventListener("resize", handler);
    },

    deregisterResizeHandler(handler) {
      window.removeEventListener("resize", handler);
    },

    updateCssVariable(varName, value) {
      this.$el.style.setProperty(varName, value);
    },

    computeBoundingRect() {
      return this.$el.getBoundingClientRect();
    },

    getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset})
  }
}