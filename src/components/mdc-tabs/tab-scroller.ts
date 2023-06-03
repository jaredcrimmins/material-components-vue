import {MDCTabScrollerFoundation} from "@material/tab-scroller";
import Vue, {VNode} from 'vue';
import {ponyfill} from "@material/dom";
import {util} from "@material/tab-scroller";

type ScrollAreaElRef = HTMLElement;
type ScrollContentElRef = HTMLElement;

export default Vue.extend({
  name: "mdc-tab-scroller",

  props: {
    alignStart: Boolean,
    alignEnd: Boolean,
    alignCenter: Boolean
  },

  data() {
    return {
      cssClasses: {
        "mdc-tab-scroller--align-start": this.alignStart,
        "mdc-tab-scroller--align-end": this.alignEnd,
        "mdc-tab-scroller--align-center": this.alignCenter
      } as {[className: string]: boolean},
      scrollAreaCssClasses: {} as {[className: string]: boolean},
      scrollAreaStyle: {} as {[key: string]: string},
      scrollContentStyle: {} as {[key: string]: string},
      mdcFoundation: new MDCTabScrollerFoundation(
        MDCTabScrollerFoundation.defaultAdapter
      )
    };
  },

  render(c): VNode {
    return c(
      "div",
      {
        staticClass: "mdc-tab-scroller",
        class: this.cssClasses
      },
      [
        c(
          "div",
          {
            ref: "scrollAreaEl",
            staticClass: "mdc-tab-scroller__scroll-area",
            class: this.scrollAreaCssClasses,
            style: this.scrollAreaStyle,
            on: {
              wheel: this.onScrollAreaWheel,
              touchstart: this.onScrollAreaTouchStart,
              pointerdown: this.onScrollAreaPointerDown,
              mousedown: this.onScrollAreaMouseDown,
              keydown: this.onScrollAreaKeyDown
            }
          },
          [
            c(
              "div",
              {
                ref: "scrollContentEl",
                staticClass: "mdc-tab-scroller__scroll-content",
                style: this.scrollContentStyle,
                on: {
                  transitionend: this.onScrollContentTransitionEnd
                }
              },
              this.$slots.default
            )
          ]
        )
      ]
    );
  },

  mounted() {
    this.mdcFoundation = new MDCTabScrollerFoundation(this);
    this.mdcFoundation.init();
  },

  beforeDestroy() {
    this.mdcFoundation.destroy();
  },

  methods: {
    //
    // Private methods
    //

    onScrollAreaWheel() {
      this.mdcFoundation.handleInteraction();
    },

    onScrollAreaTouchStart() {
      this.mdcFoundation.handleInteraction();
    },

    onScrollAreaPointerDown() {
      this.mdcFoundation.handleInteraction();
    },

    onScrollAreaMouseDown() {
      this.mdcFoundation.handleInteraction();
    },

    onScrollAreaKeyDown() {
      this.mdcFoundation.handleInteraction();
    },

    onScrollContentTransitionEnd(event: TransitionEvent) {
      this.mdcFoundation.handleTransitionEnd(event);
    },

    //
    // Public methods
    //

    scrollTo(scrollX: number) {
      this.mdcFoundation.scrollTo(scrollX);
    },

    incrementScroll(scrollXIncrement: number) {
      this.mdcFoundation.incrementScroll(scrollXIncrement);
    },

    getScrollPosition() {
      return this.mdcFoundation.getScrollPosition();
    },

    getScrollContentWidth() {
      return (<ScrollContentElRef>this.$refs.scrollContentEl).offsetWidth;
    },

    //
    // Adapter methods
    //

    eventTargetMatchesSelector(eventTarget: EventTarget, selector: string) {
      return ponyfill.matches(<Element>eventTarget, selector);
    },

    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    addScrollAreaClass(className: string) {
      this.scrollAreaCssClasses = {...this.scrollAreaCssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    setScrollAreaStyleProperty(property: string, value: string) {
      this.scrollAreaStyle = {...this.scrollAreaStyle, [property]: value};
    },

    setScrollContentStyleProperty(property: string, value: string) {
      this.scrollContentStyle = {...this.scrollContentStyle, [property]: value};
    },

    getScrollContentStyleValue(property: string) {
      return window.getComputedStyle((<ScrollContentElRef>this.$refs.scrollContentEl)).getPropertyValue(property);
    },

    setScrollAreaScrollLeft(scrollLeft: number) {
      (<ScrollAreaElRef>this.$refs.scrollAreaEl).scrollLeft = scrollLeft;
    },

    getScrollAreaScrollLeft() {
      return (<ScrollAreaElRef>this.$refs.scrollAreaEl).scrollLeft;
    },

    getScrollContentOffsetWidth() {
      return (<ScrollContentElRef>this.$refs.scrollContentEl).offsetWidth;
    },

    getScrollAreaOffsetWidth() {
      return (<ScrollAreaElRef>this.$refs.scrollAreaEl).offsetWidth;
    },

    computeScrollAreaClientRect() {
      return (<ScrollAreaElRef>this.$refs.scrollAreaEl).getBoundingClientRect();
    },

    computeScrollContentClientRect() {
      return (<ScrollContentElRef>this.$refs.scrollContentEl).getBoundingClientRect();
    },

    computeHorizontalScrollbarHeight() {
      return util.computeHorizontalScrollbarHeight(document);
    }
  }
});
