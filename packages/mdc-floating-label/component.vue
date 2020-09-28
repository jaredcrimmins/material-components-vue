<template>
    <label class="mdc-floating-label">{{ content }}</label>
</template>

<script>
    "use-strict"

    import { estimateScrollWidth } from "@material/dom/ponyfill";
    import { MDCFloatingLabelFoundation } from "@material/floating-label";

    export default {
        name: "mdc-floating-label",

        props: {
            content: {
                default: "",
                type: String
            },
            float: {
                default: false,
                type: Boolean
            }
        },

        data() {
            return {
                mdcFoundation: null
            };
        },

        mounted() {
            this.init();
        },

        beforeDestory() {
            this.deinit();
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCFloatingLabelFoundation(this);
                this.mdcFoundation.init();
            },

            deinit() {
                this.mdcFoundation.destroy();
            },

            addClass(className) {
                this.$el.classList.add(className);
            },

            deregisterInteractionHandler(evtType, handler) {
                this.$el.removeEventListener(evtType, handler);
            },

            getWidth() {
                return estimateScrollWidth(this.$el);
            },

            registerInteractionHandler(evtType, handler) {
                this.$el.addEventListener(evtType, handler);
            },

            removeClass(className) {
                this.$el.classList.remove(className);
            }
        },

        watch: {
            float() {
                this.mdcFoundation.float(this.float);
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/floating-label/mdc-floating-label";
</style>