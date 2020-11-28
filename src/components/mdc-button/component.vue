<script>
    "use-strict"

    import { MDCRipple } from "@material/ripple";

    export default {
        name: "mdc-button",

        props: {
            elevated: Boolean,
            label: String,
            outlined: Boolean,
            tagName: {
                default: "button",
                type: String
            },
            unelevated: Boolean,
            to: String,

            // HTML attributes
            disabled: Boolean,
            type: {
                default: "button",
                type: String
            }
        },

        data() {
            return {
                mdcRipple: null
            };
        },

        mounted() {
            this.init();
        },

        render(c) {
            let self = this;

            return c(
                this.tagName,
                {
                    attrs: {
                        disabled: this.disabled,
                        type: this.type
                    },
                    staticClass: "mdc-button",
                    class: {
                        "mdc-button--outlined": this.outlined,
                        "mdc-button--raised": this.raised,
                        "mdc-button--unelevated": this.unelevated
                    },
                    on: {
                        click(event) {
                            self.$emit("click", event);
                        }
                    },
                    props: {
                        to: this.to
                    }
                },
                [
                    c(
                        "div",
                        {
                            class: "mdc-button__ripple"
                        }
                    ),
                    c(
                        "slot",
                        this.$slots.append
                    ),
                    c(
                        "span",
                        {
                            class: "mdc-button__label"
                        },
                        this.label
                    ),
                    c(
                        "slot",
                        this.$slots.trailing
                    )
                ]
            )
        },

        methods: {
            init() {
                this.mdcRipple = new MDCRipple(this.$el);
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/button/mdc-button";
</style>