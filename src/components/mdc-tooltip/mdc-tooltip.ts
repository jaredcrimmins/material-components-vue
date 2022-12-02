import {AnchorBoundaryType, CssClasses, MDCTooltipFoundation, XPosition, YPosition, attributes, events} from '@material/tooltip';
import {EventType, SpecificEventListener} from '@material/base/types';
import Vue, {CreateElement, PropOptions, VueConstructor, VNode} from 'vue';
import {emitCustomEvent, getSlot} from '../../utils';

const cssClasses = {...CssClasses, ...{
  ROOT: 'mdc-tooltip',
  CONTENT: 'mdc-tooltip__content'
}};

let tooltipId_ = 0;

type SurfaceElRef = HTMLElement;

interface Injections {
  rich: boolean;
  wrapperAnchorAttrs: {[attr: string]: boolean | string} | null;
}

export {AnchorBoundaryType, XPosition, YPosition};

export default (<VueConstructor<Vue & Injections>>Vue).extend({
  name: 'mdc-tooltip',

  inheritAttrs: true,

  inject: {
    rich: {
      from: 'mdcTooltipWrapperRich__',
      default: false
    },
    wrapperAnchorAttrs: {
      from: 'mdcTooltipWrapperAnchorAttrs__',
      default: null
    }
  },

  props: {
    anchorBoundaryType: {
      validator(value) {
        if (typeof value !== 'number') return false;

        return Object.values(AnchorBoundaryType).includes(value);
      }
    } as PropOptions<AnchorBoundaryType>,
    id: {
      type: String,
      default: () => `__mdc-tooltip-${tooltipId_}`
    },
    persistent: Boolean,
    xPosition: {
      default: XPosition.DETECTED,
      validator(value) {
        if (typeof value !== 'number') return false;

        return Object.values(XPosition).includes(value);
      }
    } as PropOptions<XPosition>,
    yPosition: {
      default: YPosition.DETECTED,
      validator(value) {
        if (typeof value !== 'number') return false;

        return Object.values(YPosition).includes(value);
      }
    } as PropOptions<YPosition>
  },

  data() {
    return {
      anchorEl: <HTMLElement | null>null,
      cssClass: <{[className in CssClasses]: boolean}>{
        [cssClasses.RICH]: this.rich,
      },
      mdcFoundation: new MDCTooltipFoundation(
        MDCTooltipFoundation.defaultAdapter
      )
    };
  },

  watch: {
    anchorBoundaryType(value: AnchorBoundaryType) {
      this.setAnchorBoundaryType(value);
    },

    persistent() {
      this.evaluateZIndexAttribute();
    },

    xPosition(value: XPosition) {
      this.setPosition({xPosition: value});
    },

    yPosition(value: YPosition) {
      this.setPosition({yPosition: value});
    }
  },

  created() {
    tooltipId_++;

    this.evaluateZIndexAttribute();
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
        staticClass: cssClasses.ROOT,
        class: this.cssClass,
        attrs: {
          id: this.id,
          role: this.persistent ? 'dialog' : 'tooltip',
          [attributes.PERSISTENT]: this.persistent
        }
      },
      [
        c(
          'div',
          {
            ref: 'surfaceEl',
            staticClass: cssClasses.SURFACE
          },
          getSlot(this)
        )
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.anchorEl = this.getAnchorElement();

      if (!this.anchorEl) {
        throw new Error(
          'MDCTooltip: Tooltip component requires an anchor element annotated with [data-tooltip-id] or [aria-describedby].');
      }

      this.mdcFoundation = new MDCTooltipFoundation(this);
      this.mdcFoundation.init();

      this.setAnchorBoundaryType(this.anchorBoundaryType);
      this.setPosition({xPosition: this.xPosition, yPosition: this.yPosition});

      this.$el.addEventListener('transitionend', this.onTransitionEnd);

      this.anchorEl.addEventListener('blur', this.onAnchorBlur);

      if (this.rich && this.persistent) {
        this.anchorEl.addEventListener('click', this.onAnchorClick);
      } else {
        this.anchorEl.addEventListener('focus', this.onAnchorFocus);
        this.anchorEl.addEventListener('mouseenter', this.onAnchorMouseEnter);
        this.anchorEl.addEventListener('mouseleave', this.onAnchorMouseLeave);
      }
    },

    deinit() {
      this.$el.removeEventListener('transitionend', this.onTransitionEnd);

      if (this.anchorEl) {
        this.anchorEl.removeEventListener('blur', this.onAnchorBlur);
        this.anchorEl.removeEventListener('click', this.onAnchorClick);
        this.anchorEl.removeEventListener('focus', this.onAnchorFocus);
        this.anchorEl.removeEventListener('mouseenter', this.onAnchorMouseEnter);
        this.anchorEl.removeEventListener('mouseleave', this.onAnchorMouseLeave);
      }

      this.mdcFoundation.destroy();
    },

    onTransitionEnd() {
      this.mdcFoundation.handleTransitionEnd();
    },

    onAnchorBlur(event: FocusEvent) {
      this.mdcFoundation.handleAnchorBlur(event);
    },

    onAnchorClick() {
      this.mdcFoundation.handleAnchorClick();
    },

    onAnchorFocus(event: FocusEvent) {
      this.mdcFoundation.handleAnchorFocus(event);
    },

    onAnchorMouseEnter() {
      this.mdcFoundation.handleAnchorMouseEnter();
    },

    onAnchorMouseLeave() {
      this.mdcFoundation.handleAnchorMouseLeave();
    },

    getAnchorElement() {
      return document.querySelector<HTMLElement>(
        `[data-tooltip-id="${this.id}"]`
      ) || document.querySelector<HTMLElement>(
        `[aria-describedby="${this.id}"]`
      );
    },

    setAnchorBoundaryType(type: AnchorBoundaryType) {
      this.mdcFoundation.setAnchorBoundaryType(type);
    },

    setPosition(position: {xPosition?: XPosition, yPosition?: YPosition}) {
      this.mdcFoundation.setTooltipPosition({
        xPos: position.xPosition,
        yPos: position.yPosition
      });
    },

    evaluateZIndexAttribute() {
      if (this.persistent) this.$attrs['z-index'] = '-1';
      else delete this.$attrs['z-index'];
    },

    //
    // Public methods
    //

    hide() {
      this.mdcFoundation.hide();
    },

    isShown() {
      return this.mdcFoundation.isShown();
    },

    //
    // Adapter methods
    //

    getAttribute(attr: string) {
      return this.$el.getAttribute(attr);
    },

    setAttribute(attr: string, value: string) {
      this.$el.setAttribute(attr, value);
    },

    addClass(className: CssClasses) {
      // Modifying the root element class list solely using a Vue mechanism
      // causes the tooltip to be improperly positioned for an unknown reason.
      // Modifying the root element class list solely using the
      // Element.classList property allows the tooltip to be properly
      // positioned, but also opens up the possibility of the class list to be
      // overwritten by a parent component.
      // Combining the two approaches gives the best of both worlds: properly
      // positioning the tooltip, and protecting the class list from being
      // overwritten by the parent component.
      this.$el.classList.add(className);
      this.cssClass = {...this.cssClass, [className]: true};
    },

    hasClass(className: CssClasses) {
      return this.$el.classList.contains(className);
    },

    removeClass(className: CssClasses) {
      this.$el.classList.remove(className);
      this.cssClass = {...this.cssClass, [className]: false};
    },

    getComputedStyleProperty(propertyName: string) {
      return window.getComputedStyle(this.$el).getPropertyValue(propertyName);
    },

    setStyleProperty(propertyName: string, value: string) {
      (<HTMLElement>this.$el).style.setProperty(propertyName, value);
    },

    setSurfaceStyleProperty(propertyName: string, value: string) {
      (<SurfaceElRef>this.$refs.surfaceEl).style.setProperty(propertyName, value);
    },

    getViewportWidth: () => window.innerWidth,

    getViewportHeight: () => window.innerHeight,

    getTooltipSize() {
      const rootEl = <HTMLElement>this.$el;

      return {
        height: rootEl.offsetHeight,
        width: rootEl.offsetWidth
      };
    },

    getAnchorBoundingRect() {
      return this.anchorEl ? this.anchorEl.getBoundingClientRect() : null;
    },

    getParentBoundingRect() {
      return this.$el.parentElement?.getBoundingClientRect() ?? null;
    },

    getAnchorAttribute(attr: string) {
      return this.anchorEl ? this.anchorEl.getAttribute(attr) : null;
    },

    setAnchorAttribute(attr: string, value: string) {
      if (this.wrapperAnchorAttrs) this.wrapperAnchorAttrs[attr] = value;
      else this.anchorEl?.setAttribute(attr, value);
    },

    isRTL() {
      return getComputedStyle(this.$el).direction === 'rtl';
    },

    anchorContainsElement(element: Element) {
      return !!this.anchorEl?.contains(element);
    },

    tooltipContainsElement(element: Element) {
      return this.$el.contains(element);
    },

    focusAnchorElement() {
      this.anchorEl?.focus();
    },

    registerEventHandler<K extends EventType>(evt: K, handler: SpecificEventListener<K>) {
      if (this.$el instanceof HTMLElement)
        this.$el.addEventListener(evt, handler);
    },

    deregisterEventHandler<K extends EventType>(evt: K, handler: SpecificEventListener<K>) {
      if (this.$el instanceof HTMLElement)
        this.$el.removeEventListener(evt, handler);
    },

    registerDocumentEventHandler<K extends EventType>(evt: K, handler: SpecificEventListener<K>) {
      document.body.addEventListener(evt, handler);
    },

    deregisterDocumentEventHandler<K extends EventType>(evt: K, handler: SpecificEventListener<K>) {
      document.body.removeEventListener(evt, handler);
    },

    registerWindowEventHandler<K extends EventType>(evt: K, handler: SpecificEventListener<K>) {
      window.addEventListener(evt, handler);
    },

    deregisterWindowEventHandler<K extends EventType>(evt: K, handler: SpecificEventListener<K>) {
      window.removeEventListener(evt, handler);
    },

    notifyHidden() {
      emitCustomEvent(this.$el, events.HIDDEN, {});
    }
  }
});
