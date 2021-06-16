import {MDCFloatingLabel} from '../mdc-floating-label';
import {MDCNotchedOutline} from '../mdc-notched-outline';
import {MDCLineRipple} from '../mdc-line-ripple';
import {MDCTextFieldCharacterCounter} from './character-counter';
import {MDCTextFieldFoundation, cssClasses} from '@material/textfield';
import {MDCTextFieldHelperText} from './helper-text';
import {applyPassive} from '@material/dom/events';

export default {
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
    inputElementID: String,
    label: String,
    multiline: Boolean,
    outlined: Boolean,
    resizable: Boolean,
    rules: Array,
    useNativeValidation: Boolean,

    // HTML attributes
    autocomplete: String,
    disabled: Boolean,
    maxlength: Number,
    multiple: Boolean,
    name: String,
    placeholder: String,
    readonly: Boolean,
    required: Boolean,
    size: Number,
    spellcheck: String,
    type: String,
    value: {
      default: () => ('')
    }
  },

  data() {
    return {
      floatLabel_: false,
      helperTextValue_: this.helperText.value,
      mdcFoundation: null,
      notchedOutlineNotched: false,
      notchedOutlineNotchWidth: 0,
      lineRippleActive: false,
      lineRippleCenter: 0,
      shakeLabel_: false,
      valid: true
    };
  },

  computed: {
    hasFloatingLabel() {
      return (this.label && !this.fullWidth && !this.multiline && !this.outlined);
      // return (this.label && !this.fullWidth && !this.multiline);
    },

    hasNothcedOutline() {
      return (this.label && this.isOutlined);
    },

    isOutlined() {
      return this.outlined || this.multiline;
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c) {
    return c(
      'div',
      [
        c(
          'div',
          {
            staticClass: 'mdc-text-field',
            class: {
              'mdc-text-field--disabled': this.disabled,
              'mdc-text-field--filled': this.filled,
              'mdc-text-field--no-label': !this.hasFloatingLabel,
              'mdc-text-field--outlined': this.outlined,
              'mdc-text-field--textarea': this.multiline
            },
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
    init() {
      this.mdcFoundation = new MDCTextFieldFoundation(this);
      this.mdcFoundation.init();
      this.mdcFoundation.setUseNativeValidation(this.useNativeValidation);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genInput(c) {
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
        spellcheck: this.spellcheck
      };

      if (this.multiline) {
        if (this.resizable) {
          return c(
            'span',
            {
              staticClass: 'mdc-text-field__resizer'
            },
            genTextarea(c)
          );
        }

        return genTextarea(c);
      }

      return c(
        'input',
        {
          ref: "inputEl",
          staticClass: "mdc-text-field__input",
          attrs: Object.assign(baseAttrs, {
            type: this.type,
            value: this.value
          }),
          on: {
            change: this.onInputElChange,
            focus: this.onInputElFocus,
            blur: this.onInputElBlur,
            input: this.onInputElInput
          }
        }
      );

      function genTextarea(c) {
        return c(
          'textarea',
          {
            ref: "inputEl",
            staticClass: "mdc-text-field__input",
            attrs: Object.assign(baseAttrs, self.$attrs),
            on: {
              change: self.onInputElChange,
              focus: self.onInputElFocus,
              blur: self.onInputElBlur,
              input: self.onInputElInput
            }
          },
          self.value
        );
      }
    },

    genLineRipple(c) {
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

    genNotchedOutline(c) {
      const label = this.label;

      if (this.isOutlined) {
        return c(
          'mdc-notched-outline',
          {
            ref: 'notchedOutline',
            props: {
              floatLabel: this.floatLabel_,
              label,
              notched: this.notchedOutlineNotched,
              notchWidth: this.notchedOutlineNotchWidth,
              shakeLabel: this.shakeLabel_
            }
          }
        );
      }
    },

    genFloatingLabel(c) {
      if (this.hasFloatingLabel) {
        return c(
          'mdc-floating-label',
          {
            props: {
              content: this.label,
              float: this.floatLabel_,
              shake: this.shakeLabel_
            }
          }
        );
      }
    },

    genHelperLine(c) {
      if (this.helperTextValue_ || this.characterCounter) {
        return c(
          'div',
          {
            staticClass: 'mdc-text-field-helper-line'
          },
          [
            this.genHelperText(c),
            this.genCharacterCounter(c)
          ]
        );
      }
    },

    genHelperText(c) {
      if (this.helperTextValue_) {
        return c(
          'mdc-text-field-helper-text',
          {
            ref: 'helperText',
            props: {
              content: this.helperTextValue_,
              persistent: this.helperText.persistent
            }
          }
        );
      }
    },

    genCharacterCounter(c) {
      if (this.characterCounter) {
        return c(
          'mdc-text-field-character-counter',
          {
            props: {
              currentLength: this.value.length,
              maxLength: this.maxlength
            }
          }
        );
      }
    },

    onClick(event) {
      this.mdcFoundation.handleTextFieldInteraction(event);
    },

    onInputElChange() {
      this.evaluateRules();
    },

    onInputElInput(event) {
      this.mdcFoundation.handleInput();

      this.$emit("input", event.target.value);
    },

    onInputElBlur() {
      this.mdcFoundation.deactivateFocus();
    },

    onInputElFocus() {
      this.mdcFoundation.activateFocus();
    },

    // MDC root adapter methods
    addClass(className) {
      this.$el.querySelector(`.${cssClasses.ROOT}`).classList.add(className);
    },

    deregisterTextFieldInteractionHandler(evtType, handler) {
      this.$el.querySelector(`.${cssClasses.ROOT}`).removeEventListener(evtType, handler);
    },

    deregisterValidationAttributeChangeHandler(observer) {
      observer.disconnect();
    },

    hasClass(className) {
      return this.$el.querySelector(`.${cssClasses.ROOT}`).classList.contains(className);
    },

    removeClass(className) {
      this.$el.querySelector(`.${cssClasses.ROOT}`).classList.remove(className);
    },

    registerTextFieldInteractionHandler(evtType, handler) {
      this.$el.querySelector(`.${cssClasses.ROOT}`).addEventListener(evtType, handler);
    },

    registerValidationAttributeChangeHandler(handler) {
      const getAttributesList = mutationsList => {
        return mutationsList
        .map(function (mutation) { return mutation.attributeName; })
        .filter(function (attributeName) { return attributeName; });
      };
      const observer = new MutationObserver(function(mutationsList) {
        return handler(getAttributesList(mutationsList));
      });

      observer.observe(this.$refs.inputEl, {
        attributes: true,
        childList: false,
        subTree: false
      });

      return observer;
    },

    // MDC input adapter methods
    deregisterInputInteractionHandler(evtType, handler) {
      this.$refs.inputEl.removeEventListener(evtType, handler, applyPassive());
    },

    getNativeInput() {
      return this.$refs.inputEl;
    },

    isFocused() {
      return document.activeElement === this.$refs.inputEl;
    },

    registerInputInteractionHandler(evtType, handler) {
      this.$refs.inputEl.addEventListener(evtType, handler, applyPassive());
    },

    // MDC label adapter methods
    floatLabel(shouldFloat) {
      if (this.hasLabel()) {
        this.floatLabel_ = shouldFloat;
      }
    },

    getLabelWidth() {
      return this.hasLabel() ? this.$refs.notchedOutline.getLabelWidth() : 0;
    },

    hasLabel() {
      return this.label ? true : false;
    },

    shakeLabel(shouldShake) {
      if(this.hasLabel()) {
        this.shakeLabel_ = shouldShake;
      }
    },

    // MDC line ripple adapter methods
    activateLineRipple() {
      this.lineRippleActive = true;
    },

    deactivateLineRipple() {
      this.lineRippleActive = false;
    },

    setLineRippleTransformOrigin(normalizedX) {
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

    notchOutline(labelWidth) {
      if(this.hasOutline()) {
        this.notchedOutlineNotchWidth = labelWidth;
        this.notchedOutlineNotched = true;
      }
    },

    // Custom methods
    evaluateRules() {
      for(let rule in this.rules) {
        let ruleResult = this.rules[rule](this.value);

        if(ruleResult === true) {
          this.helperTextValue_ = "";
          this.valid = true;
        }
        else {
          this.helperTextValue_ = ruleResult;
          this.valid = false;

          break;
        }
      }
    }
  },

  watch: {
    valid() {
      this.mdcFoundation.setValid(this.valid);
    },

    value() {
      setTimeout(() => {
        if(this.mdcFoundation.validateOnValueChange_) {
          const isValid = this.mdcFoundation.isValid();
          this.mdcFoundation.styleValidity_(isValid);
        }
        if(this.hasLabel()) {
          this.mdcFoundation.notchOutline(this.mdcFoundation.shouldFloat);
          this.floatLabel(this.mdcFoundation.shouldFloat);
          this.mdcFoundation.styleFloating_(this.mdcFoundation.shouldFloat);
          if(this.mdcFoundation.validateOnValueChange_) {
            this.shakeLabel(this.mdcFoundation.shouldShake);
          }
        }
      }, 0);
    }
  }
}