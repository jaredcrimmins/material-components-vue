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
    hasTypeahead: Boolean,
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
      mdcFoundation: new MDCListFoundation(MDCListFoundation.defaultAdapter),
      mounted: false
    };
  },

  computed: {
    isCheckboxList() {
      return this.mounted && this.hasCheckboxAtIndex(0);
    },

    isRadioList() {
      return this.mounted && this.hasRadioAtIndex(0);
    },

    roleAttr() {
      if (this.isCheckboxList) return "group";
      else if (this.isRadioList) return "radiogroup";
      else if (this.singleSelection) return "listbox";
    }
  },

  provide() {
    return {
      twoLine: this.twoLine
    };
  },

  mounted() {
    this.mounted = true;
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
        attrs: {
          role: this.roleAttr
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
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCListFoundation(this);
      this.mdcFoundation.init();
      this.mdcFoundation.setHasTypeahead(this.hasTypeahead);
      this.mdcFoundation.setSingleSelection(this.singleSelection);
      this.mdcFoundation.setSelectedIndex(this.selectedIndex);
      this.mdcFoundation.setVerticalOrientation(this.vertical);
      this.mdcFoundation.setWrapFocus(this.wrapFocus);

      this.mdcFoundation.layout();

      this.initTabindex();
      this.domObserver = new MutationObserver(this.getListItemElements);
      this.domObserver.observe(this.$el, {childList: true});
    },

    deinit() {
      this.mdcFoundation.destroy();
      this.domObserver.disconnect();
    },

    initTabindex() {
      this.setAttributeForElementIndex(0, "tabindex", "0");
    },

    /*
    * Used to figure out which list item this event is targetting. Or returns -1 if
    * there is no list item
    */
    getListItemIndex(event) {
      const {target} = event;
      const nearestParent = closest(
        target,
        `.${cssClasses.LIST_ITEM_CLASS}, .${cssClasses.ROOT}`);

      if(nearestParent && matches(nearestParent , `.${cssClasses.LIST_ITEM_CLASS}`)) {
        return this.getListItemElements().indexOf(nearestParent);
      }

      return -1;
    },

    onClick(event) {
      const index = this.getListItemIndex(event);
      const {target} = event;
      // Toggle the checkbox only if it's not the target of the event, or the
      // checkbox will have 2 change events.
      const toggleCheckbox = !matches(target, strings.CHECKBOX_RADIO_SELECTOR);

      this.mdcFoundation.handleClick(index, toggleCheckbox);
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
    // Both private and adapter methods
    //

    hasRadioAtIndex(index) {
      const listItemEl = this.getListItemElements()[index];

      return !!listItemEl.querySelector(strings.RADIO_SELECTOR);
    },

    hasCheckboxAtIndex(index) {
      const listItemEl = this.getListItemElements()[index];

      return !!listItemEl.querySelector(strings.CHECKBOX_SELECTOR);
    },

    //
    // Public methods
    //

    getListItemElements() {
      return Array.from(this.$el.querySelectorAll(strings.LIST_ITEM_SELECTOR));
    },

    isTypeaheadInProgress() {
      return this.mdcFoundation.isTypeaheadInProgress();
    },

    typeaheadMatchItem(nextChar) {
      return this.mdcFoundation.typeaheadMatchItem(nextChar);
    },

    //
    // Adapter methods
    //

    getListItemCount() {
      return this.getListItemElements().length;
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
      const element = this.getListItemElements()[listItemIndex];
      const listItemChildren = [].slice.call(element.querySelectorAll(
        strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX
      ));
      
      listItemChildren
      .forEach(el => {
        el.setAttribute("tabindex", tabIndexValue);
      });
    },

    isCheckboxCheckedAtIndex(index) {
      const listItemEl = this.getListItemElements()[index];
      const toggleEl = listItemEl.querySelector(strings.CHECKBOX_SELECTOR);

      return toggleEl.checked;
    },

    setCheckedCheckboxOrRadioAtIndex(index, isChecked) {
      const listItemEl = this.getListItemElements()[index];
      const toggleEl = listItemEl.querySelector(strings.CHECKBOX_RADIO_SELECTOR);

      toggleEl.checked = isChecked;

      const event = document.createEvent('Event');
      event.initEvent('change', true, true);
      toggleEl.dispatchEvent(event);
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
      const element = this.getListItemElements()[index];

      if(element) return element.classList.contains(className);
      return false;
    },

    getPrimaryTextAtIndex(index) {
      const listItemElement = this.getListItemElements()[index];
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