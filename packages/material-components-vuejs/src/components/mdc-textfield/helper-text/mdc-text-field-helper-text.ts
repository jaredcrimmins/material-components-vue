import {MDCTextFieldHelperTextFoundation} from "@material/textfield/helper-text";
import Vue, {VNode} from 'vue';

export default Vue.extend({
    name: "mdc-text-field-helper-text",

    data() {
        return {
            content_: this.content,
            mdcFoundation: new MDCTextFieldHelperTextFoundation(
              MDCTextFieldHelperTextFoundation.defaultAdapter
            )
        };
    },

    props: {
        content: {
            default: () => (""),
            type: String
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
            "div",
            {
                staticClass: "mdc-text-field-helper-text",
                class: {
                    "mdc-text-field-helper-text--persistent": this.persistent
                },
                attrs: {
                    "aria-hidden": true
                }
            },
            [
                this.content_
            ]
        );
    },

    methods: {
        addClass(className: string) {
            this.$el.classList.add(className);
        },

        hasClass(className: string) {
            return this.$el.classList.contains(className);
        },

        removeAttr(attr: string) {
            this.$el.setAttribute(attr, "");
        },

        removeClass(className: string) {
            this.$el.classList.remove(className);
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
