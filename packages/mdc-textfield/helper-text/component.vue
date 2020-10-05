<template>
    <div
        class="mdc-text-field-helper-text"
        :class="{
            'mdc-text-field-helper-text--persistent': persistent
        }"
        aria-hidden="true"
    >{{ content }}</div>
    <!-- <div v-if="characterCounter || helperText" class="mdc-text-field-helper-line">

        <div v-if="characterCounter" class="mdc-text-field-character-counter">0<span v-if="maxlength"> / {{ maxlength }}</span></div>
    </div> -->
</template>

<script>
    "use-strict"

    import { MDCTextFieldHelperTextFoundation } from "@material/textfield/helper-text";

    export default {
        name: "mdc-text-field-helper-text",

        data() {
            return {
                content_: this.content
            }
        },

        props: {
            content: {
                default: "",
                type: String
            },
            persistent: {
                default: false,
                type: Boolean
            }
        },

        mounted: function() {
            this.mdcFoundation = new MDCTextFieldHelperTextFoundation(this);
            this.mdcFoundation.init();
            this.mdcFoundation.setValidation(true);
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
</script>

<style lang="scss">
    @use "@material/textfield/helper-text";
</style>