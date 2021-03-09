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
    <slot></slot>
  </mdc-menu-surface>
</template>

<script>
  import {MDCMenuFoundation, strings} from "@material/menu";
  import {MDCMenuSurface} from "./../mdc-menu-surface";
  import {closest} from "@material/dom/ponyfill";

  let listEl = null;
  let domObserver = null;

  export default {
    name: "mdc-menu",

    components: {
      "mdc-menu-surface": MDCMenuSurface
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
      items: {
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

    watch: {
      open() {
        if(this.open !== this.value) {
          this.$emit("input", this.open);
        }
      },

      value() {
        this.open = this.value;
      }
    },

    methods: {
      init() {
        this.mdcFoundation = new MDCMenuFoundation(this);
        this.mdcFoundation.init();
        this.open = this.value || false;

        domObserver = new MutationObserver(this.foo);
        domObserver.observe(this.$el, {childList: true});
        this.foo();
      },

      deinit() {
        this.mdcFoundation.destroy();
      },

      foo() {
        listEl = this.$el.querySelector(strings.LIST_SELECTOR);

        if(listEl) listEl.addEventListener("MDCList:action", this.onMDCListAction);
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
        let itemElement = this.getMenuItemElements()[event.detail.index];

        if(itemElement) {
          this.mdcFoundation.handleItemAction(itemElement);
        }
      },

      // Adapter methods
      addClassToElementAtIndex(index, className) {
        console.log("addClassToElementAtIndex", className);
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
        console.log(event);
        this.$emit("select", {
          index: event.index
        });
      },

      getMenuItemCount() {
        return this.items.length;
      },

      focusItemAtIndex(index) {
        this.getMenuItemElements()[index].focus();
      },

      focusListRoot() {
        this.$el.querySelector(strings.LIST_SELECTOR).focus();
      },

      getSelectedSiblingOfItemAtIndex(index) {
        let selectionGroupEl = closest(this.getMenuItemElements()[index], ".mdc-menu__selection-group");
        let selectedItemEl = selectionGroupEl.querySelector(".mdc-menu-item--selected");
        
        return selectedItemEl ? this.getMenuItemElements().indexOf(selectedItemEl) : -1;
      },

      isSelectableItemAtIndex(index) {
        return closest(this.getMenuItemElements()[index], ".mdc-menu__selection-group") ? true : false;
      }
    }
  }
</script>