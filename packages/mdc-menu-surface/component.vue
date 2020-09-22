<template>
    <div
        class="mdc-menu-surface"
        :class="{
            'mdc-menu-surface--fullwidth': fullWidth
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
    "use-strict"

    import { MDCMenuSurfaceFoundation } from "@material/menu-surface";

    export default {
        name: "mdc-menu-surface",

        props: {
            absolutePosition: Object,
            anchorElement: {
                validator: value => {
                    return ["string", "object"].includes(typeof value);
                }
            },
            fixed: {
                default: false,
                type: Boolean
            },
            fullWidth: Boolean
        },

        data() {
            return {
                anchorElement_: null, 
                previousFocus: null
            };
        },

        mounted() {
            this.init();
        },

        beforeDestory() {
            this.deinit();
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCMenuSurfaceFoundation(this);
                this.mdcFoundation.init();

                this.getAnchorElement();
            },

            deinit() {
                this.mdcFoundation.destroy();
            },

            getAnchorElement() {
                let anchorElement = null;

                if(typeof this.anchorElement === "string") {
                    anchorElement = this.$root.queryString(anchorElement);
                }
                else if(anchorElement instanceof HTMLElement) {
                    anchorElement = this.anchorElement;
                }
                else {
                    let parentElement = this.$el.parentElement;

                    anchorElement = parentElement && parentElement.querySelector(".mdc-menu-surface--anchor") ? parentElement : null;
                }

                this.anchorElement_ = anchorElement;

                return anchorElement;
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

            hasAnchor() {
                return this.anchorElement_ ? true : false;
            },

            notifyClose() {
                this.$emit("MDCMenuSurface:closed");
            },

            notifyOpen() {
                this.$emit("MDCMenuSurface:opened");
            },

            isElementInContainer(el) {
                return this.$el.contains(el);
            },

            isRTL() {
                return getComputedStyle(this.$el).getPropertyValue("direction") === "rtl";
            },

            isFocused() {
                return this.$el === document.activeElement;
            },

            saveFocus() {
                this.previousFocus = document.activeElement;
            },

            restoreFocus() {
                if(this.$el.contains(document.activeElement)) {
                    if(this.previousFocus && this.previousFocus.focus) {
                        this.previousFocus.focus();
                    }
                }
            },

            getInnerDimensions() {
                return {
                    width: this.$el.offsetWidth,
                    height: this.$el.offsetHeight
                };
            },

            getAnchorDimensions() {
                this.anchorElement_ ? this.anchorElement_.getBoundingClientRect() : null;
            },

            getWindowDimensions() {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },

            getBodyDimensions() {
                return {
                    width: document.body.clientWidth,
                    height: document.body.clientHeight
                };
            },

            setPosition(position) {
                let rootHTML = this.$el;

                rootHTML.style.left = "left" in position ? `${ position.left }px` : "";
                rootHTML.style.right = "right" in position ? `${ position.right }px` : "";
                rootHTML.style.top = "top" in position ? `${ position.top }px` : "";
                rootHTML.style.bottom = "bottom" in position ? `${ position.bottom }px` : "";
            },

            setMaxHeight(height) {
                this.$el.style.maxHeight = height;
            }
        },

        watch: {
            anchorElement() {
                if(this.$el) {
                    this.getAnchorElement();
                }
            },

            fixed() {
                this.mdcFoundation.setFixedPosition(this.fixed);
            },

            absolutePosition() {
                this.mdcFoundation.setAbsolutePosition(this.absolutePosition.x, this.absolutePosition.y);
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/menu-surface/mdc-menu-surface";
</style>