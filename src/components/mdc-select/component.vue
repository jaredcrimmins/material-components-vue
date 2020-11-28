<template>
    <div
        class="mdc-select"
        :class="{
            'mdc-select--filled': filled,
            'mdc-select--outlined': outlined,
            'mdc-select--disabled': isDisabled
        }"
        v-on:keydown="onKeydown"
    >
        <div
            class="mdc-select__anchor"
            role="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-labelledby="demo-label demo-selected-text"
            v-on:blur="onBlur"
            v-on:click="onClick"
            v-on:focus="onFocus"
        >
            <span v-if="!outlined" class="mdc-select__ripple"></span>
            <mdc-notched-outline
                ref="mdcNotchedOutline"
                v-if="outlined === true"
                :floatLabel="floatingLabelFloat"
                :label="label"
                :notched="notchedOutlineNotched"
                :notchWidth="notchedOutlineWidth"
            >
            </mdc-notched-outline>
            <mdc-floating-label v-if="!outlined" :content="label" :float="floatingLabelFloat"></mdc-floating-label>
            <span class="mdc-select__selected-text">{{ selectedText }}</span>
            <span class="mdc-select__dropdown-icon">
                <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
                    <polygon
                        class="mdc-select__dropdown-icon-inactive"
                        stroke="none"
                        fill-rule="evenodd"
                        points="7 10 12 15 17 10">
                    </polygon>
                    <polygon
                        class="mdc-select__dropdown-icon-active"
                        stroke="none"
                        fill-rule="evenodd"
                        points="7 15 12 10 17 15">
                    </polygon>
                </svg>
            </span>
            <mdc-line-ripple v-if="!outlined" :active="lineRippleActive"></mdc-line-ripple>
        </div>

        <mdc-menu
            ref="mdcMenu"
            class="mdc-select__menu"
            :anchorElement="menuAnchorElement"
            :anchorCorner="menuAnchorCorner"
            :fullWidth="true"
            :menuItems="menuItems"
            :wrapFocus="menuWrapFocus"
            v-on:MDCMenu:selected="onMDCMenuSelected"
            v-on:MDCMenuSurface:opened="onMDCMenuSurfaceOpened"
            v-on:MDCMenuSurface:closed="onMDCMenuSurfaceClosed"
            v-model="menuOpen"
        ></mdc-menu>
    </div>
</template>

