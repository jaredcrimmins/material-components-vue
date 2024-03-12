import {Corner, MDCMenuDistance, MDCMenuSurfaceFoundation} from "@material/menu-surface";
import Vue, {VNode} from 'vue';
import {emitCustomEvent} from "./../../utils";
import {absolutelyPositionable} from "../../mixins";
import {anchorPropDefFactory} from "@/utils";
import {getCorrectPropertyName} from "@material/animation";

const {cssClasses, strings} = MDCMenuSurfaceFoundation;

export default Vue.extend({
  name: "mdc-menu-surface",

  mixins: [absolutelyPositionable],

  props: {
    anchorCorner: {
      type: Number,
      default: Corner.TOP_LEFT
    },
    anchorElement: anchorPropDefFactory(),
    fixedPosition: Boolean,
    fullWidth: Boolean,
    hoisted: Boolean,
    quickOpen: Boolean,
    value: Boolean
  },

  data() {
    return {
      anchorElement_: <Element | HTMLElement | null>null,
      cssClasses: {
        'mdc-menu-surface--fullwidth': this.fullWidth
      } as {[className: string]: boolean},
      mdcFoundation: new MDCMenuSurfaceFoundation(MDCMenuSurfaceFoundation.defaultAdapter),
      open: false,
      previousFocus: <HTMLElement | null>null,
      style: {} as {[property: string]: string}
    };
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  watch: {
    absolutePosition(value) {
      this.setAbsolutePosition(value.x, value.y);
    },

    anchorCorner(value) {
      this.setAnchorCorner(value);
    },

    anchorElement() {
      if(this.$el) {
        this.getAnchorElement();
      }
    },

    fixedPosition(value) {
      this.setFixedPosition(value);
    },

    hoisted(value) {
      this.setIsHoisted(value);
    },

    quickOpen(value) {
      this.setQuickOpen(value);
    },

    open(value) {
      value ? this.mdcFoundation.open() : this.mdcFoundation.close();

      if(this.value !== value) {
        this.$emit("input", value);
      }
    },

    value(value) {
      this.open = value;
    }
  },

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: cssClasses.ROOT,
        class: this.cssClasses,
        style: this.style,
        on: {
          keydown: this.onKeydown,
          'MDCMenuSurface:closed': this.onClosed,
          'MDCMenuSurface:opened': this.onOpened
        }
      },
      this.$slots.default
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.getAnchorElement();
      this.mdcFoundation = new MDCMenuSurfaceFoundation(this);
      this.mdcFoundation.init();
      this.setFixedPosition(this.fixedPosition);
      this.setIsHoisted(this.hoisted);
      this.setQuickOpen(this.quickOpen);
      this.initListeners();
      this.open = this.value;
    },

    deinit() {
      this.deinitListeners();
      this.mdcFoundation.destroy();
    },

    initListeners() {
      document.body.addEventListener("click", this.onBodyClick, { capture: true });
    },

    deinitListeners() {
      document.body.removeEventListener("click", this.onBodyClick);
    },

    getAnchorElement() {
      let anchorElement = null;

      if(typeof this.anchorElement === "string") {
        anchorElement = this.$root.$el.querySelector(this.anchorElement);
      }
      else if(this.anchorElement && (this.anchorElement instanceof HTMLElement || this.anchorElement.nodeType)) {
        anchorElement = this.anchorElement;
      }
      else {
        const parentElement = this.$el.parentElement;

        anchorElement = parentElement && parentElement.querySelector(cssClasses.ANCHOR) ? parentElement : null;
      }

      this.anchorElement_ = anchorElement;

      return anchorElement;
    },

    toggle() {
      this.open ? this.mdcFoundation.open() : this.mdcFoundation.close();
    },

    setAbsolutePosition(x: number, y: number) {
      this.mdcFoundation.setAbsolutePosition(x, y);
    },

    setAnchorCorner(corner: Corner) {
      this.mdcFoundation.setAnchorCorner(corner);
    },

    setFixedPosition(isFixed: boolean) {
      this.mdcFoundation.setFixedPosition(isFixed);
    },

    setIsHoisted(isHoisted: boolean) {
      this.mdcFoundation.setIsHoisted(isHoisted);
    },

    setQuickOpen(quickOpen: boolean) {
      this.mdcFoundation.setQuickOpen(quickOpen);
    },

    onBodyClick(event: MouseEvent) {
      this.mdcFoundation.handleBodyClick(event);
    },

    onKeydown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeydown(event);
    },

    onClosed() {
      this.open = false;
    },

    onOpened() {
      this.open = true;
    },

    //
    // Public methods
    //

    isOpen() {
      return this.mdcFoundation.isOpen();
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    hasAnchor() {
      return this.anchorElement_ ? true : false;
    },

    notifyClose() {
      emitCustomEvent(this.$el, strings.CLOSED_EVENT, {}, true);
      this.onClosed();
    },

    notifyClosing() {
      emitCustomEvent(this.$el, strings.CLOSING_EVENT, {});
    },

    notifyOpen() {
      emitCustomEvent(this.$el, strings.OPENED_EVENT, {}, true);
      this.onOpened();
    },

    isElementInContainer(el: Node | null) {
      return this.$el.contains(el);
    },

    isRTL() {
      return getComputedStyle(this.$el).getPropertyValue("direction") === "rtl";
    },

    setTransformOrigin(value: string) {
      const propertyName = `${getCorrectPropertyName(window, "transform")}-origin`;

      this.style = {...this.style, ...{[propertyName]: value}};
    },

    isFocused() {
      return this.$el === document.activeElement;
    },

    saveFocus() {
      this.previousFocus = <HTMLElement>document.activeElement;
    },

    restoreFocus() {
      if(this.$el.contains(document.activeElement)) {
        if(this.previousFocus && this.previousFocus.focus) {
          this.previousFocus.focus();
        }
      }
    },

    getInnerDimensions() {
      const el = <HTMLElement>this.$el;

      return {
        width: el.offsetWidth,
        height: el.offsetHeight
      };
    },

    getAnchorDimensions() {
      return this.anchorElement_ ? this.anchorElement_.getBoundingClientRect() : null;
    },

    getBodyDimensions() {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      };
    },

    getWindowDimensions() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    },

    getWindowScroll() {
      return {x: window.pageXOffset, y: window.pageYOffset};
    },

    setPosition(position: Partial<MDCMenuDistance>) {
      this.style = {
        ...this.style,
        ...{
          left: "left" in position ? `${ position.left }px` : "",
          right: "right" in position ? `${ position.right }px` : "",
          top: "top" in position ? `${ position.top }px` : "",
          bottom: "bottom" in position ? `${ position.bottom }px` : ""
        }
      };
    },

    setMaxHeight(height: string) {
      this.style = {...this.style, ...{maxHeight: height}};
    }
  }
});
