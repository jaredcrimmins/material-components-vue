import {Corner, DefaultFocusState, MDCMenuFoundation} from "@material/menu";
import {MDCList} from "../mdc-list";
import {MDCListActionEvent} from '@material/list';
import {MDCMenuSurface} from "../mdc-menu-surface";
import {PropType, VNode} from 'vue';
import {absolutelyPositionable} from "../../mixins";
import {closest} from "@material/dom/ponyfill";
import {emitCustomEvent, mixins} from '@/utils';

const {cssClasses} = MDCMenuFoundation;
const strings = {...MDCMenuFoundation.strings, ...{
  MENU_SELECTION_GROUP_SELECTOR: `.${cssClasses.MENU_SELECTION_GROUP}`
}};
const baseMixins = mixins(
  absolutelyPositionable
);

type ListRef = InstanceType<typeof MDCList>;
type MenuSurfaceRef = InstanceType<typeof MDCMenuSurface>;

/* @vue/component */
export default baseMixins.extend({
  name: "mdc-menu",

  mixins: [absolutelyPositionable],

  components: {
    "mdc-list": MDCList,
    "mdc-menu-surface": MDCMenuSurface
  },

  props: {
    anchorCorner: {
      type: <PropType<Corner>>Number,
      default: Corner.TOP_LEFT
    },
    anchorElement: {
      type: <PropType<Element | HTMLElement |string | null>>[String, Element],
      validator: value => {
        return ["string", "object"].includes(typeof value);
      },
      default: null
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

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c): VNode {
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
          input: (value: boolean) => {
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
          "keydown": (event: KeyboardEvent) => {
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
              "MDCList:action": (event: MDCListActionEvent) => {
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
      return (<ListRef>this.$refs.list).getListItemElements();
    },

    setDefaultFocusState(focusState: DefaultFocusState) {
      this.mdcFoundation.setDefaultFocusState(focusState);
    },

    onMDCMenuSurfaceClosed() {
      this.$emit("MDCMenuSurface:closed");
    },

    onMDCMenuSurfaceOpened() {
      this.mdcFoundation.handleMenuSurfaceOpened();
      this.$emit("MDCMenuSurface:opened");
    },

    onMDCListAction(event: MDCListActionEvent) {
      const itemElement = this.getMenuItemElements()[event.detail.index];

      this.mdcFoundation.handleItemAction(itemElement);
    },

    onKeydown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeydown(event);
    },

    //
    // Public methods
    //

    isTypeaheadInProgress() {
      return (<ListRef>this.$refs.list).isTypeaheadInProgress();
    },

    setEnabled(index: number, isEnabled: boolean) {
      this.mdcFoundation.setEnabled(index, isEnabled);
    },

    getSelectedIndex() {
      const selectedItemEl = this.$el.querySelector<Element>(`.${cssClasses.MENU_SELECTED_LIST_ITEM}`);

      return this.getMenuItemElements().indexOf(selectedItemEl!);
    },

    setSelectedIndex(index: number) {
      this.mdcFoundation.setSelectedIndex(index);
    },

    typeaheadMatchItem(nextChar: string) {
      return (<ListRef>this.$refs.list).typeaheadMatchItem(nextChar);
    },

    //
    // Adapter methods
    //

    addClassToElementAtIndex(index: number, className: string) {
      this.getMenuItemElements()[index].classList.add(className);
    },

    removeClassFromElementAtIndex(index: number, className: string) {
      this.getMenuItemElements()[index].classList.remove(className);
    },

    addAttributeToElementAtIndex(index: number, attr: string, value: string) {
      this.getMenuItemElements()[index].setAttribute(attr, value);
    },

    removeAttributeFromElementAtIndex(index: number, attr: string) {
      this.getMenuItemElements()[index].removeAttribute(attr);
    },

    elementContainsClass(element: HTMLElement, className: string) {
      return element.classList.contains(className);
    },

    closeSurface(skipRestoreFocus: boolean) {
      const menuSurface = <MenuSurfaceRef>this.$refs.menuSurface;

      menuSurface.mdcFoundation.close();

      if(!skipRestoreFocus) {
        menuSurface.restoreFocus();
      }
    },

    getElementIndex(element: Element) {
      return this.getMenuItemElements().indexOf(element);
    },

    notifySelected(event: {index: number}) {
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

    focusItemAtIndex(index: number) {
      (<HTMLElement>this.getMenuItemElements()[index]).focus();
    },

    focusListRoot() {
      const list = <ListRef>this.$refs.list;
      const listEl = <HTMLElement>list.$el;

      listEl.focus();
    },

    getSelectedSiblingOfItemAtIndex(index: number) {
      const menuItems = this.getMenuItemElements();
      const selectionGroupEl = closest(menuItems[index], strings.MENU_SELECTION_GROUP_SELECTOR);

      if (!selectionGroupEl) return -1;

      const selectedItemEl = selectionGroupEl.querySelector(`.${cssClasses.MENU_SELECTED_LIST_ITEM}`);

      return selectedItemEl ? menuItems.indexOf(selectedItemEl) : -1;
    },

    isSelectableItemAtIndex(index: number) {
      return !!closest(this.getMenuItemElements()[index], strings.MENU_SELECTION_GROUP_SELECTOR);
    }
  }
});
