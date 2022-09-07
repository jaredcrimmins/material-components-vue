import {MDCRippleFoundation, util} from '@material/ripple';
import {NativeEventListener} from '@/utils';
import Vue, {VNode} from 'vue';
import {events, ponyfill} from '@material/dom';
import {getSlot} from '@/utils';

export default Vue.extend({
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
      this.tagName,
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
      this.cssClass[className] = true;
    },

    removeClass(className: string) {
      delete this.cssClass[className];
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
      this.style = Object.assign({}, this.style, {
        [varName]: value
      });
    },

    computeBoundingRect() {
      return this.$el.getBoundingClientRect();
    },

    getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset})
  }
});
