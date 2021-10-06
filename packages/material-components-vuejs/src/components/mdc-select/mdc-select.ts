import {MDCFloatingLabel} from "./../mdc-floating-label";
import {MDCMenu, MDCMenuItem} from "./../mdc-menu";
import {MDCSelectFoundation, cssClasses, strings} from "@material/select";
import {MDCLineRipple} from "./../mdc-line-ripple";
import {MDCNotchedOutline} from "./../mdc-notched-outline";
import Vue, {CreateElement, PropType, VNode} from 'vue';
import {emitCustomEvent} from "./../../utils";
import {estimateScrollWidth} from "@material/dom/ponyfill";
import * as menuConstants from '@material/menu/constants';
import * as menuTypes from '@material/menu/types';
import * as menuSurfceConstants from '@material/menu-surface/constants';

let selectID_ = 0;

type MenuItem = {text: string, value: string};
type AnchorElRef = HTMLElement;
type MenuRef = InstanceType<typeof MDCMenu>;
type MenuItemsRef = InstanceType<typeof MDCMenuItem>[];

export default Vue.extend({
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
      type: <PropType<MenuItem[]>>Array,
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
      menuAnchorCorner: <menuSurfceConstants.Corner | null>null,
      menuAnchorElement: <Element | string>"mdc-select__anchor",
      menuOpen: false,
      menuWrapFocus: false,
      notchedOutlineNotched: false,
      notchedOutlineWidth: 0,
      selectedText: "",
      selectedTextID: ''
    };
  },

  computed: {
    ariaLabelledBy(): string {
      return `${this.labelID} ${this.selectedTextID}`;
    }
  },

  created() {
    selectID_++;
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

  render(c): VNode {
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

    genAnchor(c: CreateElement) {
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

    genNotchedOutline(c: CreateElement) {
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

    genRipple(c: CreateElement) {
      if (this.outlined) return;

      return c(
        'span',
        {
          staticClass: 'mdc-select__ripple'
        }
      );
    },

    genFloatingLabel(c: CreateElement) {
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

    genSelectedTextContainer(c: CreateElement) {
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

    genDropdownIcon(c: CreateElement) {
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

    genDropdownIconGraphic(c: CreateElement) {
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

    genLineRipple(c: CreateElement) {
      return c(
        'mdc-line-ripple',
        {
          props: {
            active: this.lineRippleActive
          }
        }
      );
    },

    genMenu(c: CreateElement) {
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
            input: (value: boolean) => {
              this.menuOpen = value;
            }
          },
          nativeOn: {
            [menuConstants.strings.SELECTED_EVENT]: this.onMenuSelected,
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

    genMenuItems(c: CreateElement) {
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

    setDisabled_(isDisabled: boolean) {
      this.mdcFoundation.setDisabled(isDisabled);
    },

    setRequired(value: boolean) {
      this.mdcFoundation.setRequired(value);
    },

    setValue(value: string) {
      value && this.mdcFoundation.setValue(value);
    },

    getNormalizedXCoordinate(event: MouseEvent | TouchEvent) {
      const targetClientRect = (<Element>event.target).getBoundingClientRect();
      const xCoordinate = this.isTouchEvent(event) ? event.touches[0].clientX : event.clientX;

      return xCoordinate - targetClientRect.left;
    },

    isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
      return Boolean((<TouchEvent>event).touches);
    },

    refreshIndex() {
      const menuItemValues = this.getMenuItemValues();

      this.setSelectedIndex(menuItemValues.indexOf(this.value));
    },

    onBlur() {
      this.mdcFoundation.handleBlur();
    },

    onClick(event: MouseEvent | TouchEvent) {
      this.mdcFoundation.handleClick(this.getNormalizedXCoordinate(event));
    },

    onFocus() {
      this.mdcFoundation.handleFocus();
    },

    onKeydown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeydown(event);
    },

    onMenuSelected(event: menuTypes.MDCMenuItemComponentEvent) {
      this.mdcFoundation.handleMenuItemAction(event.detail.index);
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
      return (<MenuItemsRef>this.$refs.menuItems)
      .map(listItem => {
        return listItem.$el.getAttribute("data-value") || "";
      });
    },

    setSelectedIndex(index: number) {
      (<MenuRef>this.$refs.menu).setSelectedIndex(index);
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.$el.classList.add(className);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    activateBottomLine() {
      this.lineRippleActive = true;
    },

    deactivateBottomLine() {
      this.lineRippleActive = false;
    },

    getSelectedMenuItem() {
      return (<MenuRef>this.$refs.menu).$el.querySelector(".mdc-deprecated-list-item--selected");
    },

    hasLabel() {
      return this.label ? true : false;
    },

    floatLabel(value: boolean) {
      this.floatingLabelFloat = value;
    },

    getLabelWidth() {
      const floatingLabelEl = this.$el.querySelector('.mdc-floating-label');

      if (!floatingLabelEl) return 0;

      return estimateScrollWidth(floatingLabelEl);
    },

    hasOutline() {
      return this.outlined ? true : false;
    },

    notchOutline(labelWidth: number) {
      this.notchedOutlineNotched = true;
      this.notchedOutlineWidth = labelWidth;
    },

    closeOutline() {
      this.notchedOutlineNotched = false;
    },

    setDisabled(isDisabled: boolean) {
      this.isDisabled = isDisabled;
    },

    setRippleCenter(normalizedX: number) {
      this.lineRippleCenter = normalizedX;
    },

    notifyChange(value: string) {
      emitCustomEvent(this.$el, strings.CHANGE_EVENT, {value}, true);
      this.$emit("change", value);
    },

    setSelectedText(text: string) {
      this.selectedText = text;
    },

    isSelectAnchorFocused() {
      return document.activeElement === this.$refs.anchorEl;
    },

    getSelectAnchorAttr(attr: string) {
      return (<AnchorElRef>this.$refs.anchorEl).getAttribute(attr);
    },

    setSelectAnchorAttr(attr: string, value: string) {
      (<AnchorElRef>this.$refs.anchorEl).setAttribute(attr, value);
    },

    removeSelectAnchorAttr(attr: string) {
      (<AnchorElRef>this.$refs.anchorEl).removeAttribute(attr);
    },

    openMenu() {
      this.menuOpen = true;
    },

    closeMenu() {
      this.menuOpen = false;
    },

    getAnchorElement() {
      return <AnchorElRef>this.$refs.anchorEl;
    },

    setMenuAnchorElement(anchorEl: HTMLElement) {
      this.menuAnchorElement = anchorEl;
    },

    setMenuAnchorCorner(anchorCorner: menuSurfceConstants.Corner) {
      this.menuAnchorCorner = anchorCorner;
    },

    setMenuWrapFocus(wrapFocus: boolean) {
      this.menuWrapFocus = wrapFocus;
    },

    setAttributeAtIndex(index: number, attributeName: string, attributeValue: string) {
      (<MenuItemsRef>this.$refs.menuItems)[index].$el.setAttribute(attributeName, attributeValue);
    },

    focusMenuItemAtIndex(index: number) {
      (<MenuRef>this.$refs.menu).focusItemAtIndex(index);
    },

    getMenuItemCount() {
      return this.items.length;
    },

    getMenuItemAttr(menuItem: Element, attr: string) {
      return menuItem.getAttribute(attr);
    },

    getMenuItemTextAtIndex(index: number) {
      const item = this.items[index];

      return item.text;
    },

    addClassAtIndex(index: number, className: string) {
      (<MenuItemsRef>this.$refs.menuItems)[index].$el.classList.add(className);
    },

    removeClassAtIndex(index: number, className: string) {
      (<MenuItemsRef>this.$refs.menuItems)[index].$el.classList.remove(className);
    },

    getSelectedIndex() {
      return (<MenuRef>this.$refs.menu).getSelectedIndex();
    },

    isTypeaheadInProgress() {
      return (<MenuRef>this.$refs.menu).isTypeaheadInProgress();
    },

    typeaheadMatchItem(nextChar: string) {
      return (<MenuRef>this.$refs.menu).typeaheadMatchItem(nextChar);
    }
  }
});
