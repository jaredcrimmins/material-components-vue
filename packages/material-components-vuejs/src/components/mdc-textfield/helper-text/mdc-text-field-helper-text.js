import {MDCTextFieldHelperTextFoundation} from "@material/textfield/helper-text";

export default {
    name: "mdc-text-field-helper-text",

    data() {
        return {
            content_: this.content
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

    mounted() {
        this.mdcFoundation = new MDCTextFieldHelperTextFoundation(this);
        this.mdcFoundation.init();
        this.mdcFoundation.setValidation(true);
    },

    render(c) {
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
                this.content
            ]
        );
    },

    methods: {
        addClass(className) {
            this.$el.classList.add(className);
        },

        hasClass(className) {
            return this.$el.classList.contains(className);
        },

        removeAttr(attr) {
            this.$el.setAttribute(attr, "");
        },

        removeClass(className) {
            this.$el.classList.remove(className);
        },

        setAttr(attr, value) {
            this.$el.setAttribute(attr, value)
        },

        setContent(attr) {
            this.content = attr;
        },

        // Foundation proxy methods
        setValidity(inputIsValid) {
            this.mdcFoundation.setValidity(inputIsValid);
        }
    }
}