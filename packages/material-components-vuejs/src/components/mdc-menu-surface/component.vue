<template>
    <div
        class="mdc-menu-surface"
        :class="{
            'mdc-menu-surface--fullwidth': fullWidth
        }"
        v-on:keydown="onKeydown"
        v-on:MDCMenuSurface:closed="onClosed"
        v-on:MDCMenuSurface:opened="onOpened"
    >
        <slot></slot>
    </div>
</template>

<script>
    "use-strict"

    import {MDCMenuSurfaceFoundation, util} from "@material/menu-surface";

    export default {
        name: "mdc-menu-surface",

        props: {
            absolutePosition: Object,
            anchorCorner: Number,
            anchorElement: {
                validator: value => {
                    return ["string", "object"].includes(typeof value);
                }
            },
            fixed: {
                default: false,
                type: Boolean
            },
            fullWidth: Boolean,
            hoisted: Boolean,
            quickOpen: Boolean,
            value: {
                default() {
                    return false;
                },
                type: Boolean
            }
        },

        data() {
            return {
                anchorElement_: null, 
                open: false,
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
                this.getAnchorElement();
                this.mdcFoundation = new MDCMenuSurfaceFoundation(this);
                this.mdcFoundation.init();
                this.initListeners();
            },

            deinit() {
                this.deinitListeners();
                this.mdcFoundation.destroy();
            },

            initListeners() {
                document.body.addEventListener("click", this.onBodyClick, { capture: true });
            },

            deinitListeners() {
                document.body.removeEventListener("click", this.onBodyClick);
            },

            getAnchorElement() {
                let anchorElement = null;

                if(typeof this.anchorElement === "string") {
                    anchorElement = this.$root.$el.querySelector(anchorElement);
                }
                else if(this.anchorElement && (this.anchorElement instanceof HTMLElement || this.anchorElement.nodeType)) {
                    anchorElement = this.anchorElement;
                }
                else {
                    let parentElement = this.$el.parentElement;

                    anchorElement = parentElement && parentElement.querySelector(".mdc-menu-surface--anchor") ? parentElement : null;
                }

                this.anchorElement_ = anchorElement;

                return anchorElement;
            },

            onBodyClick(event) {
                this.mdcFoundation.handleBodyClick(event);
            },

            onKeydown(event) {
                this.mdcFoundation.handleKeydown(event);
            },

            onClosed() {
                this.open = false;
            },

            onOpened() {
                this.open = true;
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
                this.onClosed();
            },

            notifyOpen() {
                this.$emit("MDCMenuSurface:opened");
                this.onOpened();
            },

            isElementInContainer(el) {
                return this.$el.contains(el);
            },

            isRTL() {
                return getComputedStyle(this.$el).getPropertyValue("direction") === "rtl";
            },

            setTransformOrigin(value) {
                let propertyName = `${ util.getTransformPropertyName(window) }-origin`;

                this.$el.style.setProperty(propertyName, value);
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
                return this.anchorElement_ ? this.anchorElement_.getBoundingClientRect() : null;
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
            absolutePosition() {
                this.mdcFoundation.setAbsolutePosition(this.absolutePosition.x, this.absolutePosition.y);
            },

            anchorCorner() {
                this.mdcFoundation.setAnchorCorner(this.anchorCorner);
            },

            anchorElement() {
                if(this.$el) {
                    this.getAnchorElement();
                }
            },

            fixed() {
                this.mdcFoundation.setFixedPosition(this.fixed);
            },

            hoisted() {
                this.mdcFoundation.setIsHoisted(this.hoisted);
            },

            open() {
                this.open ? this.mdcFoundation.open() : this.mdcFoundation.close();

                if(this.value !== this.open) {
                    this.$emit("input", this.open);
                }
            },

            value() {
                this.open = this.value;
            }
        }
    }
</script>