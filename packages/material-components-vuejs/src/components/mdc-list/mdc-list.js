import {MDCListFoundation} from "@material/list";
import {closest, matches} from "@material/dom/ponyfill";
import {emitCustomEvent} from "./../../utils";

const {cssClasses, strings} = MDCListFoundation;

Object.assign(cssClasses, {
  LIST_TWO_LINE_CLASS: "mdc-list--two-line"
});
Object.assign(strings, {
  LIST_ITEM_SELECTOR: `.${cssClasses.LIST_ITEM_CLASS}`,
  LIST_ITEM_PRIMARY_TEXT_SELECTOR: `.${cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS}`
});

export default {
  name: "mdc-list",

  props: {
    checkboxItems: Boolean,
    hasTypeahead: Boolean,
    radioGroup: Boolean,
    selectedIndex: Number,
    singleSelection: Boolean,
    twoLine: Boolean,
    wrapFocus: Boolean,
    vertical: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      domObserver: null,
      itemElements: null,
      mdcFoundation: null
    };
  },

  computed: {
    roleAttr() {
      if(this.checkboxItems) return "group";
      else if(this.radioGroup) return "radiogroup";
      else if(this.singleSelection) return "listbox";
    }
  },

  mounted() {
    this.init();
  },

  beforeDestory() {
    this.deinit();
  },

  watch: {
    hasTypeahead(value) {
      this.mdcFoundation.setHasTypeahead(value);
    },

    selectedIndex(value) {
      this.mdcFoundation.setSelectedIndex(value);
    },

    singleSelection(value) {
      this.mdcFoundation.setSingleSelection(value);
    },

    twoLine(value) {
      this.mdcFoundation.setTwoLine(value);
    },

    vertical(value) {
      this.mdcFoundation.setVerticalOrientation(value);
    },

    wrapFocus(value) {
      this.mdcFoundation.setWrapFocus(value);
    }
  },

  render(c) {
    return c(
      "ul",
      {
        staticClass: cssClasses.ROOT,
        class: {
          [cssClasses.LIST_TWO_LINE_CLASS]: this.twoLine
        },
        on: {
          click: this.onClick,
          focusin: this.onFocusIn,
          focusOut: this.onFocusOut,
          keydown: this.onKeydown
        }
      },
      this.$slots.default
    );
  },

  methods: {
    init() {
      this.mdcFoundation = new MDCListFoundation(this);
      this.mdcFoundation.init();
      this.mdcFoundation.setHasTypeahead(this.hasTypeahead);
      this.mdcFoundation.setSingleSelection(this.singleSelection);
      this.mdcFoundation.setSelectedIndex(this.selectedIndex);
      Object.assign(cssClasses, {
        LIST_TWO_LINE_CLASS: "mdc-list--two-line"
      });
      Object.assign(strings, {
        LIST_ITEM_SELECTOR: `.${cssClasses.LIST_ITEM_CLASS}`,
        LIST_ITEM_PRIMARY_TEXT_SELECTOR: `.${cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS}`
      }); this.mdcFoundation.setVerticalOrientation(this.vertical);
      this.mdcFoundation.setWrapFocus(this.wrapFocus);

      this.initTabindex();
      this.domObserver = new MutationObserver(this.getListItemEls);
      this.domObserver.observe(this.$el, {childList: true});
    },

    deinit() {
      this.mdcFoundation.destroy();
      this.domObserver.disconnect();
    },

    getListItemEls() {
      return Array.from(this.$el.querySelectorAll(".mdc-list-item"));
    },

    getListItemEls() {
      return Array.from(this.$el.querySelectorAll(strings.LIST_ITEM_SELECTOR));
    },

    getListItemIndex(event) {
      const {target} = event;
      const nearestParent = closest(target, `.${cssClasses.LIST_ITEM_CLASS}, .${cssClasses.ROOT}`);

      if(nearestParent && matches(nearestParent , strings.LIST_ITEM_SELECTOR)) {
        return this.getListItemEls().indexOf(nearestParent);
      }

      return -1;
    },

    onClick(event) {
      let index = this.getListItemIndex(event);

      // TODO: Add checkbox support.
      this.mdcFoundation.handleClick(index, false);
    },

    onFocusIn(event) {
      const index = this.getListItemIndex(event);

      this.mdcFoundation.handleFocusIn(event, index);
    },

    onFocusOut(event) {
      const index = this.getListItemIndex(event);

      this.mdcFoundation.handleFocusOut(event, index);
    },

    onKeydown(event) {
      let index = this.getListItemIndex(event);
      let target = event.target;

      this.mdcFoundation.handleKeydown(
        event, target.classList.contains(cssClasses.LIST_ITEM_CLASS), index);
    },

    //
    // Public methods
    //

    getListItemElements() {
      return this.getListItemEls();
    },

    isTypeaheadInProgress() {
      return this.mdcFoundation.isTypeaheadInProgress();
    },

    typeaheadMatchItem(nextChar) {
      return this.mdcFoundation.typeaheadMatchItem(nextChar);
    },

    // Adapter methods
    getListItemCount() {
      return this.getListItemEls().length;
    },

    getFocusedElementIndex() {
      return this.getListItemEls().indexOf(document.activeElement);
    },

    setAttributeForElementIndex(index, attribute, value) {
      let element = this.getListItemEls()[index];

      if(element) {
        element.setAttribute(attribute, value);
      }
    },
    
    addClassForElementIndex(index, className) {
      let element = this.getListItemEls()[index];

      if(element) {
        element.classList.add(className);
      }
    },

    removeClassForElementIndex(index, className) {
      let element = this.getListItemEls()[index];

      if(element) {
        element.classList.remove(className);
      }
    },

    focusItemAtIndex(index) {
      let element = this.getListItemEls()[index];

      if(element) {
        element.focus();
      }
    },

    setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {
      const element = this.getListItemEls()[listItemIndex];
      const listItemChildren = [].slice.call(element.querySelectorAll(cssClasses.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
      
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
      emitCustomEvent(this.$el, strings.ACTION_EVENT, {index});
    },

    isFocusInsideList() {
      return this.$el !== document.activeElement && this.$el.contains(document.activeElement);
    },

    isRootFocused() {
      return document.activeElement === this.$el;
    },

    listItemAtIndexHasClass(index, className) {
      const element = this.getListItemEls()[index];

      if(element) return element.classList.contains(className);
      return false;
    },

    getPrimaryTextAtIndex(index) {
      const listItemElement = this.getListItemEls()[index];
      let primaryTextElement = null;

      if(listItemElement) {
        primaryTextElement = listItemElement.querySelector(strings.LIST_ITEM_PRIMARY_TEXT_SELECTOR);

        if(primaryTextElement) {
          return primaryTextElement.textContent || "";
        }
        else {
          const singleLineText =
            listItemElement.querySelector(`.${cssClasses.LIST_ITEM_TEXT_CLASS}`);
          
          if(singleLineText) {
            return singleLineText.textContent || "";
          }
        }
      }
    }
  }
}