import {MDCLinearProgressFoundation, WithMDCResizeObserver, MDCResizeObserverCallback} from "@material/linear-progress";
import Vue, {CreateElement, VNode} from 'vue';

export default Vue.extend({
  name: "mdc-linear-progress",

  props: {
    buffer: {
      default: 0,
      type: Number
    },
    determinate: {
      default: false,
      type: Boolean
    },
    open: {
      default: false,
      type: Boolean
    },
    progress: {
      default: 0,
      type: Number,
      validator(value: number) {
        return value >= 0 && value <= 1;
      }
    }
  },

  data() {
    return {
      cssClasses: {} as {[className: string]: boolean},
      mdcFoundation: new MDCLinearProgressFoundation(
        MDCLinearProgressFoundation.defaultAdapter
      ),
      bufferBarStyle: <{[key: string]: string}>{},
      primaryBarStyle: <{[key: string]: string}>{}
    };
  },

  watch: {
    buffer(value) {
      this.setBuffer(value);
    },

    determinate(value) {
      this.setDeterminate(value);
    },

    open(value) {
      value ? this.open_() : this.close();
    },

    progress(value) {
      this.setProgress(value);
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c): VNode {
    return c(
      "div",
      {
        staticClass: "mdc-linear-progress",
        class: this.cssClasses,
        attrs: {
          "aria-valuemax": "1",
          "aria-valuemin": "0",
          role: "progress-bar"
        }
      },
      [
        this.genBuffer(c),
        this.genPrimaryBar(c),
        this.genSecondaryBar(c)
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCLinearProgressFoundation(this);
      this.mdcFoundation.init();
      this.setDeterminate(this.determinate);
      this.setProgress(this.progress);
      this.open ? this.open_() : this.close();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    setBuffer(value: number) {
      this.mdcFoundation.setBuffer(value);
    },

    setDeterminate(value: boolean) {
      this.mdcFoundation.setDeterminate(value);
    },

    setProgress(value: number) {
      this.mdcFoundation.setProgress(value);
    },

    open_() {
      this.mdcFoundation.open();
    },

    close() {
      this.mdcFoundation.close();
    },

    genBuffer(c: CreateElement) {
      return c(
        "div",
        { staticClass: "mdc-linear-progress__buffer" },
        [
          c(
            "div",
            {
              ref: "bufferBarEl",
              staticClass: "mdc-linear-progress__buffer-bar",
              style: this.bufferBarStyle
            }
          ),
          c(
            "div",
            { staticClass: "mdc-linear-progress__buffer-dots" }
          )
        ]
      );
    },

    genPrimaryBar(c: CreateElement) {
      return c(
        "div",
        {
          ref: "primaryBarEl",
          staticClass: "mdc-linear-progress__bar mdc-linear-progress__primary-bar",
          style: this.primaryBarStyle
        },
        [ this.genBarInner(c) ]
      );
    },

    genSecondaryBar(c: CreateElement) {
      return c(
        "div",
        { staticClass: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar" },
        [ this.genBarInner(c) ]
      );
    },

    genBarInner(c: CreateElement) {
      return c(
        "span",
        { staticClass: "mdc-linear-progress__bar-inner" }
      );
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    forceLayout() {
      this.$el.getBoundingClientRect();
    },

    setBufferBarStyle(styleProperty: string, value: string) {
      this.bufferBarStyle = {...this.bufferBarStyle, [styleProperty]: value};
    },

    setPrimaryBarStyle(styleProperty: string, value: string) {
      this.primaryBarStyle = {...this.primaryBarStyle, [styleProperty]: value};
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    removeAttribute(attributeName: string) {
      this.$el.removeAttribute(attributeName);
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    setAttribute(attributeName: string, value: string) {
      this.$el.setAttribute(attributeName, value);
    },

    setStyle(name: string, value: string) {
      (<HTMLElement>this.$el).style.setProperty(name, value);
    },

    attachResizeObserver(callback: MDCResizeObserverCallback) {
      const RO = (window as unknown as WithMDCResizeObserver).ResizeObserver;

      if (RO) {
        const ro = new RO(callback);

        ro.observe(this.$el);

        return ro;
      }

      return null;
    },

    getWidth() {
      return (<HTMLElement>this.$el).offsetWidth;
    }
  }
});
