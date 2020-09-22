<script>
    "use-strict"

    import { MDCLineRippleFoundation } from "@material/line-ripple";

    export default {
        name: "mdc-line-ripple",

        props: {
            active: Boolean,
            rippleCenter: Number
        },

        data() {
            return {
                mdcFoundation: null
            };
        },

        mounted() {
            this.init();
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

            rippleCenter() {
                this.mdcFoundation.setRippleCenter(this.rippleCenter);
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/line-ripple/mdc-line-ripple";
</style>