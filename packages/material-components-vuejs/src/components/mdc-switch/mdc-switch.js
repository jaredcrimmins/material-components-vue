import {MDCSwitch} from "@material/switch";

export default {
    name: "mdc-switch",

    props: {
        checked: Boolean
    },

    data() {
        return {
            mdcTextField: null
        };
    },

    mounted() {
        this.mdcTextField = new MDCSwitch(this.$el);
    },

    render(c) {
        return c(
            "div",
            {
                staticClass: "mdc-switch"
            },
            [
                c(
                    "div",
                    {
                        staticClass: "mdc-switch__track"
                    },
                    this.genThumbUnderlay(c)
                )
            ]
        );
    },

    methods: {
        genThumbUnderlay(c) {
            return c(
                "div",
                {
                    staticClass: "mdc-switch__thumb-underlay"
                },
                [
                    c(
                        "div",
                        {
                            staticClass: "mdc-switch__thumb"
                        }
                    ),
                    c(
                        "input",
                        {
                            staticClass: "mdc-switch__native-control",
                            attrs: {
                                "type": "checkbox",
                                "role": "switch"
                            },
                            props: {
                                value: this.checked
                            }
                        }
                    )
                ]
            );
        }
    }
}