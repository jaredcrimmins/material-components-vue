import {MDCTabFoundation} from "@material/tab";
import {MDCTabBarFoundation} from "@material/tab-bar";
import MDCTabScroller from "./tab-scroller";
import {emitCustomEvent} from "./../../utils";

const {strings} = MDCTabBarFoundation;

export default {
  name: "mdc-tab-bar",

  components: {
    "mdc-tab-scroller": MDCTabScroller
  },

  provide() {
    return {
      mdcTabBarFade__: this.fade,
      mdcTabBarFocusOnActivate__: this.focusOnActivate,
      mdcTabBarTabList__: this.tabList,
      mdcTabBarUnderline__: this.underline,
      mdcTabBarIndicatorSpanContent__: this.indicatorSpanContent
    };
  },

  props: {
    automaticActivation: Boolean,
    fade: Boolean,
    focusOnActivate: Boolean,
    indicatorSpanContent: Boolean,
    underline: Boolean,
    value: {
      type: Number,
      default: () => 0
    }
  },

  data() {
    return {
      mdcFoundation: new MDCTabFoundation(
        MDCTabFoundation.defaultAdapter
      ),
      tabList: []
    };
  },

  render(c) {
    const on = {
      keydown: event => {
        this.mdcFoundation.handleKeyDown(event)
      }
    };

    on[MDCTabFoundation.strings.INTERACTED_EVENT] = event => {
      this.mdcFoundation.handleTabInteraction(event);
    }

    return c(
      "div",
      {
        staticClass: "mdc-tab-bar",
        attrs: {
          role: "tablist"
        },
        on
      },
      [
        c(
          "mdc-tab-scroller",
          {
            ref: "tabScroller"
          },
          this.$slots.default
        )
      ]
    );
  },

  mounted() {
    this.mdcFoundation = new MDCTabBarFoundation(this);
    this.mdcFoundation.init();
    this.mdcFoundation.setUseAutomaticActivation(this.automaticActivation);
    this.activateTabAtIndex(this.value);
  },

  beforeDestroy() {
    this.mdcFoundation.destroy();
  },

  watch: {
    automaticActivation(value) {
      this.mdcFoundation.useAutomaticActivation(value);
    }
  },

  methods: {
    //
    // Private methods
    //

    getTabElements() {
      return Array.from(this.$el.querySelectorAll(".mdc-tab"));
    },

    //
    // Public methods
    //

    scrollIntoView(index) {
      this.mdcFoundation.scrollIntoView(index);
    },

    //
    // Adapter methods
    //

    scrollTo(scrollX) {
      this.$refs.tabScroller.scrollTo(scrollX);
    },

    incrementScroll(scrollXIncrement) {
      this.$refs.tabScroller.incrementScroll(scrollXIncrement);
    },

    getScrollPosition() {
      return this.$refs.tabScroller.getScrollPosition();
    },

    getScrollContentWidth() {
      return this.$refs.tabScroller.getScrollContentWidth();
    },

    getOffsetWidth() {
      return this.$el.offsetWidth;
    },

    isRTL() {
      return window.getComputedStyle(this.$el)
        .getPropertyValue("direction") === "rtl";
    },

    setActiveTab(index) {
      this.mdcFoundation.activateTab(index);
    },

    activateTabAtIndex(index, clientRect) {
      this.tabList[index].activate(clientRect);
    },

    deactivateTabAtIndex(index) {
      this.tabList[index].deactivate();
    },

    focusTabAtIndex(index) {
      this.tabList[index].focus();
    },

    getTabIndicatorClientRectAtIndex(index) {
      return this.tabList[index].computeIndicatorClientRect();
    },

    getTabDimensionsAtIndex(index) {
      return this.tabList[index].computeDimensions();
    },

    getTabListLength() {
      return this.tabList.length;
    },

    getPreviousActiveTabIndex() {
      const tabElements = this.getTabElements();

      for(let i = 0; i < tabElements.length; i++) {
        if(
          tabElements[i].classList.contains(MDCTabFoundation.cssClasses.ACTIVE)
        ) {
          return i;
        }
      }

      return -1;
    },

    getFocusedTabIndex() {
      const tabElements = this.getTabElements();
      const activeElement = document.activeElement;

      return tabElements.indexOf(activeElement);
    },

    getIndexOfTabById(id) {
      for(let i = 0; i < this.tabList.length; i++) {
        if(this.tabList[i].id === id) {
          return i;
        }
      }

      return -1;
    },

    notifyTabActivated(index) {
      emitCustomEvent(this.$el, strings.TAB_ACTIVATED_EVENT, {index}, true);
      this.$emit("input", index);
    }
  }
}