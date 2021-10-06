import {MDCFloatingLabel} from "./../mdc-floating-label";
import {MDCMenu, MDCMenuItem} from "./../mdc-menu";
import {MDCSelectFoundation, cssClasses, strings} from "@material/select";
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

  render(c) {
    return c(
      'div',
      {
        staticClass: cssClasses.ROOT,
        class: {
          'mdc-select--filled': this.filled,
          'mdc-select--outlined': this.outlined,
          'mdc-select--disabled': this.disabled
        },
        on: {
          keydown: this.onKeydown
        }
      },
      [
        this.genAnchor(c),
        this.genMenu(c)
      ]
    );
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

    genAnchor(c) {
      const children = [];

      if (this.outlined) {
        children.push(this.genNotchedOutline(c));
        children.push(this.genSelectedTextContainer(c));
        children.push(this.genDropdownIcon(c));
      } else {
        children.push(this.genRipple(c));
        children.push(this.genFloatingLabel(c));
        children.push(this.genSelectedTextContainer(c));
        children.push(this.genDropdownIcon(c));
        children.push(this.genLineRipple(c));
      }

      return c(
        'div',
        {
          ref: 'anchorEl',
          staticClass: 'mdc-select__anchor',
          attrs: {
            role: 'button',
            'aria-haspopup': 'listbox',
            'aria-expanded': 'false',
            'aria-labelledby': this.ariaLabelledBy
          },
          on: {
            blur: this.onBlur,
            click: this.onClick,
            focus: this.onFocus
          }
        },
        children
      );
    },

    genNotchedOutline(c) {
      return c(
        'mdc-notched-outline',
        {
          props: {
            floatLabel: this.floatingLabelFloat,
            label: this.label,
            labelID: this.labelID,
            notched: this.notchedOutlineNotched,
            notchWidth: this.notchedOutlineWidth
          }
        }
      );
    },

    genRipple(c) {
      if (this.outlined) return;

      return c(
        'span',
        {
          staticClass: 'mdc-select__ripple'
        }
      );
    },

    genFloatingLabel(c) {
      return c(
        'mdc-floating-label',
        {
          ref: 'floatingLabel',
          props: {
            id: this.labelID,
            content: this.label,
            float: this.floatingLabelFloat
          }
        }
      );
    },

    genSelectedTextContainer(c) {
      return c(
        'span',
        {
          staticClass: 'mdc-select__selected-text-container'
        },
        [
          c(
            'span',
            {
              staticClass: 'mdc-select__selected-text',
              attrs: {
                id: this.selectedTextID
              }
            },
            this.selectedText
          )
        ]
      );
    },

    genDropdownIcon(c) {
      return c(
        'span',
        {
          staticClass: 'mdc-select__dropdown-icon'
        },
        [
          this.genDropdownIconGraphic(c)
        ]
      )
    },

    genDropdownIconGraphic(c) {
      return c(
        'svg',
        {
          staticClass: 'mdc-select__dropdown-icon-graphic',
          attrs: {
            viewBox: '7 10 10 5',
            focusable: 'false'
          }
        },
        [
          c(
            'polygon',
            {
              staticClass: 'mdc-select__dropdown-icon-inactive',
              attrs: {
                stroke: 'none',
                'fill-rule': 'evenodd',
                points: '7 10 12 15 17 10'
              }
            }
          ),
          c(
            'polygon',
            {
              staticClass: 'mdc-select__dropdown-icon-active',
              attrs: {
                stroke: 'none',
                'fill-rule': 'evenodd',
                points: '7 15 12 10 17 15'
              }
            }
          )
        ]
      );
    },

    genLineRipple(c) {
      return c(
        'mdc-line-ripple',
        {
          props: {
            active: this.lineRippleActive
          }
        }
      );
    },

    genMenu(c) {
      return c(
        'mdc-menu',
        {
          ref: 'menu',
          staticClass: 'mdc-select__menu',
          props: {
            anchorElement: this.menuAnchorElement,
            anchorCorner: this.menuAnchorCorner,
            fullWidth: true,
            hasTypeahead: this.hasTypeahead,
            selectedIndex: this.selectedIndex,
            wrapFocus: this.menuWrapFocus,
            value: this.menuOpen
          },
          on: {
            input: value => {
              this.menuOpen = value;
            },
            select: this.onMenuSelected
          },
          nativeOn: {
            'MDCMenuSurface:opened': this.onMDCMenuSurfaceOpened,
            'MDCMenuSurface:closed': this.onMDCMenuSurfaceClosed
          }
        },
        [
          c(
            'mdc-menu-selection-group',
            {
              props: {
                icon: ''
              }
            },
            this.genMenuItems(c)
          )
        ]
      );
    },

    genMenuItems(c) {
      return this.items.map(item => {
        return c(
          'mdc-menu-item',
          {
            ref: 'menuItems',
            refInFor: true,
            props: {
              rippleDisabled: this.rippleDisabled,
              value: item.value
            }
          },
          item.text
        );
      });
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
