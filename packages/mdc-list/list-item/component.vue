<script>
    "use-strict"

    import { MDCRipple } from "@material/ripple";

    export default {
        name: "mdc-list-item",

        props: {
            preselected: Boolean,
            text: [ String, Object ]
        },

        computed: {
            role() {
                return "option";
            }
        },

        data() {
            return {
                mdcRipple: null
            };
        },

        mounted() {
            this.mdcRipple = new MDCRipple(this.$el);
        },

        render(c) {
            return c(
                "li",
                {
                    attrs: {
                        "data-value": typeof this.text === "object" ? this.text.primary : this.text || "",
                        role: "option",
                        tabindex: 0
                    },
                    class: "mdc-list-item"
                },
                [
                    c(
                        "span",
                        {
                            class: "mdc-list-item__ripple"
                        }
                    ),
                    c(
                        "span",
                        {
                            class: "mdc-list-item__text"
                        },
                        this.genListItemText(c)
                    )
                ]
            );
        },

        methods: {
            genListItemText(c) {
                if(typeof this.text === "string") {
                    return this.text;
                }
                else {
                    return [
                        c(
                            "span",
                            {
                                class: "mdc-list-item__primary-text"
                            },
                            this.text.primary
                        ),
                        c(
                            "span",
                            {
                                class: "mdc-list-item__secondary-text"
                            },
                            this.text.secondary
                        )
                    ];
                }
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/list/mdc-list";
    @use "@material/menu-surface/mdc-menu-surface";
    @use "@material/menu/mdc-menu";
</style>