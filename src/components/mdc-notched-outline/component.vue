<script>
    "use-strict"

    import MDCFloatingLabel from "./../mdc-floating-label";
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
            notchWidth: Number,
            shakeLabel: Boolean
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

        render(c) {
            return c(
                "div",
                {
                    staticClass: "mdc-notched-outline mdc-notched-outline--upgraded",
                    class: {
                        "mdc-notched-outline--no-label": !this.label
                    }
                },
                [
                    c(
                        "div",
                        {
                            staticClass: "mdc-notched-outline__leading"
                        }
                    ),
                    c(
                        "div",
                        {
                            staticClass: "mdc-notched-outline__notch",
                            ref: "notchEl"
                        },
                        [
                            this.genFloatingLabel(c)
                        ]
                    ),
                    c(
                        "div",
                        {
                            staticClass: "mdc-notched-outline__trailing"
                        }
                    )
                ]
            )
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCNotchedOutlineFoundation(this);
                this.mdcFoundation.init();
            },

            deinit() {
                this.mdcFoundation.destroy();
            },

            genFloatingLabel(c) {
                if(this.label) {
                    return c(
                        "mdc-floating-label",
                        {
                            props: {
                                content: this.label,
                                float: this.floatLabel,
                                shake: this.shakeLabel
                            },
                            ref: "floatingLabel"
                        }
                    );
                }
            },

            getLabelWidth() {
                if(this.$refs.floatingLabel) {
                    return this.$refs.floatingLabel.getWidth();
                }
            },

            // Adapter
            addClass(className) {
                this.$el.classList.add(className);
            },

            removeClass(className) {
                this.$el.classList.remove(className);
            },

            setNotchWidthProperty(width) {
                this.$refs.notchEl.style.setProperty("width", width + "px");
            },

            removeNotchWidthProperty() {
                this.$refs.notchEl.style.removeProperty("width");
            }
        },

        watch: {
            notched() {
                this.notched ? this.mdcFoundation.notch(this.notchWidth || this.getLabelWidth()) : this.mdcFoundation.closeNotch();
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/notched-outline/mdc-notched-outline";
</style>