import {MDCRipple} from "./../mdc-ripple";
import {MDCTabFoundation, strings} from "@material/tab";
import {MDCMaterialIcon} from "../mdc-material-icon";
import MDCTabIndicator from "./tab-indicator";
import {emitCustomEvent} from "./../../utils";

let tabID_ = 0;

export default {
  name: "mdc-tab",

  components: {
    "mdc-material-icon": MDCMaterialIcon,
    "mdc-ripple": MDCRipple,
    "mdc-tab-indicator": MDCTabIndicator
  },

  inject: {
    focusOnActivate: {
      from: 'mdcTabBarFocusOnActivate__',
      default: false
    },
    tabList: {
      from: 'mdcTabBarTabList__',
      default: []
    },
    indicatorSpanContent: {
      from: 'mdcTabBarIndicatorSpanContent__',
      default: false
    }
  },

  props: {
    icon: String,
    indicatorIcon: String
  },

  data() {
    return {
      mdcFoundation: new MDCTabFoundation(
        MDCTabFoundation.defaultAdapter
      ),
      id: ""
    };
  },

  render(c) {
    const children = [this.genContent(c)];

    if (!this.indicatorSpanContent) children.push(this.genTabIndicator(c));

    children.push(
      c(
        "mdc-ripple",
        {
          ref: "ripple",
          staticClass: "mdc-tab__ripple",
          props: {
            standalone: false,
            tagName: "span"
          }
        }
      )
    );

    return c(
      "button",
      {
        staticClass: "mdc-tab",
        attrs: {
          id: this.id,
          role: "tab"
        },
        on: {
          click: this.onClick
        }
      },
      children
    );
  },

  created() {
    this.id = this.$attrs.id || `__mdc-tab-${tabID_++}`;
  },

  mounted() {
    const instance = this;
    const activate = computeIndicatorClientRect =>
      instance.mdcFoundation.activate(computeIndicatorClientRect);
    const deactivate = () => instance.mdcFoundation.deactivate();
    const computeIndicatorClientRect = () => {
      return this.$refs.tabIndicator.computeContentClientRect();
    };
    const computeDimensions = () => instance.mdcFoundation.computeDimensions();
    const focus = () => {this.$el.focus();};

    this.tabList.push({
      activate,
      deactivate,
      computeDimensions,
      computeIndicatorClientRect,
      focus,
      id: this.id
    });

    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCTabFoundation(this);
      this.mdcFoundation.init();

      this.setFocusOnActivate(this.focusOnActivate);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    setFocusOnActivate(focusOnActivate) {
      this.mdcFoundation.setFocusOnActivate(focusOnActivate);
    },

    onClick() {
      this.mdcFoundation.handleClick();
    },

    genContent(c) {
      const children = [];

      if(this.icon) {
        children.push(
          c(
            "mdc-material-icon",
            {
              staticClass: "mdc-tab__icon",
              props: {
                tag: "span"
              }
            },
            this.icon
          )
        );
      }

      children.push(
        c(
          "span",
          {
            staticClass: "mdc-tab__text-label"
          },
          this.$slots.default
        )
      );

      if(this.indicatorSpanContent) children.push(this.genTabIndicator(c));

      return c(
        "span",
        {
          ref: "contentEl",
          staticClass: "mdc-tab__content"
        },
        children
      );
    },

    genTabIndicator(c) {
      return c(
        "mdc-tab-indicator",
        {
          ref: "tabIndicator",
          props: {
            active: this.active,
            underline: true
          }
        },
        this.indicatorIcon
      );
    },

    //
    // Both public and adapter methods
    //

    focus() {
      this.$el.focus();
    },

    //
    // Adapter methods
    //

    addClass(className) {
      this.$el.classList.add(className);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    },
    
    hasClass(className) {
      return this.$el.classList.contains(className);
    },

    setAttr(attr, value) {
      this.$el.setAttribute(attr, value);
    },

    activateIndicator(previousIndicatorClientRect) {
      this.$refs.tabIndicator.activate(previousIndicatorClientRect);
    },

    deactivateIndicator() {
      this.$refs.tabIndicator.deactivate();
    },

    getOffsetLeft() {
      return this.$el.offsetLeft;
    },

    getOffsetWidth() {
      return this.$el.offsetWidth;
    },

    getContentOffsetLeft() {
      return this.$refs.contentEl.offsetLeft;
    },

    getContentOffsetWidth() {
      return this.$refs.contentEl.offsetWidth;
    },

    notifyInteracted() {
      emitCustomEvent(
        this.$el,
        strings.INTERACTED_EVENT,
        {tabId: this.id},
        true
      );
    }
  }
}