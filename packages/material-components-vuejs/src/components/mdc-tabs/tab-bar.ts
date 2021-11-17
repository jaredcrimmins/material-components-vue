import {MDCTabFoundation, MDCTabInteractionEvent} from "@material/tab";
import {MDCTabBarFoundation} from "@material/tab-bar";
import MDCTabScroller from "./tab-scroller";
import Vue, {VNode} from 'vue';
import {emitCustomEvent} from "./../../utils";

const {strings} = MDCTabBarFoundation;

type TabScrollerRef = InstanceType<typeof MDCTabScroller>;

export type TabListType = {
  activate: (computeIndicatorClientRect: ClientRect) => void;
  deactivate: () => void;
  computeDimensions: () => void;
  computeIndicatorClientRect: () => DOMRect;
  focus: () => void;
  id: string;
}[];

export default Vue.extend({
  name: "mdc-tab-bar",

  components: {
    "mdc-tab-scroller": MDCTabScroller
  },

  provide(): object {
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
      mdcFoundation: new MDCTabBarFoundation(
        MDCTabBarFoundation.defaultAdapter
      ),
      tabList: <TabListType>[]
    };
  },

  render(c): VNode {
    return c(
      "div",
      {
        staticClass: "mdc-tab-bar",
        attrs: {
          role: "tablist"
        },
        on: {
          keydown: this.onKeyDown,
          [MDCTabFoundation.strings.INTERACTED_EVENT]: this.onMDCTabInteracted
        }
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
    this.mdcFoundation.activateTab(this.value);
  },

  beforeDestroy() {
    this.mdcFoundation.destroy();
  },

  watch: {
    automaticActivation(value) {
      this.mdcFoundation.setUseAutomaticActivation(value);
    }
  },

  methods: {
    //
    // Private methods
    //

    getTabElements() {
      return Array.from(this.$el.querySelectorAll(".mdc-tab"));
    },

    onKeyDown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeyDown(event);
    },

    onMDCTabInteracted(event: MDCTabInteractionEvent) {
      this.mdcFoundation.handleTabInteraction(event);
    },

    //
    // Public methods
    //

    scrollIntoView(index: number) {
      this.mdcFoundation.scrollIntoView(index);
    },

    //
    // Adapter methods
    //

    scrollTo(scrollX: number) {
      (<TabScrollerRef>this.$refs.tabScroller).scrollTo(scrollX);
    },

    incrementScroll(scrollXIncrement: number) {
      (<TabScrollerRef>this.$refs.tabScroller).incrementScroll(scrollXIncrement);
    },

    getScrollPosition() {
      return (<TabScrollerRef>this.$refs.tabScroller).getScrollPosition();
    },

    getScrollContentWidth() {
      return (<TabScrollerRef>this.$refs.tabScroller).getScrollContentWidth();
    },

    getOffsetWidth() {
      return (<HTMLElement>this.$el).offsetWidth;
    },

    isRTL() {
      return window.getComputedStyle(this.$el)
        .getPropertyValue("direction") === "rtl";
    },

    setActiveTab(index: number) {
      this.mdcFoundation.activateTab(index);
    },

    activateTabAtIndex(index: number, clientRect: ClientRect) {
      this.tabList[index].activate(clientRect);
    },

    deactivateTabAtIndex(index: number) {
      this.tabList[index].deactivate();
    },

    focusTabAtIndex(index: number) {
      this.tabList[index].focus();
    },

    getTabIndicatorClientRectAtIndex(index: number) {
      return this.tabList[index].computeIndicatorClientRect();
    },

    getTabDimensionsAtIndex(index: number) {
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
      const activeElement = document.activeElement!;

      return tabElements.indexOf(activeElement);
    },

    getIndexOfTabById(id: string) {
      for(let i = 0; i < this.tabList.length; i++) {
        if(this.tabList[i].id === id) {
          return i;
        }
      }

      return -1;
    },

    notifyTabActivated(index: number) {
      emitCustomEvent(this.$el, strings.TAB_ACTIVATED_EVENT, {index}, true);
      this.$emit("input", index);
    }
  }
});
