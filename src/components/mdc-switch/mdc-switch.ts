import {MDCSwitchFoundation} from '@material/switch';
import Vue, {CreateElement, VNode} from 'vue';

type NativeControlElRef = HTMLInputElement;

export default Vue.extend({
  name: 'mdc-switch',

  props: {
    checked: Boolean,
    disabled: Boolean
  },

  data() {
    return {
      attrs: {
        type: 'checkbox',
        role: 'switch'
      } as {[attributeName: string]: string},
      cssClass: {} as {[className: string]: boolean},
      mdcFoundation: new MDCSwitchFoundation(MDCSwitchFoundation.defaultAdapter)
    };
  },

  watch: {
    checked(value: boolean) {
      this.setChecked(value);
    },

    disabled(value: boolean) {
      this.setDisabled(value);
    }
  },

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-switch',
        class: this.cssClass
      },
      [
        c(
          'div',
          {
            staticClass: 'mdc-switch__track'
          },
          [
            this.genThumbUnderlay(c)
          ]
        )
      ]
    );
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCSwitchFoundation(this);
      this.mdcFoundation.init();
      this.mdcFoundation.setChecked(this.checked);
      this.mdcFoundation.setDisabled(this.disabled);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    setChecked(checked: boolean) {
      this.mdcFoundation.setChecked(checked);
    },

    setDisabled(disabled: boolean) {
      this.mdcFoundation.setDisabled(disabled);
    },

    genThumbUnderlay(c: CreateElement) {
      return c(
        'div',
        {
          staticClass: 'mdc-switch__thumb-underlay'
        },
        [
          c(
            'div',
            {
              staticClass: 'mdc-switch__thumb'
            }
          ),
          c(
            'input',
            {
              ref: 'nativeControlEl',
              staticClass: 'mdc-switch__native-control',
              attrs: this.attrs,
              on: {
                change: this.onNativeControlChange,
                input: this.onNativeControlInput
              }
            }
          )
        ]
      );
    },

    onNativeControlChange(event: Event) {
      const {checked} = <NativeControlElRef>this.$refs.nativeControlEl;

      this.$emit('change', checked);
      this.mdcFoundation.handleChange(event);
    },

    onNativeControlInput() {
      const {checked} = <NativeControlElRef>this.$refs.nativeControlEl;

      this.$emit('input', checked);
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: true};
    },

    removeClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: false};
    },

    setNativeControlChecked(checked: boolean) {
      (<NativeControlElRef>this.$refs.nativeControlEl).checked = checked;
    },

    setNativeControlDisabled(disabled: boolean) {
      (<NativeControlElRef>this.$refs.nativeControlEl).disabled = disabled;
    },

    setNativeControlAttr(attr: string, value: string) {
      this.attrs = {...this.attrs, ...{[attr]: value}};
    }
  }
});
