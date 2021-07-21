import {MDCRippleFoundation, util} from '@material/ripple';
import {applyPassive} from '@material/dom/events';
import {matches} from '@material/dom/ponyfill';

export default {
  name: 'mdc-ripple',

  inheritAttrs: true,

  props: {
    disabled: Boolean,
    standalone: {
      type: Boolean,
      default: () => true
    },
    tagName: {
      type: String,
      default: () => 'div'
    },
    unbounded: Boolean
  },

  data() {
    return {
      mdcFoundation: new MDCRippleFoundation(
        MDCRippleFoundation.defaultAdapter
      )
    };
  },

  watch: {
    disabled(value) {
      value ? this.downgradeRipple() : this.upgradeRipple();
    },

    unbounded(value) {
      this.setUnbounded(value);
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c) {
    const defaultScopedSlot = this.$scopedSlots.default;
    const cssClass = {
      'mdc-ripple-surface': this.standalone
    };
    const on = {
      blur: this.onBlur,
      focus: this.onFocus
    };

    if (defaultScopedSlot) {
      return defaultScopedSlot({
        cssClass,
        on
      });
    }

    return c(
      this.tagName,
      {
        class: cssClass,
        on
      },
      this.$slots.default
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      if (!this.disabled) this.upgradeRipple();
    },

    deinit() {
      this.deinitMDCFoundation();
    },

    initMDCFoundation() {
      this.mdcFoundation = new MDCRippleFoundation(this);
      this.mdcFoundation.init();
    },

    deinitMDCFoundation() {
      this.mdcFoundation.destroy();
    },

    upgradeRipple() {
      this.initMDCFoundation();
      this.setUnbounded(this.unbounded);
    },

    downgradeRipple() {
      this.deactivate();
      this.deinitMDCFoundation();
    },

    setUnbounded(unbounded) {
      this.mdcFoundation.setUnbounded(unbounded);
    },

    onFocus() {
      this.mdcFoundation.handleFocus();
    },

    onBlur() {
      this.mdcFoundation.handleBlur();
    },

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
      this.onFocus();
    },

    handleBlur() {
      this.onBlur();
    },

    //
    // Adapter methods
    //

    browserSupportsCssVars: () => util.supportsCssVariables(window),

    isUnbounded() {
      return this.unbounded;
    },

    isSurfaceActive() {
      return matches(this.$el, ':active');
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
      window.addEventListener('resize', handler);
    },

    deregisterResizeHandler(handler) {
      window.removeEventListener('resize', handler);
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