<script>
    "use-strict"

    import MDCFloatingLabel from "./../mdc-floating-label";
    import MDCMenu from "./../mdc-menu";
    import { MDCSelectFoundation } from "@material/select";
    import { estimateScrollWidth } from "@material/dom/ponyfill";
    import MDCLineRipple from "./../mdc-line-ripple";
    import MDCNotchedOutline from "./../mdc-notched-outline";

    export default {
        name: "mdc-select",

        components: {
            "mdc-floating-label": MDCFloatingLabel,
            "mdc-menu": MDCMenu,
            "mdc-line-ripple": MDCLineRipple,
            "mdc-notched-outline": MDCNotchedOutline
        },

        domProps: {
            disabled: {
                default: false,
                type: Boolean
            }
        },

        props: {
            // disabled: {
            //     default: false,
            //     type: Boolean
            // },
            filled: Boolean,
            label: String,
            menuItems: Array,
            outlined: Boolean,
            value: {}
        },

        data() {
            return {
                floatingLabelFloat: false,
                isDisabled: this.disabled,
                lineRippleActive: false,
                lineRippleCenter: 0,
                mdcFoundation: null,
                mdcSelect: null,
                menuAnchorCorner: null,
                menuAnchorElement: "mdc-select__anchor",
                menuOpen: false,
                menuWrapFocus: false,
                notchedOutlineNotched: false,
                notchedOutlineWidth: 0,
                selectedText: ""
            };
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCSelectFoundation(this);
                this.mdcFoundation.init();

                this.selectedText = this.value;

                this.menuAnchorElement = this.getAnchorElement();
            },

            onBlur() {
                this.mdcFoundation.handleBlur();
            },

            onClick() {
                this.mdcFoundation.handleClick();
            },

            onFocus() {
                this.mdcFoundation.handleFocus();
            },

            onKeydown(event) {
                this.mdcFoundation.handleKeydown(event);
            },

            onMDCMenuSelected(event) {
                this.mdcFoundation.handleMenuItemAction(event.detail.index);
                this.mdcFoundation.handleChange();
            },

            onMDCMenuSurfaceClosed() {
                this.mdcFoundation.handleMenuClosed();
            },

            onMDCMenuSurfaceOpened() {
                this.mdcFoundation.handleMenuOpened();
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

            activateBottomLine() {
                this.lineRippleActive = true;
            },

            deactivateBottomLine() {
                this.lineRippleActive = false;
            },

            getSelectedMenuItem() {
                let menuItemElements = this.$refs.mdcMenu.getMenuItemElements();

                menuItemElements.forEach((element) => {
                    console.log(element);
                    if(element.classList.contains("mdc-list-item--selected")) {
                        return element;
                    }
                });
            },

            hasLabel() {
                return this.label ? true : false;
            },

            floatLabel(value) {
                this.floatingLabelFloat = value;
            },

            getLabelWidth() {
                let labelWidth = 0;

                labelWidth = estimateScrollWidth(this.$el.querySelector(".mdc-floating-label"));

                return labelWidth;
            },

            hasOutline() {
                return this.outlined ? true : false;
            },

            notchOutline(labelWidth) {
                this.notchedOutlineNotched = true;
                this.notchedOutlineWidth = labelWidth;
            },

            closeOutline() {
                this.notchedOutlineNotched = false;
            },

            setDisabled(isDisabled) {
                this.isDisabled = isDisabled;
            },

            setRippleCenter(normalizedX) {
                this.lineRippleCenter = normalizedX;
            },

            notifyChange(value) {
                // TODO: Update to conform with method signature.
                this.$emit("MDCSelect:change", value);
            },

            setSelectedText(text) {
                this.selectedText = text;
            },

            isSelectAnchorFocused() {
                console.log(document.activeElement === this.$el.querySelector(".mdc-select__anchor"));
                return document.activeElement === this.$el.querySelector(".mdc-select__anchor");
            },

            getSelectAnchorAttr(attr) {
                return this.$el.querySelector(".mdc-select__anchor").getAttribute(attr);
            },

            setSelectAnchorAttr(attr, value) {
                this.$el.querySelector(".mdc-select__anchor").setAttribute(attr, value);
            },

            openMenu() {
                this.menuOpen = true;
            },

            closeMenu() {
                this.menuOpen = false;
            },

            getAnchorElement() {
                return this.$el.querySelector(".mdc-select__anchor");
            },

            setMenuAnchorElement(anchorEl) {
                this.menuAnchorElement = anchorEl;
            },

            setMenuAnchorCorner(anchorCorner) {
                this.menuAnchorCorner = anchorCorner;
            },

            setMenuWrapFocus(wrapFocus) {
                this.menuWrapFocus = wrapFocus;
            },

            focusMenuItemAtIndex(index) {
                this.$refs.mdcMenu.focusItemAtIndex(index);
            },

            getMenuItemValues() {
                let menuItemElements = this.$refs.mdcMenu.getMenuItemElements();

                return menuItemElements
                .map(menuItemElement => {
                    return menuItemElement.getAttribute("data-value") || "";
                });
            },

            getMenuItemCount() {
                return this.menuItems.length;
            },

            getMenuItemTextAtIndex(index) {
                let menuItem = this.menuItems[index];

                if(menuItem) {
                    if(typeof menuItem.text === "string") {
                        return menuItem.text;
                    }
                    else if(typeof menuItem.text === "object") {
                        return menuItem.text.primary;
                    }
                }

                return "";
            },

            getSelectedIndex() {
                let menuItemElements = this.$refs.mdcMenu.getMenuItemElements();

                for(let x = 0; x < menuItemElements.length; x++) {
                    console.log(menuItemElements[x]);
                    if(menuItemElements[x].classList.contains("mdc-menu-item--selected")) {
                        console.log("SELECTED INDEX:", x);
                        return x;
                    }
                }

                return -1;

                // menuItemElements.forEach((element, index) => {
                //     if(element.classList.contains("mdc-menu-item--selected")) {
                //         return index;
                //     }
                // });
            },

            setSelectedIndex(index) {
                this.$refs.mdcMenu.mdcFoundation.setSelectedIndex(index);
            }, 

            // Add typeahead support
            isTypeaheadInProgress() {
                return false;
            },

            // Add typeahead support
            typeaheadMatchItem() {

            }
        },

        watch: {
            selectedText() {
                this.mdcFoundation.handleChange();
                this.$emit("input", this.selectedText);
            },

            value() {
                if(this.value !== this.selectedText) {
                    this.selectedText = this.value;
                }
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/list/mdc-list";
    @use "@material/menu-surface/mdc-menu-surface";
    @use "@material/menu/mdc-menu";
    @use "@material/select/mdc-select";
</style>