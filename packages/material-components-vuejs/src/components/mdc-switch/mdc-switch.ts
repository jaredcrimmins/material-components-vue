import {MDCSwitch} from "@material/switch";
import Vue, {CreateElement, VNode} from 'vue';

export default Vue.extend({
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

    render(c): VNode {
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
                    [
                      this.genThumbUnderlay(c)
                    ]
                )
            ]
        );
    },

    methods: {
        genThumbUnderlay(c: CreateElement) {
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
});
