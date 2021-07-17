import {MDCFadingTabIndicatorFoundation, MDCSlidingTabIndicatorFoundation} from "@material/tab-indicator";

export default {
  name: "mdc-tab-indicator",

  inject: {
    fade: {
      default: false
    },
    underline: {
      default: false
    }
  },

  data() {
    return {
      mdcFoundation: null
    };
  },

  render(c) {
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

    activate(previousIndicatorClientRect) {
      this.mdcFoundation.activate(previousIndicatorClientRect);
    },

    deactivate() {
      this.mdcFoundation.deactivate();
    },

    //
    // Both public and adapter methods
    //

    computeContentClientRect() {
      return this.$refs.contentEl.getBoundingClientRect();
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

    setContentStyleProperty(prop, value) {
      this.$refs.contentEl.style.setProperty(prop, value);
    }
  }
}