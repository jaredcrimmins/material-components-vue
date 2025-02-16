import {MDCRippleFoundation, cssClasses, util} from '@material/ripple';
import {NativeEventListener, getSlot} from '@/utils';
import Vue, {VNode} from 'vue';
import {events, ponyfill} from '@material/dom';

export default Vue.extend({
  name: 'mdc-ripple',

  inheritAttrs: true,

  props: {
    disabled: Boolean,
    standalone: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'div'
    },
    unbounded: Boolean
  },

  data() {
    return {
      cssClass: <{[key: string]: boolean}>(
        {'mdc-ripple-surface': this.standalone}
      ),
      mdcFoundation: new MDCRippleFoundation(
        MDCRippleFoundation.defaultAdapter
      ),
      style: <{[key: string]: string}>{}
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

  render(c): VNode {
    const on = {
      blur: this.onBlur,
      focus: this.onFocus
    };
    const defaultSlot = getSlot(this);
    const rootSlot = getSlot(this, 'root', {
      cssClass: this.cssClass,
      on,
      style: this.style
    });

    if (rootSlot) return rootSlot[0];

    return c(
      this.tag,
      {
        class: this.cssClass,
        on,
        style: this.style
      },
      defaultSlot
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
      this.cssClass[cssClasses.ROOT] = true;
      this.initMDCFoundation();
      this.setUnbounded(this.unbounded);
    },

    downgradeRipple() {
      this.deactivate();
      this.deinitMDCFoundation();
    },

    setUnbounded(unbounded: boolean) {
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
      return ponyfill.matches(this.$el, ':active');
    },

    isSurfaceDisabled() {
      return this.disabled;
    },

    addClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: true};
    },

    removeClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: false};
    },

    containsEventTarget(target: Node | null) {
      return this.$el.contains(target);
    },

    registerInteractionHandler(evtType: string, handler: NativeEventListener) {
      this.$el.addEventListener(evtType, handler, events.applyPassive());
    },

    deregisterInteractionHandler(evtType: string, handler: NativeEventListener) {
      this.$el.removeEventListener(evtType, handler, events.applyPassive());
    },

    registerDocumentInteractionHandler(evtType: string, handler: NativeEventListener) {
      document.addEventListener(evtType, handler, events.applyPassive());
    },

    deregisterDocumentInteractionHandler(evtType: string, handler: NativeEventListener) {
      document.removeEventListener(evtType, handler, events.applyPassive());
    },

    registerResizeHandler(handler: NativeEventListener) {
      window.addEventListener('resize', handler);
    },

    deregisterResizeHandler(handler: NativeEventListener) {
      window.removeEventListener('resize', handler);
    },

    updateCssVariable(varName: string, value: string) {
      (<HTMLElement>this.$el).style.setProperty(varName, value);
    },

    computeBoundingRect() {
      return this.$el.getBoundingClientRect();
    },

    getWindowPageOffset: () => ({x: window.scrollX, y: window.scrollY})
  }
});
