<template>
  <div
    class="mdc-select"
    :class="{
      'mdc-select--filled': filled,
      'mdc-select--outlined': outlined,
      'mdc-select--disabled': isDisabled
    }"
    @keydown="onKeydown"
  >
    <div
      ref="anchorEl"
      class="mdc-select__anchor"
      role="button"
      aria-haspopup="listbox"
      aria-expanded="false"
      :aria-labelledby="ariaLabelledBy"
      @blur="onBlur"
      @click="onClick"
      @focus="onFocus"
    >
      <span
        v-if="!outlined"
        class="mdc-select__ripple"
      />
      <mdc-notched-outline
        v-if="outlined === true"
        :float-label="floatingLabelFloat"
        :label="label"
        :label-i-d="labelID"
        :notched="notchedOutlineNotched"
        :notch-width="notchedOutlineWidth"
      />
      <mdc-floating-label
        ref="floatingLabel"
        v-if="!outlined"
        :id="labelID"
        :content="label"
        :float="floatingLabelFloat"
      />
      <span class="mdc-select__selected-text-container">
        <span
          :id="selectedTextID"
          class="mdc-select__selected-text"
        >{{ selectedText }}</span>
      </span>
      <span class="mdc-select__dropdown-icon">
        <svg
          class="mdc-select__dropdown-icon-graphic"
          viewBox="7 10 10 5"
          focusable="false"
        >
          <polygon
            class="mdc-select__dropdown-icon-inactive"
            stroke="none"
            fill-rule="evenodd"
            points="7 10 12 15 17 10"
          />
          <polygon
            class="mdc-select__dropdown-icon-active"
            stroke="none"
            fill-rule="evenodd"
            points="7 15 12 10 17 15"
          />
        </svg>
      </span>
      <mdc-line-ripple
        v-if="!outlined"
        :active="lineRippleActive"
      />
    </div>

    <mdc-menu
      ref="menu"
      class="mdc-select__menu"
      :anchor-element="menuAnchorElement"
      :anchor-corner="menuAnchorCorner"
      full-width
      :has-typeahead="hasTypeahead"
      :selected-index="selectedIndex"
      :wrap-focus="menuWrapFocus"
      @select="onMenuSelected"
      @MDCMenuSurface:opened="onMDCMenuSurfaceOpened"
      @MDCMenuSurface:closed="onMDCMenuSurfaceClosed"
      v-model="menuOpen"
    >
      <mdc-menu-selection-group icon="">
        <mdc-menu-item
          ref="menuItems"
          v-for="(item, index) in items"
          :key="index"
          :ripple-disabled="rippleDisabled"
          :value="item.value"
        >
          {{ item.text }}
        </mdc-menu-item>
      </mdc-menu-selection-group>
    </mdc-menu>
  </div>
</template>

<script>
  import {MDCFloatingLabel} from "./../mdc-floating-label";
  import {MDCMenu, MDCMenuItem} from "./../mdc-menu";
  import {MDCSelectFoundation, strings} from "@material/select";
  import {MDCLineRipple} from "./../mdc-line-ripple";
  import {MDCNotchedOutline} from "./../mdc-notched-outline";
  import {emitCustomEvent} from "./../../utils";
  import {estimateScrollWidth} from "@material/dom/ponyfill";

  let selectID_ = 0;

  export default {
    name: "MdcSelect",

    components: {
      "mdc-floating-label": MDCFloatingLabel,
      "mdc-menu": MDCMenu,
      "mdc-menu-item": MDCMenuItem,
      "mdc-line-ripple": MDCLineRipple,
      "mdc-notched-outline": MDCNotchedOutline
    },

    props: {
      disabled: Boolean,
      filled: Boolean,
      hasTypeahead: Boolean,
      items: {
        type: Array,
        default: () => []
      },
      label: {
        type: String,
        default: ""
      },
      outlined: Boolean,
      required: Boolean,
      rippleDisabled: Boolean,
      selectedIndex: {
        type: Number,
        default: -1
      },
      value: {
        type: String,
        default: ""
      }
    },

    data() {
      return {
        floatingLabelFloat: false,
        isDisabled: this.disabled,
        labelID: '',
        lineRippleActive: false,
        lineRippleCenter: 0,
        mdcFoundation: new MDCSelectFoundation(MDCSelectFoundation.defaultAdapter),
        menuAnchorCorner: null,
        menuAnchorElement: "mdc-select__anchor",
        menuOpen: false,
        menuWrapFocus: false,
        notchedOutlineNotched: false,
        notchedOutlineWidth: 0,
        selectedText: "",
        selectedTextID: ''
      };
    },

    computed: {
      ariaLabelledBy() {
        return `${this.labelID} ${this.selectedTextID}`;
      }
    },

    created() {
      this.labelID = `__mdc-select-label${selectID_}`;
      this.selectedTextID = `__mdc-select-selected-text${selectID_}`;
    },

    mounted() {
      this.init();
    },

    beforeDestroy() {
      this.deinit();
    },

    watch: {
      disabled(value) {
        this.setDisabled_(value);
      },

      required(value) {
        this.setRequired(value);
      },

      selectedIndex(value) {
        this.setSelectedIndex(value);
      },

      value(value) {
        this.setValue(value);
      }
    },

    methods: {
      //
      // Private methods
      //

      init() {
        this.mdcFoundation = new MDCSelectFoundation(this);
        this.mdcFoundation.init();
        this.setDisabled_(this.disabled);
        this.setRequired(this.required);
        this.setValue(this.value);

        this.menuAnchorElement = this.getAnchorElement();
      },

      deinit() {
        this.mdcFoundation.destroy();
      },

      setDisabled_(isDisabled) {
        this.mdcFoundation.setDisabled(isDisabled);
      },

      setRequired(value) {
        this.mdcFoundation.setRequired(value);
      },

      setValue(value) {
        value && this.mdcFoundation.setValue(value);
      },

      refreshIndex() {
        const menuItemValues = this.getMenuItemValues();

        this.setSelectedIndex(menuItemValues.indexOf(this.value));
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

      //
      // Private/adapter methods
      //

      getMenuItemValues() {
        return this.$refs.menuItems
        .map(listItem => {
          return listItem.$el.getAttribute("data-value") || "";
        });
      },

      setSelectedIndex(index) {
        this.$refs.menu.setSelectedIndex(index);
      },

      //
      // Adapter methods
      //

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
        return this.$refs.menu.$el.querySelector(".mdc-deprecated-list-item--selected");
      },

      hasLabel() {
        return this.label ? true : false;
      },

      floatLabel(value) {
        this.floatingLabelFloat = value;
      },

      getLabelWidth() {
        const floatingLabelEl = this.$el.querySelector('.mdc-floating-label');

        return estimateScrollWidth(floatingLabelEl);
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
        emitCustomEvent(this.$el, strings.CHANGE_EVENT, {value}, true);
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

      getSelectedIndex() {
        return this.$refs.menu.getSelectedIndex();
      },

      isTypeaheadInProgress() {
        return this.$refs.menu.isTypeaheadInProgress();
      },

      typeaheadMatchItem(nextChar) {
        return this.$refs.menu.typeaheadMatchItem(nextChar);
      }
    }
  }
</script>