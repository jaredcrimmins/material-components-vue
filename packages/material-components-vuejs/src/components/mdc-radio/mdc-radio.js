import {MDCRadioFoundation, cssClasses} from "@material/radio";

let radioID_ = 0;

export default {
  name: "mdc-radio",

  inheritAttrs: false,

  props: {
    disabled: Boolean,
    name: String,
    value: {
      default: null
    }
  },

  data() {
    return {
      id: "",
      mdcFoundation: new MDCRadioFoundation(MDCRadioFoundation.defaultAdapter)
    };
  },

  created() {
    this.id = this.$attrs.id || `__mdc-radio-${radioID_++}`;
  },

  mounted() {
    this.init();
  },

  watch: {
    disabled(value) {
      this.mdcFoundation.setDisabled(value);
    }
  },

  render(c) {
    return c(
      "div",
      {
        staticClass: cssClasses.ROOT,
        class: {
          [cssClasses.DISABLED]: this.disabled
        }
      },
      [
        this.genNativeControl(c),
        this.genBackground(c),
        c(
          "div",
          {
            staticClass: "mdc-radio__ripple"
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
      this.mdcFoundation = new MDCRadioFoundation(this);
      this.mdcFoundation.init();
      this.mdcFoundation.setDisabled(this.disabled);
    },

    genNativeControl(c) {
      return c(
        "input",
        {
          ref: "nativeControlEl",
          staticClass: "mdc-radio__native-control",
          attrs: Object.assign({
            id: this.id,
            name: this.name,
            type: "radio",
            disabled: this.disabled,
            value: this.value
          }, this.$attrs),
          on: {
            change: () => {
              this.onChange();
            }
          }
        }
      );
    },

    genBackground(c) {
      return c(
        "div",
        {
          staticClass: "mdc-radio__background"
        },
        [
          c(
            "div",
            {
              staticClass: "mdc-radio__outer-circle"
            }
          ),
          c(
            "div",
            {
              staticClass: "mdc-radio__inner-circle"
            }
          )
        ]
      );
    },

    onChange() {
      this.$emit("change", this.value);
    },

    //
    // Adapter methods
    //

    setNativeControlDisabled(disabled) {
      this.$refs.nativeControlEl.disabled = disabled;
    },

    addClass(className) {
      this.$el.classList.add(className);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    }
  }
}