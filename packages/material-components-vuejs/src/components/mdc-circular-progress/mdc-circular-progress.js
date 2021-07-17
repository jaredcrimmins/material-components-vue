import {MDCCircularProgressFoundation} from "@material/circular-progress";

export default {
  name: "mdc-circular-progress",

  computed: {
    small() {
      return this.size === "small";
    },

    medium() {
      return this.size === "medium";
    },

    large() {
      return this.size === "large";
    }
  },

  props: {
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
      validator(value) {
        return value >= 0 && value <= 1;
      }
    },
    size: {
      default: "large",
      type: String,
      validator(value) {
        // Size prop must match one of these strings.
        return ["small", "medium", "large"].indexOf(value) !== -1;
      }
    }
  },

  data() {
    return {
      mdcFoundation: new MDCCircularProgressFoundation(
        MDCCircularProgressFoundation.defaultAdapter
      )
    };
  },

  watch: {
    determinate(value) {
      this.setDeterminate(value);
    },

    open(value) {
      value ? this.mdcFoundation.open() : this.mdcFoundation.close();
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

  render(c) {
    const circleGraphicAttrs = this.getCircleGraphicAttrs();

    return c(
      "div",
      {
        staticClass: "mdc-circular-progress",
        class: {
          "mdc-circular-progress--small": this.small,
          "mdc-circular-progress--medium": this.medium,
          "mdc-circular-progress--large": this.large
        },
        attrs: {
          "aria-valuemax": "1",
          "aria-valuemin": "0",
          "role": "progress-bar"
        }
      },
      [
        this.genDeterminateContainer(c, circleGraphicAttrs.determinate),
        this.genIndeterminateContainer(c, circleGraphicAttrs.indeterminate)
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCCircularProgressFoundation(this);
      this.mdcFoundation.init();
      this.setDeterminate(this.determinate);
      this.setProgress(this.progress);
      this.open ? this.mdcFoundation.open() : this.mdcFoundation.close();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    getCircleGraphicAttrs() {
      const SMALL_VIEW_BOX = "0 0 24 24";
      const MEDIUM_VIEW_BOX = "0 0 32 32";
      const LARGE_VIEW_BOX = "0 0 48 48";
      const SMALL_CX = 12;
      const MEDIUM_CX = 16;
      const LARGE_CX = 24;
      const SMALL_CY = 12;
      const MEDIUM_CY = 16;
      const LARGE_CY = 24;
      const SMALL_R = 8.75;
      const MEDIUM_R = 12.5;
      const LARGE_R = 18;
      const SMALL_STROKE_DASHARRAY = 54.978;
      const MEDIUM_STROKE_DASHARRAY = 78.54;
      const LARGE_STROKE_DASHARRAY = 113.097;
      const SMALL_DETERMINATE_STROKE_DASHOFFSET = 54.978;
      const MEDIUM_DETERMINATE_STROKE_DASHOFFSET = 78.54;
      const LARGE_DETERMINATE_STROKE_DASHOFFSET = 113.097;
      const SMALL_INDETERMINATE_STROKE_DASHOFFSET = SMALL_DETERMINATE_STROKE_DASHOFFSET / 2;
      const MEDIUM_INDETERMINATE_STROKE_DASHOFFSET = MEDIUM_DETERMINATE_STROKE_DASHOFFSET / 2;
      const LARGE_INDETERMINATE_STROKE_DASHOFFSET = LARGE_DETERMINATE_STROKE_DASHOFFSET / 2;
      let attrs = {
        determinate: {
          "viewBox": "",
          "cx": "",
          "cy": "",
          "r": "",
          "stroke-dasharray": "",
          "stroke-dashoffset": ""
        },
        indeterminate: {
          "viewBox": "",
          "cx": "",
          "cy": "",
          "r": "",
          "stroke-dasharray": "",
          "stroke-dashoffset": ""
        }
      };

      if(this.small) {
        Object.assign(attrs.determinate, {
          "viewBox": SMALL_VIEW_BOX,
          "cx": SMALL_CX,
          "cy": SMALL_CY,
          "r": SMALL_R,
          "stroke-dasharray": SMALL_STROKE_DASHARRAY,
          "stroke-dashoffset": SMALL_DETERMINATE_STROKE_DASHOFFSET
        });
        Object.assign(attrs.indeterminate, {
          "viewBox": SMALL_VIEW_BOX,
          "cx": SMALL_CX,
          "cy": SMALL_CY,
          "r": SMALL_R,
          "stroke-dasharray": SMALL_STROKE_DASHARRAY,
          "stroke-dashoffset": SMALL_INDETERMINATE_STROKE_DASHOFFSET
        });
      }
      else if(this.medium) {
        Object.assign(attrs.determinate, {
          "viewBox": MEDIUM_VIEW_BOX,
          "cx": MEDIUM_CX,
          "cy": MEDIUM_CY,
          "r": MEDIUM_R,
          "stroke-dasharray": MEDIUM_STROKE_DASHARRAY,
          "stroke-dashoffset": MEDIUM_DETERMINATE_STROKE_DASHOFFSET
        });
        Object.assign(attrs.indeterminate, {
          "viewBox": MEDIUM_VIEW_BOX,
          "cx": MEDIUM_CX,
          "cy": MEDIUM_CY,
          "r": MEDIUM_R,
          "stroke-dasharray": MEDIUM_STROKE_DASHARRAY,
          "stroke-dashoffset": MEDIUM_INDETERMINATE_STROKE_DASHOFFSET
        });
      }
      else {
        Object.assign(attrs.determinate, {
          "viewBox": LARGE_VIEW_BOX,
          "cx": LARGE_CX,
          "cy": LARGE_CY,
          "r": LARGE_R,
          "stroke-dasharray": LARGE_STROKE_DASHARRAY,
          "stroke-dashoffset": LARGE_DETERMINATE_STROKE_DASHOFFSET
        });
        Object.assign(attrs.indeterminate, {
          "viewBox": LARGE_VIEW_BOX,
          "cx": LARGE_CX,
          "cy": LARGE_CY,
          "r": LARGE_R,
          "stroke-dasharray": LARGE_STROKE_DASHARRAY,
          "stroke-dashoffset": LARGE_INDETERMINATE_STROKE_DASHOFFSET
        });
      }

      return attrs;
    },

    setDeterminate(value) {
      this.mdcFoundation.setDeterminate(value);
    },

    setProgress(value) {
      this.mdcFoundation.setProgress(value);
    },

    genDeterminateContainer(c, circleGraphicAttrs) {
      return c(
        "div",
        {
          staticClass: "mdc-circular-progress__determinate-container"
        },
        [ this.genDeterminateCircleGraphic(c, circleGraphicAttrs) ]
      );
    },

    genIndeterminateContainer(c, circleGraphicAttrs) {
      return c(
        "div",
        {
          staticClass: "mdc-circular-progress__indeterminate-container"
        },
        [
          c(
            "div",
            {
              staticClass: "mdc-circular-progress__spinner-layer"
            },
            [
              this.genCircleClipper(c, circleGraphicAttrs, true),
              this.genGapPatch(c, circleGraphicAttrs),
              this.genCircleClipper(c, circleGraphicAttrs)
            ]
          )
        ]
      );
    },

    genCircleClipper(c, circleGraphicAttrs, left) {
      let staticClass = "mdc-circular-progress__circle-clipper ";

      staticClass += left ? "mdc-circular-progress__circle-left" : "mdc-circular-progress__circle-right";

      return c(
        "div",
        {
          staticClass
        },
        [ this.genIndeterminateCircleGraphic(c, circleGraphicAttrs) ]
      );
    },

    genDeterminateCircleGraphic(c, attrs) {
      const {
        viewBox,
        cx,
        cy,
        r,
        "stroke-dasharray": strokeDasharray,
        "stroke-dashoffset": strokeDashoffset
      } = attrs;

      return c(
        "svg",
        {
          staticClass: "mdc-circular-progress__determinate-circle-graphic",
          attrs: {
            viewBox,
            "xmlns": "http://www.w3.org/2000/svg"
          }
        },
        [
          c(
            "circle",
            {
              ref: "determinateCirlceEl",
              staticClass: "mdc-circular-progress__determinate-circle",
              attrs: {
                cx,
                cy,
                r,
                "stroke-dasharray": strokeDasharray,
                "stroke-dashoffset": strokeDashoffset
              }
            }
          )
        ]
      );
    },

    genIndeterminateCircleGraphic(c, attrs) {
      const {
        viewBox,
        cx,
        cy,
        r,
        "stroke-dasharray": strokeDasharray,
        "stroke-dashoffset": strokeDashoffset
      } = attrs;

      return c(
        "svg",
        {
          staticClass: "mdc-circular-progress__indeterminate-circle-graphic",
          attrs: {
            viewBox,
            "xmlns": "http://www.w3.org/2000/svg"
          }
        },
        [
          c(
            "circle",
            {
              staticClass: "mdc-circular-progress__determinate-circle",
              attrs: {
                cx,
                cy,
                r,
                "stroke-dasharray": strokeDasharray,
                "stroke-dashoffset": strokeDashoffset
              }
            }
          )
        ]
      );
    },

    genGapPatch(c, circleGraphicAttrs) {
      return c(
        "div",
        { staticClass: "mdc-circular-progress__gap-patch" },
        [ this.genIndeterminateCircleGraphic(c, circleGraphicAttrs) ]
      );
    },

    //
    // Adapter methods
    //

    addClass(className) {
      this.$el.classList.add(className);
    },

    getDeterminateCircleAttribute(attributeName) {
      return this.$refs.determinateCirlceEl.getAttribute(attributeName);
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
    },

    setDeterminateCircleAttribute(attributeName, value) {
      this.$refs.determinateCirlceEl.setAttribute(attributeName, value);
    }
  }
}