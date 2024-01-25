import {MDCRipple} from "./../mdc-ripple";
import {MDCTabFoundation, strings} from "@material/tab";
import {MDCMaterialIcon} from "../mdc-material-icon";
import MDCTabIndicator from "./tab-indicator";
import {TabListType} from "./tab-bar";
import Vue, {CreateElement, VueConstructor, VNode} from 'vue';
import {emitCustomEvent} from "./../../utils";

let tabID_ = 0;

type ContentElRef = HTMLElement;
type TabIndicatorRef = InstanceType<typeof MDCTabIndicator>;

interface Injections {
  focusOnActivate: boolean;
  tabList: TabListType;
  indicatorSpanContent: boolean;
}

export default (<VueConstructor<Vue & Injections>>Vue).extend({
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
      cssClasses: {} as {[className: string]: boolean},
      attrs: {} as {[attr: string]: string},
      mdcFoundation: new MDCTabFoundation(
        MDCTabFoundation.defaultAdapter
      ),
      id: ""
    };
  },

  render(c): VNode {
    const children = [this.genContent(c)];

    if (!this.indicatorSpanContent) children.push(this.genTabIndicator(c));

    children.push(
      c(
        'span',
        {
          ref: "ripple",
          staticClass: "mdc-tab__ripple"
        }
      )
    );

    return c(
      'mdc-ripple',
      {
        props: {
          standalone: false
        },
        scopedSlots: {
          root: ({cssClass, on, style}) => {
            return c(
              'button',
              {
                staticClass: 'mdc-tab',
                class: {...cssClass, ...this.cssClasses},
                attrs: {
                  ...{
                    id: this.id,
                    role: 'tab'
                  },
                  ...this.attrs
                },
                style,
                on: {
                  blur: on.blur,
                  click: this.onClick,
                  focus: on.focus
                }
              },
              children
            );
          }
        }
      }
    );
  },

  created() {
    this.id = this.$attrs.id || `__mdc-tab-${tabID_++}`;
  },

  mounted() {
    const instance = this;
    const activate = (computeIndicatorClientRect: ClientRect) =>
      instance.mdcFoundation.activate(computeIndicatorClientRect);
    const deactivate = () => instance.mdcFoundation.deactivate();
    const computeIndicatorClientRect = () => {
      return (<TabIndicatorRef>this.$refs.tabIndicator).computeContentClientRect();
    };
    const computeDimensions = () => instance.mdcFoundation.computeDimensions();
    const focus = () => {(<HTMLElement>this.$el).focus();};

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

    setFocusOnActivate(focusOnActivate: boolean) {
      this.mdcFoundation.setFocusOnActivate(focusOnActivate);
    },

    onClick() {
      this.mdcFoundation.handleClick();
    },

    genContent(c: CreateElement) {
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

    genTabIndicator(c: CreateElement) {
      return c(
        "mdc-tab-indicator",
        {
          ref: "tabIndicator"
        },
        this.indicatorIcon
      );
    },

    //
    // Both public and adapter methods
    //

    focus() {
      (<HTMLElement>this.$el).focus();
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

    setAttr(attr: string, value: string) {
      this.attrs = {...this.attrs, [attr]: value};
    },

    activateIndicator(previousIndicatorClientRect: ClientRect) {
      (<TabIndicatorRef>this.$refs.tabIndicator).activate(previousIndicatorClientRect);
    },

    deactivateIndicator() {
      (<TabIndicatorRef>this.$refs.tabIndicator).deactivate();
    },

    getOffsetLeft() {
      return (<HTMLElement>this.$el).offsetLeft;
    },

    getOffsetWidth() {
      return (<HTMLElement>this.$el).offsetWidth;
    },

    getContentOffsetLeft() {
      return (<ContentElRef>this.$refs.contentEl).offsetLeft;
    },

    getContentOffsetWidth() {
      return (<ContentElRef>this.$refs.contentEl).offsetWidth;
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
});
