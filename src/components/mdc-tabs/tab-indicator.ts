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
        class: {
          "mdc-tab-indicator--fade": this.fade
        }
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
            }
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
      this.$el.classList.add(className);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    },

    setContentStyleProperty(prop: string, value: string) {
      (<ContentElRef>this.$refs.contentEl).style.setProperty(prop, value);
    }
  }
});
