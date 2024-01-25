import {MDCFadingTabIndicatorFoundation, MDCSlidingTabIndicatorFoundation} from "@material/tab-indicator";
import Vue, {VueConstructor, VNode} from 'vue';

type ContentElRef = HTMLElement;

interface Injections {
  fade: boolean;
  underline: boolean;
}

export default (<VueConstructor<Vue & Injections>>Vue).extend({
  name: "mdc-tab-indicator",

  inject: {
    fade: {
      from: 'mdcTabBarFade__',
      default: false
    },
    underline: {
      from: 'mdcTabBarUnderline__',
      default: false
    }
  },

  data() {
    return {
      cssClasses: {
        "mdc-tab-indicator--fade": this.fade
      } as {[className: string]: boolean},
      contentStyle: {} as {[propertyName: string]: string},
      mdcFoundation: this.fade
        ? new MDCFadingTabIndicatorFoundation(
          MDCFadingTabIndicatorFoundation.defaultAdapter
        )
        : new MDCSlidingTabIndicatorFoundation(
          MDCSlidingTabIndicatorFoundation.defaultAdapter
        )
    };
  },

  render(c): VNode {
    return c(
      "span",
      {
        staticClass: "mdc-tab-indicator",
        class: this.cssClasses
      },
      [
        c(
          "span",
          {
            ref: "contentEl",
            staticClass: "mdc-tab-indicator__content",
            class: {
              "mdc-tab-indicator__content--icon": !!this.$slots.default,
              "mdc-tab-indicator__content--underline": this.underline,
              "material-icons": !!this.$slots.default
            },
            attrs: {
              "aria-hidden": "true"
            },
            style: this.contentStyle
          },
          this.$slots.default
        )
      ]
    );
  },

  mounted() {
    this.mdcFoundation = this.fade
      ? new MDCFadingTabIndicatorFoundation(this)
      : new MDCSlidingTabIndicatorFoundation(this);
    this.mdcFoundation.init();
  },

  beforeDestroy() {
    this.mdcFoundation.destroy();
  },

  methods: {
    //
    // Public methods
    //

    activate(previousIndicatorClientRect?: ClientRect) {
      this.mdcFoundation.activate(previousIndicatorClientRect);
    },

    deactivate() {
      this.mdcFoundation.deactivate();
    },

    //
    // Both public and adapter methods
    //

    computeContentClientRect() {
      return (<ContentElRef>this.$refs.contentEl).getBoundingClientRect();
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

    setContentStyleProperty(prop: string, value: string) {
      this.contentStyle = {...this.contentStyle, [prop]: value};
    }
  }
});
