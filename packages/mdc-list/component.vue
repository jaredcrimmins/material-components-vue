<script>
    "use-strict"

    import {
        closest,
        matches
    } from "@material/dom/ponyfill";
    import { cssClasses } from "@material/list/constants";
    import { MDCListFoundation } from "@material/list";
    import MDCListItem from "./list-item";

    export default {
        name: "mdc-list",

        components: {
            "mdc-list-item": MDCListItem
        },

        props: {
            radio: Boolean,
            twoLine: Boolean,
            listItems: {
                default() {
                    return [];
                },
                type: Array
            },
            wrapFocus: Boolean
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
                "ul",
                {
                    class: {
                        "mdc-list--two-line": this.twoLine
                    },
                    staticClass: "mdc-list",
                    on: {
                        click: this.onClick,
                        focusin: this.onFocusIn,
                        focusOut: this.onFocusOut,
                        keydown: this.onKeydown
                    }
                },
                this.genListItems(c)
            );
        },

        methods: {
            init() {
                this.mdcFoundation = new MDCListFoundation(this);
                this.mdcFoundation.init();
            },

            genListItems(c) {
                return this.listItems
                .map(listItemSpec => {
                    return this.genListItem(listItemSpec, c);
                });
            },

            genListItem(listItemSpec, c) {
                return c(
                    "mdc-list-item",
                    {
                        class: "mdc-list-item",
                        props: {
                            preselected: listItemSpec.preselected,
                            text: listItemSpec.text
                        }
                    }
                );
            },

            getListItemElements() {
                return Array.from(this.$el.querySelectorAll(".mdc-list-item"));
            },

            getListItemIndex(event) {
                let target = event.target,
                    nearestParent = closest(target, ".mdc-list-item, .mdc-list");

                if(nearestParent && matches(nearestParent , ".mdc-list-item")) {
                    return this.getListItemElements().indexOf(nearestParent);
                }

                return -1;
            },

            onClick(event) {
                let index = this.getListItemIndex(event);

                // TODO: Add checkbox support.
                this.mdcFoundation.handleClick(index, false);
            },

            onFocusIn(event) {
                let index = this.getListItemIndex(event);

                this.mdcFoundation.handleFocusIn(event, index);
            },

            onFocusOut(event) {
                let index = this.getListItemIndex(event);

                this.mdcFoundation.handleFocusOut(event, index);
            },

            onKeydown(event) {
                let index = this.getListItemIndex(event),
                    target = event.target;

                this.mdcFoundation.handleKeydown(event, target.classList.contains("mdc-list-item"), index);
            },

            // Adapter methods
            getListItemCount() {
                return this.listItems.length;
            },

            getFocusedElementIndex() {
                return this.getListItemElements().indexOf(document.activeElement);
            },

            setAttributeForElementIndex(index, attribute, value) {
                let element = this.getListItemElements()[index];

                if(element) {
                    element.setAttribute(attribute, value);
                }
            },
            
            addClassForElementIndex(index, className) {
                let element = this.getListItemElements()[index];

                if(element) {
                    element.classList.add(className);
                }
            },

            removeClassForElementIndex(index, className) {
                let element = this.getListItemElements()[index];

                if(element) {
                    element.classList.remove(className);
                }
            },

            focusItemAtIndex(index) {
                let element = this.getListItemElements()[index];

                if(element) {
                    element.focus();
                }
            },

            setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {
                let element = this.getListItemElements()[listItemIndex],
                    listItemChildren = [].slice.call(element.querySelectorAll(cssClasses.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
                
                listItemChildren
                .forEach(el => {
                    el.setAttribute("tabindex", tabIndexValue);
                });
            },

            // TODO: Add radio support.
            hasRadioAtIndex() {
                return false;
            },

            // TODO: Add checkbox support.
            hasCheckboxAtIndex() {
                return false;
            },

            isCheckboxCheckedAtIndex() {
                return false;
            },

            // TODO: Add checkbox support.
            setCheckedCheckboxOrRadioAtIndex() {

            },

            notifyAction(index) {
                this.$emit("MDCList:action", { index });
            },

            isFocusInsideList() {
                return this.$el !== document.activeElement && this.$el.contains(document.activeElement);
            },

            isRootFocused() {
                return document.activeElement === this.$el;
            },

            listItemAtIndexHasClass(index, className) {
                let element = this.getListItemElements()[index];

                if(element) {
                    element.classList.contains(className);
                }
            },

            getPrimaryTextAtIndex(index) {
                let listItemElement = this.getListItemElements()[index],
                    primaryTextElement = null;

                if(listItemElement) {
                    primaryTextElement = listItemElement.querySelector("mdc-list-item__primary-text");

                    if(primaryTextElement) {
                        return primaryTextElement.textContent;
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    @use "@material/list/mdc-list";
</style>