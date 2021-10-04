import {MDCCheckboxFoundation, cssClasses} from "@material/checkbox";
import Vue, {CreateElement, VNode} from 'vue';
import {domPropDefFactory} from '@/utils';

let checkboxID_ = 0;

export default Vue.extend({
  name: "mdc-checkbox",

  inheritAttrs: false,

  props: {
    checked: Boolean,
    disabled: Boolean,
    id: {
      type: String,
      default: ''
    },
    indeterminate: Boolean,
    value: domPropDefFactory()
  },

  data() {
    return {
      id_: "",
      mdcFoundation: new MDCCheckboxFoundation(
        MDCCheckboxFoundation.defaultAdapter
      )
    };
  },

  watch: {
    disabled(value) {
      this.setDisabled(value);
    },

    indeterminate(value) {
      this.setIndeterminate(value);
    }
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

  render(c): VNode {
    return c(
      "div",
      {
        staticClass: cssClasses.ROOT,
        class: {
          [cssClasses.DISABLED]: this.disabled
        },
        on: {
          "animationend": this.onAnimationEnd
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

      this.setDisabled(this.disabled);
      this.setIndeterminate(this.indeterminate);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    getChecked() {
      return (<HTMLInputElement>this.$refs.nativeControlEl).checked;
    },

    setDisabled(disabled: boolean) {
      this.mdcFoundation.setDisabled(disabled);
    },

    setIndeterminate(indeterminate: boolean) {
      (<HTMLInputElement>this.$refs.nativeControlEl).indeterminate = indeterminate;
    },

    genNativeControl(c: CreateElement) {
      const baseAttrs = {
        id: this.id_,
        type: "checkbox",
        checked: this.checked,
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
            "change": this.onNativeControlElChange,
            "input": this.onNativeControlElInput
          }
        }
      );
    },

    genBackground(c: CreateElement) {
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

    onAnimationEnd() {
      this.mdcFoundation.handleAnimationEnd();
    },

    onNativeControlElChange() {
      this.$emit('change', this.getChecked());
      this.mdcFoundation.handleChange();
    },

    onNativeControlElInput() {
      this.$emit('input', this.getChecked());
    },

    //
    // Public methods
    //

    setChecked(checked: boolean) {
      (<HTMLInputElement>this.$refs.nativeControlEl).checked = checked;
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.$el.classList.add(className);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    },

    forceLayout() {
      (<HTMLElement>this.$el).offsetWidth;
    },

    isAttachedToDOM() {
      return !!this.$el.parentNode;
    },

    isIndeterminate() {
      return (<HTMLInputElement>this.$refs.nativeControlEl).indeterminate;
    },

    isChecked() {
      return (<HTMLInputElement>this.$refs.nativeControlEl).checked;
    },

    hasNativeControl() {
      return !!this.$refs.nativeControlEl;
    },

    setNativeControlDisabled(disabled: boolean) {
      (<HTMLInputElement>this.$refs.nativeControlEl).disabled = disabled;
    },

    setNativeControlAttr(attr: string, value: string) {
      (<HTMLInputElement>this.$refs.nativeControlEl).setAttribute(attr, value);
    },

    removeNativeControlAttr(attr: string) {
      (<HTMLInputElement>this.$refs.nativeControlEl).removeAttribute(attr);
    }
  }
});
