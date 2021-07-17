import {MDCLinearProgressFoundation} from "@material/linear-progress";

export default {
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
      type: Number
    },
    reverse: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      mdcFoundation: new MDCLinearProgressFoundation(
        MDCLinearProgressFoundation.defaultAdapter
      )
    };
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c) {
    return c(
      "div",
      {
        staticClass: "mdc-linear-progress",
        attrs: {
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
      this.open ? this.mdcFoundation.open() : this.mdcFoundation.close();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    setBuffer(value) {
      this.mdcFoundation.setBuffer(value);
    },

    setDeterminate(value) {
      this.mdcFoundation.setDeterminate(value);
    },

    setProgress(value) {
      this.mdcFoundation.setProgress(value);
    },

    setReverse(value) {
      this.mdcFoundation.setReverse(value);
    },

    genBuffer(c) {
      return c(
        "div",
        { staticClass: "mdc-linear-progress__buffer" },
        [
          c(
            "div",
            {
              ref: "bufferBarEl",
              staticClass: "mdc-linear-progress__buffer-bar"
            }
          ),
          c(
            "div",
            { staticClass: "mdc-linear-progress__buffer-dots" }
          )
        ]
      );
    },

    genPrimaryBar(c) {
      return c(
        "div",
        {
          ref: "primaryBarEl",
          staticClass: "mdc-linear-progress__bar mdc-linear-progress__primary-bar"
        },
        [ this.genBarInner(c) ]
      );
    },

    genSecondaryBar(c) {
      return c(
        "div",
        { staticClass: "mdc-linear-progress__bar mdc-linear-progress__secondary-bar" },
        [ this.genBarInner(c) ]
      );
    },

    genBarInner(c) {
      return c(
        "span",
        { staticClass: "mdc-linear-progress__bar-inner" }
      );
    },

    //
    // Adapter methods
    //

    addClass(className) {
      this.$el.classList.add(className);
    },

    forceLayout() {
      this.$el.getBoundingClientRect();
    },

    setBufferBarStyle(styleProperty, value) {
      const bufferBar = this.$refs.bufferBarEl;

      if(bufferBar) {
        bufferBar.style.setProperty(styleProperty, value);
      }
    },

    setPrimaryBarStyle(styleProperty, value) {
      const primaryBar = this.$refs.primaryBarEl;

      if(primaryBar) {
        primaryBar.style.setProperty(styleProperty, value);
      }
    },

    hasClass(className) {
      return this.$el.classList.contains(className);
    },

    removeAttribute(attributeName) {
      this.$el.removeAttribute(attributeName);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    },

    setAttribute(attributeName, value) {
      this.$el.setAttribute(attributeName, value);
    }
  },

  watch: {
    buffer(value) {
      this.setBuffer(value);
    },

    determinate(value) {
      this.setDeterminate(value);
    },

    open(value) {
      value ? this.mdcFoundation.open() : this.mdcFoundation.close();
    },

    progress(value) {
      this.setProgress(value);
    },

    reverse(value) {
      this.setReverse(value);
    }
  }
}