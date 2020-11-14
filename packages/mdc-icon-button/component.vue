<template>
    <button
        class="mdc-icon-button"
        :class="{
            'material-icons': regular,
            'material-icons-outlined': outlined,
            'material-icons-round': round,
            'material-icons-two-tone': twoTone
        }"
        :disabled="disabled"
    >
        <div class="mdc-button__icon">
            <slot></slot>
        </div>
    </button>
</template>

<script>
    "use-strict"

    import { MDCRipple } from "@material/ripple";

    export default {
        name: "mdc-icon-button",

        props: {
            disabled: Boolean,
            iconTheme: {
                type: String,
                default: () => ("regular"),
                validator(value) {
                    return ["regular", "outlined", "round", "sharp", "two-tone"].indexOf(value) !== -1;
                }
            }
        },

        data() {
            return {
                mdcRipple: null
            };
        },

        computed: {
            regular() { return this.iconTheme === "regular"; },
            outlined() { return this.iconTheme === "outlined"; },
            round() { return this.iconTheme === "round"; },
            twoTone() { return this.iconTheme === "two-tone"; }
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {
                this.mdcRipple = new MDCRipple(this.$el);
                this.mdcRipple.unbounded = true;
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/icon-button/mdc-icon-button";
</style>