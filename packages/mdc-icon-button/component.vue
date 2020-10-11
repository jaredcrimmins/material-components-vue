<template>
    <button
        class="mdc-icon-button material-icons"
        :disabled="disabled"
    >
        <div class="mdc-button__icon">
            <slot></slot>
        </div>
        <!-- <img class="mdc-icon-button__icon" :src="src"> -->
    </button>
</template>

<script>
    "use-strict"

    import { MDCRipple } from "@material/ripple";

    export default {
        name: "mdc-icon-button",

        props: {
            disabled: Boolean
        },

        data() {
            return {
                mdcRipple: null
            }
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
    @import "https://fonts.googleapis.com/icon?family=Material+Icons";
</style>