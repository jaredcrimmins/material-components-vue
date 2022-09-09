import {MDCRadioFoundation, cssClasses} from "@material/radio";
import {MDCRipple} from "../mdc-ripple";
import Vue, {CreateElement, VNode} from 'vue';

let radioID_ = 0;

export default Vue.extend({
  name: "mdc-radio",

  inheritAttrs: false,

  components: {
    "mdc-ripple": MDCRipple
  },

  props: {
    id: {
      type: String,
      default: null
    },
    disabled: Boolean,
    name: {
      type: String,
      default: null
    },
    value: {
      type: [Number, String],
      default: null
    }
  },

  data() {
    return {
      id_: "",
      mdcFoundation: new MDCRadioFoundation(MDCRadioFoundation.defaultAdapter)
    };
  },

  created() {
    this.id_ = this.id || `__mdc-radio-${radioID_++}`;
  },

  mounted() {
    this.init();
  },

  watch: {
    disabled(value) {
      this.mdcFoundation.setDisabled(value);
    }
  },

  render(c): VNode {
    return c(
      "mdc-ripple",
      {
        ref: "ripple",
        staticClass: cssClasses.ROOT,
        class: {
          [cssClasses.DISABLED]: this.disabled
        },
        props: {
          unbounded: true
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

    genNativeControl(c: CreateElement) {
      return c(
        "input",
        {
          ref: "nativeControlEl",
          staticClass: "mdc-radio__native-control",
          attrs: Object.assign({
            id: this.id_,
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

    genBackground(c: CreateElement) {
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

    setNativeControlDisabled(disabled: boolean) {
      (<HTMLInputElement>this.$refs.nativeControlEl).disabled = disabled;
    },

    addClass(className: string) {
      this.$el.classList.add(className);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    }
  }
});
