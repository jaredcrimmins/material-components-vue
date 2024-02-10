import {NativeEventListener} from '@/utils';
import {MDCFloatingLabel} from '../mdc-floating-label';
import {MDCNotchedOutline} from '../mdc-notched-outline';
import {MDCLineRipple} from '../mdc-line-ripple';
import {MDCTextFieldCharacterCounter} from './character-counter';
import {MDCTextFieldFoundation, MDCTextFieldNativeInputElement, cssClasses} from '@material/textfield';
import {MDCTextFieldHelperText} from './helper-text';
import Vue, {CreateElement, PropType, VNode} from 'vue';
import {events} from '@material/dom';

let mdcTextFieldId_ = 0;

type CharacterCounterRef = InstanceType<typeof MDCTextFieldCharacterCounter>;
type FloatingLabelRef = InstanceType<typeof MDCFloatingLabel>;
type HelperTextRef = InstanceType<typeof MDCTextFieldHelperText>;
type InputElRef = HTMLInputElement;
type NotchedOutlineRef = InstanceType<typeof MDCNotchedOutline>;
type RootElRef = HTMLElement;

export default Vue.extend({
  name: 'mdc-text-field',

  inheritAttrs: false,

  components: {
    'mdc-floating-label': MDCFloatingLabel,
    'mdc-line-ripple': MDCLineRipple,
    'mdc-notched-outline': MDCNotchedOutline,
    'mdc-text-field-character-counter': MDCTextFieldCharacterCounter,
    'mdc-text-field-helper-text': MDCTextFieldHelperText
  },

  props: {
    characterCounter: Boolean,
    filled: Boolean,
    fullWidth: Boolean,
    helperText: {
      default() {
        return {
          persistent: false,
          value: ''
        };
      },
      type: Object
    },
    label: {
      type: String,
      default: ''
    },
    multiline: Boolean,
    outlined: Boolean,
    requiredAsterisk: {
      type: Boolean,
      default: true
    },
    resizable: Boolean,
    rules: {
      default: () => [],
      type: <PropType<((value: string) => boolean | string)[]>>Array
    },
    useNativeValidation: Boolean,

    // HTML attributes
    autocomplete: {
      type: String,
      default: null
    },
    disabled: Boolean,
    maxlength: {
      type: <PropType<Number | null>>Number,
      default: null
    },
    multiple: Boolean,
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    readonly: Boolean,
    required: Boolean,
    size: {
      type: <PropType<Number | null>>Number,
      default: null
    },
    spellcheck: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      cssClass: {} as {[className: string]: boolean},
      floatLabel_: false,
      labelRequired: false,
      helperTextId: `__mdc-text-field-helper-text${mdcTextFieldId_}`,
      helperTextValue_: this.helperText.value,
      internalValue: this.value,
      mdcFoundation: new MDCTextFieldFoundation(
        MDCTextFieldFoundation.defaultAdapter
      ),
      notchedOutlineNotched: false,
      notchedOutlineNotchWidth: 0,
      labelId: `__mdc-text-field-label${mdcTextFieldId_++}`,
      lineRippleActive: false,
      lineRippleCenter: 0,
      shakeLabel_: false,
      valid: true
    };
  },

  computed: {
    hasFloatingLabel(): boolean {
      return !!(this.label && !this.fullWidth && !this.multiline && !this.outlined);
    },

    // If the label prop hasn't been provided, then a built-in label element is
    // not rendered. Additionally, the presence of the fullWidth and multiline
    // props mean this component should render as a textarea, and textarea
    // versions of this component do not render label elements.
    hasLabelEl(): boolean {
      return !!(this.label && !this.fullWidth && !this.multiline);
    },

    hasNothcedOutline(): boolean {
      return !!(this.label && this.isOutlined);
    },

    isOutlined(): boolean {
      return this.outlined || this.multiline;
    }
  },

  created() {
    mdcTextFieldId_++;
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c): VNode {
    return c(
      'div',
      [
        c(
          'div',
          {
            ref: 'rootEl',
            staticClass: cssClasses.ROOT,
            class: {...this.cssClass, ...{
              [cssClasses.DISABLED]: this.disabled,
              'mdc-text-field--filled': this.filled,
              [cssClasses.NO_LABEL]: !this.hasLabelEl,
              [cssClasses.OUTLINED]: this.outlined,
              [cssClasses.TEXTAREA]: this.multiline
            }},
            on: {
              click: this.onClick
            }
          },
          [
            this.genInput(c),
            this.genLineRipple(c),
            this.genNotchedOutline(c),
            this.genFloatingLabel(c)
          ]
        ),
        this.genHelperLine(c)
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCTextFieldFoundation(this, {
        characterCounter: (<CharacterCounterRef>this.$refs.characterCounter)?.mdcFoundation,
        helperText: (<HelperTextRef>this.$refs.helperText)?.mdcFoundation,
      });
      this.mdcFoundation.init();
      this.mdcFoundation.setUseNativeValidation(this.useNativeValidation);
      this.mdcFoundation.setValid(this.valid);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genInput(c: CreateElement) {
      const self = this;
      const baseAttrs = {
        autocomplete: this.autocomplete,
        disabled: this.disabled,
        maxlength: this.maxlength,
        multiple: this.multiple,
        name: this.name,
        placeholder: this.placeholder,
        readonly: this.readonly,
        required: this.required,
        size: this.size,
        spellcheck: this.spellcheck,
        ['aria-controls']: this.helperTextValue_ ? this.helperTextId : undefined,
        ['aria-describedby']: this.helperTextValue_ ? this.helperTextId : undefined,
        ['aria-labeledby']: this.label ? this.labelId : undefined
      };

      if (this.multiline) {
        if (this.resizable) {
          return c(
            'span',
            {
              staticClass: 'mdc-text-field__resizer'
            },
            [genTextarea(c)]
          );
        }

        return genTextarea(c);
      }

      return c(
        'input',
        {
          ref: 'inputEl',
          staticClass: 'mdc-text-field__input',
          attrs: Object.assign(
            {},
            this.$attrs,
            baseAttrs,
            {
              type: this.type,
              value: this.internalValue
            }
          ),
          on: {
            change: this.onInputElChange,
            focus: this.onInputElFocus,
            blur: this.onInputElBlur,
            input: this.onInputElInput
          }
        }
      );

      function genTextarea(c: CreateElement) {
        return c(
          'textarea',
          {
            ref: 'inputEl',
            staticClass: 'mdc-text-field__input',
            attrs: Object.assign(
              {},
              self.$attrs,
              baseAttrs
            ),
            on: {
              change: self.onInputElChange,
              focus: self.onInputElFocus,
              blur: self.onInputElBlur,
              input: self.onInputElInput
            }
          },
          self.internalValue
        );
      }
    },

    genLineRipple(c: CreateElement) {
      if (!this.outlined && !this.multiline) {
        return c(
          'mdc-line-ripple',
          {
            props: {
              active: this.lineRippleActive,
              lineRippleCenter: this.lineRippleCenter
            }
          }
        );
      }
    },

    genNotchedOutline(c: CreateElement) {
      const label = this.label;

      if (this.isOutlined) {
        return c(
          'mdc-notched-outline',
          {
            ref: 'notchedOutline',
            props: {
              floatLabel: this.floatLabel_,
              label,
              labelId: this.labelId,
              labelRequired: this.labelRequired,
              notched: this.notchedOutlineNotched,
              notchWidth: this.notchedOutlineNotchWidth,
              shakeLabel: this.shakeLabel_
            }
          }
        );
      }
    },

    genFloatingLabel(c: CreateElement) {
      if (this.hasFloatingLabel) {
        return c(
          'mdc-floating-label',
          {
            props: {
              content: this.label,
              float: this.floatLabel_,
              id: this.labelId,
              required: this.labelRequired,
              shake: this.shakeLabel_
            }
          }
        );
      }
    },

    genHelperLine(c: CreateElement) {
      if (this.helperTextValue_ || this.characterCounter) {
        return c(
          'div',
          {
            staticClass: cssClasses.HELPER_LINE
          },
          [
            this.genHelperText(c),
            this.genCharacterCounter(c)
          ]
        );
      }
    },

    genHelperText(c: CreateElement) {
      if (this.helperTextValue_) {
        return c(
          'mdc-text-field-helper-text',
          {
            ref: 'helperText',
            props: {
              content: this.helperTextValue_,
              id: this.helperTextId,
              persistent: this.helperText.persistent
            }
          }
        );
      }
    },

    genCharacterCounter(c: CreateElement) {
      if (this.characterCounter) {
        return c(
          'mdc-text-field-character-counter',
          {
            ref: 'characterCounter',
            props: {
              currentLength: this.value?.length,
              maxLength: this.maxlength
            }
          }
        );
      }
    },

    onClick() {
      this.mdcFoundation.handleTextFieldInteraction();
    },

    onInputElChange(event: InputEvent) {
      this.internalValue = (<HTMLInputElement>event.target).value;
      !this.useNativeValidation && this.evaluateRules();
    },

    onInputElInput(event: InputEvent) {
      const eventTarget = <HTMLInputElement>event.target;

      this.mdcFoundation.handleInput();

      this.internalValue = eventTarget.value;
      this.$emit('input', eventTarget.value);
    },

    onInputElBlur() {
      this.mdcFoundation.deactivateFocus();
    },

    onInputElFocus() {
      this.mdcFoundation.activateFocus();
    },

    setLabelRequired_(isRequired: boolean) {
      if (this.label && this.requiredAsterisk) {
        this.labelRequired = isRequired;
      }
    },

    //
    // Public methods
    //

    evaluateRules(silent?: boolean) {
      let evaluationResult = true;

      for (const rule in this.rules) {
        const ruleResult = this.rules[rule](this.internalValue);

        if (ruleResult === true) {
          this.helperTextValue_ = '';
          if (!silent) this.valid = true;
        } else {
          evaluationResult = false;
          this.helperTextValue_ = ruleResult;
          if (!silent) this.valid = false;

          break;
        }
      }

      return evaluationResult;
    },

    isValid(evaluateRules = true, silent?: boolean) {
      let isValid = false;

      isValid = this.mdcFoundation.isValid();


      if (this.required) {
        isValid = !!this.internalValue;
      }
      if (!this.useNativeValidation && evaluateRules) {
        isValid = this.evaluateRules(silent);
      }

      return isValid;
    },

    //
    // Adapter methods
    //

    // MDC root adapter methods

    addClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: true};
    },

    deregisterTextFieldInteractionHandler(evtType: string, handler: NativeEventListener) {
      (<RootElRef>this.$refs.rootEl).removeEventListener(evtType, handler);
    },

    deregisterValidationAttributeChangeHandler(observer: MutationObserver) {
      observer.disconnect();
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    removeClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: false};
    },

    registerTextFieldInteractionHandler(evtType: string, handler: NativeEventListener) {
      (<RootElRef>this.$refs.rootEl).addEventListener(evtType, handler);
    },

    registerValidationAttributeChangeHandler(handler: NativeEventListener) {
      const getAttributesList = (mutationsList: MutationRecord[]): string[] => {
        return mutationsList
        .map(function (mutation) { return mutation.attributeName; })
        .filter(function (attributeName) { return attributeName; }) as string[];
      };
      const observer = new MutationObserver(function(mutationsList) {
        return handler(getAttributesList(mutationsList));
      });

      observer.observe(<InputElRef>this.$refs.inputEl, {
        attributes: true,
        childList: false
      });

      return observer;
    },

    // MDC input adapter methods

    deregisterInputInteractionHandler(evtType: string, handler: NativeEventListener) {
      (<InputElRef>this.$refs.inputEl).removeEventListener(evtType, handler, events.applyPassive());
    },

    getNativeInput(): MDCTextFieldNativeInputElement {
      return (<InputElRef>this.$refs.inputEl);
    },

    setInputAttr(attr: string, value: string) {
      (<InputElRef>this.$refs.inputEl).setAttribute(attr, value);
    },

    removeInputAttr(attr: string) {
      (<InputElRef>this.$refs.inputEl).removeAttribute(attr);
    },

    isFocused() {
      return document.activeElement === this.$refs.inputEl;
    },

    registerInputInteractionHandler(evtType: string, handler: NativeEventListener) {
      (<InputElRef>this.$refs.inputEl).addEventListener(evtType, handler, events.applyPassive());
    },

    // MDC label adapter methods

    floatLabel(shouldFloat: boolean) {
      if (this.hasLabel()) {
        this.floatLabel_ = shouldFloat;
      }
    },

    getLabelWidth() {
      if (!this.hasLabel()) return 0;
      else if (this.outlined) return (<NotchedOutlineRef>this.$refs.notchedOutline).getLabelWidth();
      else return (<FloatingLabelRef>this.$refs.label).getWidth();
    },

    hasLabel() {
      return !!this.label;
    },

    shakeLabel(shouldShake: boolean) {
      if(this.hasLabel()) {
        this.shakeLabel_ = shouldShake;
      }
    },

    setLabelRequired(isRequired: boolean) {
      this.setLabelRequired_(isRequired);
    },

    // MDC line ripple adapter methods

    activateLineRipple() {
      this.lineRippleActive = true;
    },

    deactivateLineRipple() {
      this.lineRippleActive = false;
    },

    setLineRippleTransformOrigin(normalizedX: number) {
      this.lineRippleCenter = normalizedX;
    },

    // MDC outline adapter methods

    closeOutline() {
      if(this.hasOutline()) {
        this.notchedOutlineNotched = false;
      }
    },

    hasOutline() {
      return this.outlined;
    },

    notchOutline(labelWidth: number) {
      if(this.hasOutline()) {
        this.notchedOutlineNotchWidth = labelWidth;
        this.notchedOutlineNotched = true;
      }
    }
  },

  watch: {
    required(value) {
      this.setLabelRequired_(value);
    },

    useNativeValidation(value) {
      this.mdcFoundation.setUseNativeValidation(value);
    },

    valid() {
      this.mdcFoundation.setValid(this.valid);
    },

    value(value) {
      this.internalValue = value;
    }
  }
});
