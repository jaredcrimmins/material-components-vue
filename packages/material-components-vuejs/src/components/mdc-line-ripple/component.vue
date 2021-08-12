<script>
    import {MDCLineRippleFoundation} from "@material/line-ripple";

    export default {
        name: "MdcLineRipple",

        props: {
            active: Boolean,
            rippleCenter: {
                type: Number,
                default: null
            }
        },

        data() {
            return {
                mdcFoundation: new MDCLineRippleFoundation(
                    MDCLineRippleFoundation.defaultAdapter
                )
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
                "span",
                {
                    class: "mdc-line-ripple"
                }
            );
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCLineRippleFoundation(this);
                this.mdcFoundation.init();

                this.setRippleCenter(this.rippleCenter);
            },

            deinit() {
                this.mdcFoundation.destroy();
            },

            setRippleCenter(rippleCenter) {
                if (rippleCenter !== null)
                    this.mdcFoundation.setRippleCenter(rippleCenter);
            },

            // Adapter methods
            addClass(className) {
                this.$el.classList.add(className);
            },

            removeClass(className) {
                this.$el.classList.remove(className);
            },

            hasClass(className) {
                return this.$el.classList.contains(className);
            },

            setStyle(propertyName, value) {
                this.$el.style.setProperty(propertyName, value);
            },

            registerEventHandler(evtType, handler) {
                this.$el.addEventListener(evtType, handler);
            },

            deregisterEventHandler(evtType, handler) {
                this.$el.removeEventListener(evtType, handler);
            }
        },

        watch: {
            active() {
                this.active ? this.mdcFoundation.activate() : this.mdcFoundation.deactivate();
            },

            rippleCenter(value) {
                this.setRippleCenter(value);
            }
        }
    }
</script>