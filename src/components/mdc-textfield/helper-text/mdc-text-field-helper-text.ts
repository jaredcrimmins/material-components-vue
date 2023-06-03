import {MDCTextFieldHelperTextFoundation, helperTextCssClasses as cssClasses, helperTextStrings as strings} from '@material/textfield';
import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: 'mdc-text-field-helper-text',

  data() {
    return {
      cssClasses: {
        [cssClasses.HELPER_TEXT_PERSISTENT]: this.persistent
      } as {[className: string]: boolean},
      content_: this.content,
      mdcFoundation: new MDCTextFieldHelperTextFoundation(
        MDCTextFieldHelperTextFoundation.defaultAdapter
      )
    };
  },

  props: {
    content: {
      default: () => (''),
      type: String
    },
    id: {
      type: String,
      default: null
    },
    persistent: {
      default: false,
      type: Boolean
    }
  },

  watch: {
    content(value) {
      this.content_ = value;
    }
  },

  mounted() {
    this.mdcFoundation = new MDCTextFieldHelperTextFoundation(this);
    this.mdcFoundation.init();
    this.mdcFoundation.setValidation(true);
  },

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: cssClasses.ROOT,
        class: this.cssClasses,
        attrs: {
          id: this.id,
          [strings.ARIA_HIDDEN]: true
        }
      },
      [
        this.content_
      ]
    );
  },

  methods: {
    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    hasClass(className: string) {
      return !!this.cssClasses[className];
    },

    removeAttr(attr: string) {
      this.$el.setAttribute(attr, '');
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    setAttr(attr: string, value: string) {
      this.$el.setAttribute(attr, value)
    },

    setContent(attr: string) {
      this.content_ = attr;
    },

    // Foundation proxy methods
    setValidity(inputIsValid: boolean) {
      this.mdcFoundation.setValidity(inputIsValid);
    }
  }
});
