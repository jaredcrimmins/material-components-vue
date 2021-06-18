import {MDCMenuFoundation} from "@material/menu";
import {MDCList, MDCMenuSurface} from "./../";
import {absolutelyPositionable} from "../../mixins";
import {closest} from "@material/dom/ponyfill";
import {emitCustomEvent} from '../../utils';

const {cssClasses, strings} = MDCMenuFoundation;

Object.assign(strings, {
  MENU_SELECTION_GROUP_SELECTOR: `.${cssClasses.MENU_SELECTION_GROUP}`
});

export default {
  name: "mdc-menu",

  mixins: [absolutelyPositionable],

  components: {
    "mdc-list": MDCList,
    "mdc-menu-surface": MDCMenuSurface
  },

  props: {
    anchorCorner: Number,
    anchorElement: {
      validator: value => {
        return ["string", "object"].includes(typeof value);
      }
    },
    defaultFocusState: {
      type: Number,
      default: 1
    },
    fixedPosition: Boolean,
    fullWidth: Boolean,
    hasTypeahead: Boolean,
    hoisted: Boolean,
    quickOpen: Boolean,
    twoLine: Boolean,
    value: {
      default: false,
      type: Boolean
    },
    wrapFocus: Boolean
  },

  data() {
    return {
      mdcFoundation: new MDCMenuFoundation(MDCMenuFoundation.defaultAdapter),
      open: this.value
    };
  },

  provide() {
    return {
      menu: true
    };
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c) {
    return c(
      "mdc-menu-surface",
      {
        ref: "menuSurface",
        staticClass: "mdc-menu",
        props: {
          absolutePosition: this.absolutePosition,
          anchorCorner: this.anchorCorner,
          anchorElement: this.anchorElement,
          fixedPosition: this.fixedPosition,
          fullWidth: this.fullWidth,
          hoisted: this.hoisted,
          quickOpen: this.quickOpen,
          value: this.open
        },
        on: {
          input: value => {
            this.open = value;
          }
        },
        nativeOn: {
          "MDCMenuSurface:opened": () => {
            this.onMDCMenuSurfaceOpened();
          },
          "MDCMenuSurface:closed": () => {
            this.onMDCMenuSurfaceClosed();
          },
          "keydown": event => {
            this.onKeydown(event);
          }
        }
      },
      [
        c(
          "mdc-list",
          {
            ref: "list",
            attrs: {
              role: "menu",
              tabindex: "-1",
              "aria-hidden": "true",
              "aria-orientation": "vertical"
            },
            props: {
              hasTypeahead: this.hasTypeahead,
              twoLine: this.twoLine,
              wrapFocus: this.wrapFocus
            },
            nativeOn: {
              "MDCList:action": event => {
                this.onMDCListAction(event);
              }
            }
          },
          this.$slots.default
        )
      ]
    );
  },

  watch: {
    defaultFocusState(value) {
      this.setDefaultFocusState(value);
    },

    open(value) {
      if (value !== this.value) {
        this.$emit("input", value);
      }
    },

    value(value) {
      this.open = value;
    }
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCMenuFoundation(this);
      this.mdcFoundation.init();
      this.setDefaultFocusState(this.defaultFocusState);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    getMenuItemElements() {
      return this.$refs.list.getListItemElements();
    },

    setDefaultFocusState(focusState) {
      this.mdcFoundation.setDefaultFocusState(focusState);
    },

    onMDCMenuSurfaceClosed() {
      this.$emit("MDCMenuSurface:closed");
    },

    onMDCMenuSurfaceOpened() {
      this.mdcFoundation.handleMenuSurfaceOpened();
      this.$emit("MDCMenuSurface:opened");
    },

    onMDCListAction(event) {
      const itemElement = this.getMenuItemElements()[event.detail.index];

      this.mdcFoundation.handleItemAction(itemElement);
    },

    onKeydown(event) {
      this.mdcFoundation.handleKeydown(event);
    },

    //
    // Public methods
    //

    isTypeaheadInProgress() {
      return this.$refs.list.isTypeaheadInProgress();
    },

    setEnabled(index, isEnabled) {
      this.mdcFoundation.setEnabled(index, isEnabled);
    },

    getSelectedIndex() {
      const selectedItemEl = this.$el.querySelector(`.${cssClasses.MENU_SELECTED_LIST_ITEM}`);

      return this.getMenuItemElements().indexOf(selectedItemEl);
    },

    setSelectedIndex(index) {
      this.mdcFoundation.setSelectedIndex(index);
    },

    typeaheadMatchItem(nextChar) {
      return this.$refs.list.typeaheadMatchItem(nextChar);
    },

    //
    // Adapter methods
    //

    addClassToElementAtIndex(index, className) {
      this.getMenuItemElements()[index].classList.add(className);
    },

    removeClassFromElementAtIndex(index, className) {
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
      this.$refs.menuSurface.mdcFoundation.close();

      if(!skipRestoreFocus) {
        this.$refs.menuSurface.restoreFocus();
      }
    },

    getElementIndex(element) {
      return this.getMenuItemElements().indexOf(element);
    },

    notifySelected(event) {
      emitCustomEvent(this.$el, strings.SELECTED_EVENT, {
        index: event.index,
        item: this.getMenuItemElements()[event.index]
      });
      this.$emit("select", {
        index: event.index
      });
    },

    getMenuItemCount() {
      return this.getMenuItemElements().length;
    },

    focusItemAtIndex(index) {
      this.getMenuItemElements()[index].focus();
    },

    focusListRoot() {
      this.$refs.list.$el.focus();
    },

    getSelectedSiblingOfItemAtIndex(index) {
      const menuItems = this.getMenuItemElements();
      const selectionGroupEl = closest(menuItems[index], strings.MENU_SELECTION_GROUP_SELECTOR);
      const selectedItemEl = selectionGroupEl.querySelector(`.${cssClasses.MENU_SELECTED_LIST_ITEM}`);
      
      return selectedItemEl ? menuItems.indexOf(selectedItemEl) : -1;
    },

    isSelectableItemAtIndex(index) {
      return !!closest(this.getMenuItemElements()[index], strings.MENU_SELECTION_GROUP_SELECTOR);
    }
  }
}