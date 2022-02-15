import {MDCTabScrollerFoundation} from "@material/tab-scroller";
import {matches} from "@material/dom/ponyfill";
import * as util from "@material/tab-scroller/util";

export default {
  name: "mdc-tab-scroller",

  props: {
    alignStart: Boolean,
    alignEnd: Boolean,
    alignCenter: Boolean
  },

  data() {
    return {
      mdcFoundation: null
    };
  },

  render(c) {
    return c(
      "div",
      {
        staticClass: "mdc-tab-scroller",
        class: {
          "mdc-tab-scroller--align-start": this.alignStart,
          "mdc-tab-scroller--align-end": this.alignEnd,
          "mdc-tab-scroller--align-center": this.alignCenter
        }
      },
      [
        c(
          "div",
          {
            ref: "scrollAreaEl",
            staticClass: "mdc-tab-scroller__scroll-area",
            on: {
              wheel: event => {
                this.mdcFoundation.handleInteraction(event);
              },
              touchstart: event => {
                this.mdcFoundation.handleInteraction(event);
              },
              pointerdown: event => {
                this.mdcFoundation.handleInteraction(event);
              },
              mousedown: event => {
                this.mdcFoundation.handleInteraction(event);
              },
              keydown: event => {
                this.mdcFoundation.handleInteraction(event);
              }
            }
          },
          [
            c(
              "div",
              {
                ref: "scrollContentEl",
                staticClass: "mdc-tab-scroller__scroll-content",
                on: {
                  transitionend: event => {
                    this.mdcFoundation.handleTransitionEnd(event);
                  }
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
    // Public methods
    //

    scrollTo(scrollX) {
      this.mdcFoundation.scrollTo(scrollX);
    },

    incrementScroll(scrollXIncrement) {
      this.mdcFoundation.incrementScroll(scrollXIncrement);
    },

    getScrollPosition() {
      return this.mdcFoundation.getScrollPosition();
    },

    getScrollContentWidth() {
      return this.$refs.scrollContentEl.offsetWidth;
    },

    //
    // Adapter methods
    //

    eventTargetMatchesSelector(eventTarget, selector) {
      return matches(eventTarget, selector);
    },

    addClass(className) {
      this.$el.classList.add(className);
    },

    addScrollAreaClass(className) {
      this.$refs.scrollAreaEl.classList.add(className);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    },

    setScrollAreaStyleProperty(property, value) {
      this.$refs.scrollAreaEl.style.setProperty(property, value);
    },

    setScrollContentStyleProperty(property, value) {
      this.$refs.scrollContentEl.style.setProperty(property, value);
    },

    getScrollContentStyleValue(property) {
      return window.getComputedStyle(this.$refs.scrollContentEl).getPropertyValue(property);
    },

    setScrollAreaScrollLeft(scrollLeft) {
      this.$refs.scrollAreaEl.scrollLeft = scrollLeft;
    },

    getScrollAreaScrollLeft() {
      return this.$refs.scrollAreaEl.scrollLeft;
    },

    getScrollContentOffsetWidth() {
      return this.$refs.scrollContentEl.offsetWidth;
    },

    getScrollAreaOffsetWidth() {
      return this.$refs.scrollAreaEl.offsetWidth;
    },

    computeScrollAreaClientRect() {
      return this.$refs.scrollAreaEl.getBoundingClientRect();
    },

    computeScrollContentClientRect() {
      return this.$refs.scrollContentEl.getBoundingClientRect();
    },

    computeHorizontalScrollbarHeight() {
      return util.computeHorizontalScrollbarHeight(document);
    }
  }
}