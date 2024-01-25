import {MDCFadingTabIndicatorFoundation, MDCSlidingTabIndicatorFoundation} from "@material/tab-indicator";
import {MDCMaterialIcon} from '../mdc-material-icon';
import Vue, {VueConstructor, VNode} from 'vue';

type ContentRef = InstanceType<typeof MDCMaterialIcon>;
type ContentElRef = HTMLElement;

interface Injections {
  fade: boolean;
  underline: boolean;
}

export default (<VueConstructor<Vue & Injections>>Vue).extend({
  name: "mdc-tab-indicator",

  components: {
    'mdc-material-icon': MDCMaterialIcon
  },

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

  computed: {
    isIcon() {
      return !!this.$slots.default;
    }
  },

  render(c): VNode {
    const contentNativeTag = 'span';
    const contentTag = this.isIcon ? 'mdc-material-icon' : contentNativeTag;
    const contentRef = this.isIcon ? 'content' : 'contentEl';

    return c(
      "span",
      {
        staticClass: "mdc-tab-indicator",
        class: this.cssClasses
      },
      [
        c(
          contentTag,
          {
            ref: contentRef,
            staticClass: "mdc-tab-indicator__content",
            class: {
              "mdc-tab-indicator__content--icon": this.isIcon,
              "mdc-tab-indicator__content--underline": this.underline
            },
            attrs: {
              "aria-hidden": this.isIcon ? true : undefined
            },
            style: this.contentStyle,
            props: {
              tag: contentNativeTag
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
    // Private methods
    //

    getContentEl() {
      return this.isIcon ? <HTMLElement>(<ContentRef>this.$refs.content).$el : <ContentElRef>this.$refs.contentEl;
    },

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
      return this.getContentEl().getBoundingClientRect();
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
