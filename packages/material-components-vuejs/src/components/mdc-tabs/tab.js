import {MDCRipple} from "./../mdc-ripple";
import {MDCTabFoundation, strings} from "@material/tab";
import {MaterialIcon} from "./../material-icon";
import MDCTabIndicator from "./tab-indicator";
import {emitCustomEvent} from "./../../utils";

let tabID_ = 0;

export default {
  name: "mdc-tab",

  components: {
    "mdc-material-icon": MaterialIcon,
    "mdc-ripple": MDCRipple,
    "mdc-tab-indicator": MDCTabIndicator
  },

  inject: ["focusOnActivate", "tabList", "indicatorSpanContent"],

  props: {
    icon: String,
    indicatorIcon: String
  },

  data() {
    return {
      foundation: null,
      id: ""
    };
  },

  render(c) {
    const children = [this.genContent(c)];

    if(!this.indicatorSpanContent) children.push(this.genTabIndicator(c));

    children.push(
      c(
        "mdc-ripple",
        {
          ref: "ripple",
          staticClass: "mdc-tab__ripple",
          props: {
            standalone: false
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
          click: () => {
            this.foundation.handleClick();
          },
          focus: () => {
            this.$refs.ripple.handleFocus();
          },
          blur: () => {
            this.$refs.ripple.handleBlur();
          }
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
      instance.foundation.activate(computeIndicatorClientRect);
    const deactivate = () => instance.foundation.deactivate();
    const computeIndicatorClientRect = () => {
      return this.$refs.tabIndicator.computeContentClientRect();
    };
    const computeDimensions = () => instance.foundation.computeDimensions();
    const focus = () => {this.$el.focus();};

    this.tabList.push({
      activate,
      deactivate,
      computeDimensions,
      computeIndicatorClientRect,
      focus,
      id: this.id
    });
    this.foundation = new MDCTabFoundation(this);
    this.foundation.init();
    this.foundation.setFocusOnActivate(this.focusOnActivate);
  },

  beforeDestroy() {
    this.foundation.destroy();
  },

  methods: {
    //
    // Private methods
    //
    genContent(c) {
      const children = [];

      if(this.icon) {
        children.push(
          c(
            "mdc-material-icon",
            {
              staticClass: "mdc-tab__icon",
              props: {
                icon: this.icon,
                tag: "span"
              }
            }
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
    // Both Public and adapter methods
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