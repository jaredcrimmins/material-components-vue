<template>
    <div
        class="mdc-notched-outline"
        :class="{
            'mdc-notched-outline--no-label': !label 
        }"
    >
        <div class="mdc-notched-outline__leading"></div>
        <div
            v-show="label"
            ref="notchElement"
            class="mdc-notched-outline__notch"
        >
            <mdc-floating-label :float="floatLabel" :content="label"></mdc-floating-label>
        </div>
        <div class="mdc-notched-outline__trailing"></div>
    </div>
</template>

<script>
    "use-strict"

    import MDCFloatingLabel from "@eodm-productions/mdc-floating-label";
    import { MDCNotchedOutlineFoundation } from "@material/notched-outline";

    export default {
        name: "mdc-notched-outline",

        components: {
            "mdc-floating-label": MDCFloatingLabel
        },

        props: {
            floatLabel: Boolean,
            label: String,
            notched: Boolean,
            notchWidth: Number
        },

        data() {
            return {
                mdcFoundation: null
            };
        },

        mounted() {
            this.init();
        },

        beforeDestroy() {
            this.deinit();
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCNotchedOutlineFoundation(this);
                this.mdcFoundation.init();
            },

            deinit() {
                this.mdcFoundation.destroy();
            },

            // Adapter
            addClass(className) {
                this.$el.classList.add(className);
            },

            removeClass(className) {
                this.$el.classList.remove(className);
            },

            setNotchWidthProperty(width) {
                this.$refs.notchElement.style.setProperty("width", width + "px");
            },

            removeNotchWidthProperty() {
                this.$refs.notchElement.style.removeProperty("width");
            }
        },

        watch: {
            notched() {
                this.notched ? this.mdcFoundation.notch(this.notchWidth) : this.mdcFoundation.closeNotch();
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/notched-outline/mdc-notched-outline";
</style>