import {CreateElement, VueConstructor, VNode} from 'vue';
import {ExtractVue} from '@/utils';
import {MDCRadioFoundation, cssClasses} from "@material/radio";
import {MDCRipple} from "../mdc-ripple";
import {mixins} from '@/utils';
import {touchTargetWrappable} from "@/mixins";

let radioID_ = 0;

interface Injections {
  formFieldInputId: string | null;
}

const baseMixins = mixins(touchTargetWrappable);

export default (<VueConstructor<ExtractVue<typeof baseMixins> & Injections>>baseMixins).extend({
  name: "mdc-radio",

  inheritAttrs: false,

  components: {
    "mdc-ripple": MDCRipple
  },

  inject: {
    formFieldInputId: {
      from: "mdcFormFieldInputId__",
      default: null
    }
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
      cssClasses: {
        [cssClasses.DISABLED]: this.disabled
      } as {[className: string]: boolean},
      id_: "",
      mdcFoundation: new MDCRadioFoundation(MDCRadioFoundation.defaultAdapter)
    };
  },

  created() {
    this.id_ = this.id || this.formFieldInputId || `__mdc-radio-${radioID_++}`;
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
        class: this.cssClasses,
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
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    }
  }
});
