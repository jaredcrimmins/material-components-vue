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
      ref="anchorEl"
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
        v-if="outlined === true"
        :floatLabel="floatingLabelFloat"
        :label="label"
        :notched="notchedOutlineNotched"
        :notchWidth="notchedOutlineWidth"
      >
      </mdc-notched-outline>
      <mdc-floating-label ref="floatingLabel" v-if="!outlined" :content="label" :float="floatingLabelFloat"></mdc-floating-label>
      <span class="mdc-select__selected-text">{{ selectedText }}</span>
      <span class="mdc-select__dropdown-icon">
        <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
          <polygon
            class="mdc-select__dropdown-icon-inactive"
            stroke="none"
            fill-rule="evenodd"
            points="7 10 12 15 17 10"
          >
          </polygon>
          <polygon
            class="mdc-select__dropdown-icon-active"
            stroke="none"
            fill-rule="evenodd"
            points="7 15 12 10 17 15"
          >
          </polygon>
        </svg>
      </span>
      <mdc-line-ripple v-if="!outlined" :active="lineRippleActive"></mdc-line-ripple>
    </div>

    <mdc-menu
      ref="menu"
      class="mdc-select__menu"
      :anchorElement="menuAnchorElement"
      :anchorCorner="menuAnchorCorner"
      fullWidth
      :items="items"
      :wrapFocus="menuWrapFocus"
      v-on:select="onMenuSelected"
      v-on:MDCMenuSurface:opened="onMDCMenuSurfaceOpened"
      v-on:MDCMenuSurface:closed="onMDCMenuSurfaceClosed"
      v-model="menuOpen"
    >
      <mdc-list ref="list">
        <mdc-list-item
          ref="menuItems"
          v-for="(item, index) in items"
          :key="index"
          :value="item.value"
        >
        {{ item.text }}</mdc-list-item>
      </mdc-list>
    </mdc-menu>
  </div>
</template>

<script>
  import {MDCFloatingLabel} from "./../mdc-floating-label";
  import {MDCMenu} from "./../mdc-menu";
  import {MDCSelectFoundation} from "@material/select";
  import {MDCLineRipple} from "./../mdc-line-ripple";
  import {MDCNotchedOutline} from "./../mdc-notched-outline";
  import {estimateScrollWidth} from "@material/dom/ponyfill";

  export default {
    name: "mdc-select",

    components: {
      "mdc-floating-label": MDCFloatingLabel,
      "mdc-menu": MDCMenu,
      "mdc-line-ripple": MDCLineRipple,
      "mdc-notched-outline": MDCNotchedOutline
    },

    props: {
      disabled: {
        default: false,
        type: Boolean
      },
      filled: Boolean,
      label: String,
      items: Array,
      outlined: Boolean,
      value: String
    },

    data() {
      return {
        floatingLabelFloat: false,
        isDisabled: this.disabled,
        lineRippleActive: false,
        lineRippleCenter: 0,
        mdcFoundation: new MDCSelectFoundation(MDCSelectFoundation.defaultAdapter),
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

    watch: {
      value(value) {
        if(this.mdcFoundation) this.mdcFoundation.setValue(value);
      }
    },

    methods: {
      init() {
        this.mdcFoundation = new MDCSelectFoundation(this);
        this.mdcFoundation.init();
        this.mdcFoundation.setDisabled(this.disabled);
        this.mdcFoundation.setRequired(this.required);
        this.mdcFoundation.setValue(this.value);

        this.menuAnchorElement = this.getAnchorElement();
      },

      refreshIndex() {
        let menuItemValues = this.getMenuItemValues();

        this.mdcFoundation.setSelectedIndex(menuItemValues.indexOf(this.value));
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

      onMenuSelected(event) {
        this.mdcFoundation.handleMenuItemAction(event.index);
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
        return this.$refs.list.$el.querySelector(".mdc-list-item--selected");
      },

      hasLabel() {
        return this.label ? true : false;
      },

      floatLabel(value) {
        this.floatingLabelFloat = value;
      },

      getLabelWidth() {
        return estimateScrollWidth(this.$refs.floatingLabel.$el);
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
        this.$emit("change", value);
      },

      setSelectedText(text) {
        this.selectedText = text;
      },

      isSelectAnchorFocused() {
        return document.activeElement === this.$refs.anchorEl;
      },

      getSelectAnchorAttr(attr) {
        return this.$refs.anchorEl.getAttribute(attr);
      },

      setSelectAnchorAttr(attr, value) {
        this.$refs.anchorEl.setAttribute(attr, value);
      },

      removeSelectAnchorAttr(attr) {
        this.$refs.anchorEl.removeAttribute(attr);
      },

      openMenu() {
        this.menuOpen = true;
      },

      closeMenu() {
        this.menuOpen = false;
      },

      getAnchorElement() {
        return this.$refs.anchorEl;
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

      setAttributeAtIndex(index, attributeName, attributeValue) {
        this.$refs.menuItems[index].$el.setAttribute(attributeName, attributeValue);
      },

      focusMenuItemAtIndex(index) {
        this.$refs.menu.focusItemAtIndex(index);
      },

      getMenuItemValues() {
        return this.$refs.menuItems
        .map(listItem => {
          return listItem.$el.getAttribute("data-value") || "";
        });
      },

      getMenuItemCount() {
        return this.items.length;
      },

      getMenuItemAttr(menuItem, attr) {
        return menuItem.getAttribute(attr);
      },

      getMenuItemTextAtIndex(index) {
        let item = this.items[index];

        if(item) {
          if(typeof item.text === "string") {
            return item.text;
          }
          else if(typeof item.primaryText === "object") {
            return item.primaryText;
          }
        }

        return "";
      },

      addClassAtIndex(index, className) {
        this.$refs.menuItems[index].$el.classList.add(className);
      },

      removeClassAtIndex(index, className) {
        this.$refs.menuItems[index].$el.classList.remove(className);
      },

      setSelectedIndex(index) {
        this.$refs.menu.mdcFoundation.setSelectedIndex(index);
      },

      // Add typeahead support
      isTypeaheadInProgress() {
        return false;
      },

      // Add typeahead support
      typeaheadMatchItem() {

      }
    }
  }
</script>