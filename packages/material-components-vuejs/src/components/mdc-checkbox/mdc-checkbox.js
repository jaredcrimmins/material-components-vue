import {MDCCheckboxFoundation, cssClasses} from "@material/checkbox";

let checkboxID_ = 0;

export default {
  name: "mdc-checkbox",

  inheritAttrs: false,

  props: {
    checked: Boolean,
    disabled: Boolean,
    id: String,
    indeterminate: Boolean,
    value: {
      default: null
    }
  },

  data() {
    return {
      id_: "",
      mdcFoundation: new MDCCheckboxFoundation(
        MDCCheckboxFoundation.defaultAdapter
      )
    };
  },

  created() {
    this.id_ = this.id || `__mdc-checkbox${checkboxID_++}`;
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  watch: {
    checked(value) {
      this.$emit("change", value);
    },

    disabled(value) {
      this.setDisabled(value);
    }
  },

  render(c) {
    return c(
      "div",
      {
        staticClass: cssClasses.ROOT,
        class: {
          [cssClasses.DISABLED]: this.disabled
        },
        on: {
          "animationend": () => {
            this.mdcFoundation.handleAnimationEnd();
          }
        }
      },
      [
        this.genNativeControl(c),
        this.genBackground(c),
        c(
          "div",
          {
            staticClass: "mdc-checkbox__ripple"
          }
        )
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCCheckboxFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genNativeControl(c) {
      const baseAttrs = {
        id: this.id_,
        type: "checkbox",
        checked: this.checked,
        disabled: this.disabled,
        "data-indeterminate": this.indeterminate ? "true" : "false",
        value: this.value
      };
      const attrs = Object.assign({}, this.$attrs, baseAttrs);

      return c(
        "input",
        {
          ref: "nativeControlEl",
          staticClass: cssClasses.NATIVE_CONTROL,
          attrs,
          on: {
            "change": () => {
              this.onNativeControlElChange();
            }
          }
        }
      );
    },

    genBackground(c) {
      return c(
        "div",
        {
          staticClass: cssClasses.BACKGROUND
        },
        [
          c(
            "svg",
            {
              staticClass: cssClasses.CHECKMARK,
              attrs: {
                viewBox: "0 0 24 24"
              }
            },
            [
              c(
                "path",
                {
                  staticClass: cssClasses.CHECKMARK_PATH,
                  attrs: {
                    fill: "none",
                    d: "M1.73,12.91 8.1,19.28 22.79,4.59"
                  }
                }
              )
            ]
          ),
          c(
            "div",
            {
              staticClass: cssClasses.MIXEDMARK
            }
          )
        ]
      );
    },

    setDisabled(disabled) {
      this.mdcFoundation.setDisabled(disabled);
    },

    onNativeControlElChange() {
      this.mdcFoundation.handleChange();
    },

    //
    // Public methods
    //

    setChecked(checked) {
      this.checked = checked;
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

    forceLayout() {
      this.$el.offsetWidth;
    },

    isAttachedToDOM() {
      return !!this.$el.parentNode;
    },

    isIndeterminate() {
      return this.indeterminate;
    },

    isChecked() {
      return this.checked;
    },

    hasNativeControl() {
      return !!this.$refs.nativeControlEl;
    },

    setNativeControlDisabled(disabled) {
      this.$refs.nativeControlEl.disabled = disabled;
    },

    setNativeControlAttr(attr, value) {
      this.$refs.nativeControlEl.setAttribute(attr, value);
    },

    removeNativeControlAttr(attr) {
      this.$refs.nativeControlEl.removeAttribute(attr);
    }
  }
}