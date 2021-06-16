import {MDCCheckboxFoundation, cssClasses} from "@material/checkbox";

export default {
  name: "mdc-checkbox",

  props: {
    checked: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    value: Boolean
  },

  data() {
    return {
      mdcFoundation: new MDCCheckboxFoundation(MDCCheckboxFoundation.defaultAdapter)
    };
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
    init() {
      this.mdcFoundation = new MDCCheckboxFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genNativeControl(c) {
      return c(
        "input",
        {
          ref: "nativeControl",
          staticClass: cssClasses.NATIVE_CONTROL,
          attrs: {
            type: "checkbox",
            checked: this.checked,
            disabled: this.disabled,
            "data-indeterminate": this.indeterminate ? "true" : "false",
            value: this.value
          },
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

    onNativeControlElChange() {
      if(!this.indeterminate) this.checked = !this.checked;

      this.mdcFoundation.handleChange();
    },

    // Public methods

    setChecked(checked) {
      this.checked = checked;
    },

    // Adapter methods
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
      this.$refs.removeAttribute(attr);
    }
  }
}