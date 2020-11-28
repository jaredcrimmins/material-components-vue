<template>
    <mdc-menu-surface
        ref="mdcMenuSurface"
        class="mdc-menu"
        :anchorCorner="anchorCorner"
        :anchorElement="anchorElement"
        :fullWidth="fullWidth"
        v-on:MDCMenuSurface:opened="onMDCMenuSurfaceOpened"
        v-on:MDCMenuSurface:closed="onMDCMenuSurfaceClosed"
        v-model="open"
    >
        <mdc-list
            :listItems="menuItems"
            :twoLine="twoLine"
            :wrapFocus="wrapFocus"
            v-on:MDCList:action="onMDCListAction"
        ></mdc-list>
    </mdc-menu-surface>
</template>

<script>
    "use-strict"

    import { closest } from "@material/dom/ponyfill";
    import { MDCMenuFoundation } from "@material/menu";
    import MDCMenuSurface from "./../mdc-menu-surface";
    import MDCList from "./../mdc-list";

    export default {
        name: "mdc-menu",

        components: {
            "mdc-menu-surface": MDCMenuSurface,
            "mdc-list": MDCList
        },

        props: {
            anchorCorner: Number,
            anchorElement: {
                validator: value => {
                    return ["string", "object"].includes(typeof value);
                }
            },
            fixedPosition: Boolean,
            fullWidth: Boolean,
            hasTypeahead: Boolean,
            menuItems: {
                default() {
                    return [];
                },
                type: Array
            },
            twoLine: Boolean,
            value: {
                default() {
                    return false;
                },
                type: Boolean
            },
            wrapFocus: {
                default: false,
                type: Boolean
            }
        },

        data() {
            return {
                mdcFoundation: null,
                open: false
            };
        },

        mounted() {
            this.init();
        },

        beforeDestroy() {
            this.deinit();
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCMenuFoundation(this);
                this.mdcFoundation.init();
                this.open = this.value || false;
            },

            deinit() {
                this.mdcFoundation.destroy();
            },

            getMenuItemElements() {
                return Array.from(this.$el.querySelectorAll(".mdc-list-item"));
            },

            onMDCMenuSurfaceClosed() {
                this.$emit("MDCMenuSurface:closed");
            },

            onMDCMenuSurfaceOpened() {
                this.$emit("MDCMenuSurface:opened");
            },

            onMDCListAction(event) {
                let itemElement = this.getMenuItemElements()[event.index];

                if(itemElement) {
                    this.mdcFoundation.handleItemAction(itemElement);
                }
            },

            // Adapter methods
            addClassToElementAtIndex(index, className) {
                this.getMenuItemElements()[index].classList.add(className);
            },

            removeClassToElementAtIndex(index, className) {
                this.getMenuItemElements()[index].classList.remove(className);
            },

            addAttributeToElementAtIndex(index, attr, value) {
                this.getMenuItemElements()[index].setAttribute(attr, value);
            },

            removeAttributeFromElementAtIndex(index, attr) {
                this.getMenuItemElements()[index].removeAttribute(attr);
            },

            elementContainsClass(element, className) {
                return element.classList.contains(className);
            },

            closeSurface(skipRestoreFocus) {
                this.$refs.mdcMenuSurface.mdcFoundation.close();

                if(!skipRestoreFocus) {
                    this.$refs.mdcMenuSurface.restoreFocus();
                }
            },

            getElementIndex(element) {
                return this.getMenuItemElements().indexOf(element);
            },

            notifySelected(event) {
                this.$emit("MDCMenu:selected", {
                    detail: {
                        index: event.index,
                        item: this.getMenuItemElements()[event.index]
                    }
                });
            },

            getMenuItemCount() {
                return this.menuItems.length;
            },

            focusItemAtIndex(index) {
                this.getMenuItemElements()[index].focus();
            },

            focusListRoot() {
                this.$el.querySelector(".mdc-list").focus();
            },

            getSelectedSiblingOfItemAtIndex(index) {
                let selectionGroupEl = closest(this.getMenuItemElements()[index], ".mdc-menu__selection-group"),
                    selectedItemEl = selectionGroupEl.querySelector(".mdc-menu-item--selected");
                
                return selectedItemEl ? this.getMenuItemElements().indexOf(selectedItemEl) : -1;
            },

            isSelectableItemAtIndex(index) {
                return closest(this.getMenuItemElements()[index], ".mdc-menu__selection-group") ? true : false;
            }
        },

        watch: {
            open() {
                if(this.open !== this.value) {
                    this.$emit("input", this.open);
                }
            },

            value() {
                this.open = this.value;
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/menu/mdc-menu";
</style>