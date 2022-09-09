import {EventType, SpecificEventListener} from '@material/base/types';
import {MDCFormFieldFoundation} from '@material/form-field';
import {MDCRipple} from '../mdc-ripple';
import Vue, {CreateElement, VNode} from 'vue';
import {getSlot} from '@/utils';

const cssClasses = {...MDCFormFieldFoundation.cssClasses, ...{
  FORM_ALIGN_END_CLASS: 'mdc-form-field--align-end',
  FORM_NO_WRAP_CLASS: 'mdc-form-field--nowrap'
}};

let formFieldId_ = 0;

type InputRippleRef = InstanceType<typeof MDCRipple>;

export type LabelElRef = HTMLElement;

export default Vue.extend({
  name: 'mdc-form-field',

  props: {
    alignEnd: Boolean,
    inputId: {
      type: String,
      default: () => `__mdc-form-field-${formFieldId_}`
    },
    label: {
      type: String,
      default: null
    },
    nowrap: Boolean
  },

  data() {
    return {
      mdcFoundation: new MDCFormFieldFoundation(
        MDCFormFieldFoundation.defaultAdapter
      )
    };
  },

  provide(): object {
    return {
      mdcFormFieldInputId__: this.inputId
    };
  },

  render(c: CreateElement): VNode {
    return c(
      'div',
      {
        staticClass: cssClasses.ROOT,
        class: {
          [cssClasses.FORM_ALIGN_END_CLASS]: this.alignEnd,
          [cssClasses.FORM_NO_WRAP_CLASS]: this.nowrap
        }
      },
      [
        this.getDefaultSlot(),
        c(
          'label',
          {
            ref: 'labelEl',
            attrs: {
              for: this.inputId
            }
          },
          this.label
        )
      ]
    );
  },

  created() {
    formFieldId_++;
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
      this.mdcFoundation = new MDCFormFieldFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    getDefaultSlot() {
      return getSlot(this, 'default');
    },

    getInputRippleRef() {
      const defaultSlot = this.getDefaultSlot();

      if (defaultSlot)
        return (<InputRippleRef>defaultSlot[0].componentInstance?.$refs.ripple);
    },

    //
    // Adapter methods
    //

    registerInteractionHandler<K extends EventType>(type: K, handler: SpecificEventListener<K>) {
      (<LabelElRef>this.$refs.labelEl).addEventListener(type, handler);
    },

    deregisterInteractionHandler<K extends EventType>(type: K, handler: SpecificEventListener<K>) {
      (<LabelElRef>this.$refs.labelEl).removeEventListener(type, handler);
    },

    activateInputRipple() {
      const activate = this.getInputRippleRef()?.activate;

      if (activate) activate();
    },

    deactivateInputRipple() {
      const deactivate = this.getInputRippleRef()?.deactivate;

      if (deactivate) deactivate();
    }
  }
});
