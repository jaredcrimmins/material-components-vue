import {ExtractVue, emitCustomEvent, mixins} from '../../utils';
import {ChipListType, cssClasses as chipSetCssClasses} from './mdc-chip-set';
import {MDCChipFoundation} from '@material/chips';
import MDCChipTrailingAction from './mdc-chip-trailing-action';
import {MDCMaterialIcon} from '../mdc-material-icon';
import {MDCRipple} from '../mdc-ripple';
import {CreateElement, VNode, VueConstructor} from 'vue';
import * as constants from '@material/chips/chip/constants';
import {touchTargetWrappable} from '@/mixins';
import {ponyfill} from '@material/dom';

const cssClasses = {
  ...constants.cssClasses,
  ...{
    ROOT: 'mdc-chip',
    ICON: 'mdc-chip__icon',
    CHECKMARK_PATH: 'mdc-chip__checkmark-path',
    TOUCH: 'mdc-chip--touch',
    PRIMARY_ACTION_TOUCH: 'mdc-chip__touch'
  }
};

const baseMixins = mixins(touchTargetWrappable);

let mdcChipId_ = 0;

type Attrs = {[attributeName: string]: string};
type CssClasses = {[className: string]: boolean};

type CheckboxElRef = SVGElement;
type PrimaryActionElRef = HTMLElement;
type TrailingActionRef = InstanceType<typeof MDCChipTrailingAction>;

interface Injections {
  chipList: ChipListType;
  choice: Boolean;
  filter: Boolean;
  input: Boolean;
}

export default (<VueConstructor<ExtractVue<typeof baseMixins> & Injections>>baseMixins).extend({
  name: 'mdc-chip',

  components: {
    'mdc-chip-trailing-action': MDCChipTrailingAction,
    'mdc-material-icon': MDCMaterialIcon,
    'mdc-ripple': MDCRipple
  },

  inject: {
    chipList: {
      default: [],
      from: 'mdcChipSetChipList__'
    },
    choice: {
      default: false,
      from: 'mdcChipSetChoice__'
    },
    filter: {
      default: false,
      from: 'mdcChipSetFilter__'
    },
    input: {
      default: false,
      from: 'mdcChipSetInput__'
    }
  },

  props: {
    id: {
      type: String,
      default: () => `__mdc-chip${mdcChipId_}`
    },
    rippleDisabled: Boolean,
    leadingIcon: {
      type: String,
      default: null
    },
    hiddenLeadingIcon: Boolean,
    trailingAction: Boolean,
    trailingActionNavigable: Boolean
  },

  data() {
    return {
      attrs: {
        id: this.id,
        role: 'row'
      } as Attrs,
      cssClasses: {
        [cssClasses.TOUCH]: this.hasTouchTargetWrapperParent
      } as CssClasses,
      index: null as number | null,
      trailingActionAttrs: {} as Attrs,
      style: {} as {[propertyName: string]: string},
      leadingIconCssClasses: {
        [cssClasses.HIDDEN_LEADING_ICON]: this.hiddenLeadingIcon
      } as CssClasses,
      mdcFoundation: new MDCChipFoundation(
        MDCChipFoundation.defaultAdapter
      ),
      primaryActionAttrs: {
        tabindex: '0'
      } as Attrs
    };
  },

  computed: {
    primaryActionRoleAttr(): string {
      return this.filter ? 'checkbox' : 'button';
    }
  },

  render(c: CreateElement): VNode {
    return c(
      'mdc-ripple',
      {
        props: {
          disabled: this.rippleDisabled,
          standalone: false,
          unbounded: false
        },
        scopedSlots: {
          root: ({cssClass, on, style}) => {
            return c(
              'div',
              {
                staticClass: cssClasses.ROOT,
                class: {...cssClass, ...this.cssClasses},
                attrs: this.attrs,
                style,
                on: {
                  ...on,
                  ...{
                    click: this.onClick,
                    dblclick: this.onDoubleClick,
                    focusin: this.onFocusin,
                    focusout: this.onFocusout,
                    handleKeydown: this.onKeydown,
                    transitionend: this.onTransitionend
                  }
                }
              },
              [
                c(
                  'div',
                  {
                    staticClass: 'mdc-chip__ripple',
                  }
                ),
                this.genLeadingIcon(c),
                this.genCheckmark(c),
                c(
                  'span',
                  {
                    attrs: {
                      role: 'gridcell'
                    }
                  },
                  [
                    this.genPrimaryAction(c)
                  ]
                ),
                this.genTrailingIcon(c),
                this.genTrailingAction(c)
              ]
            );
          }
        }
      }
    );
  },

  created() {
    mdcChipId_++;
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.registerChip();
      this.mdcFoundation = new MDCChipFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
      this.deregisterSegment();
    },

    registerChip() {
      const instance = this;
      const focus = () => (<HTMLElement>instance.$el).focus();
      const focusPrimaryAction = () => instance.focusPrimaryAction();
      const focusTrailingAction = () => instance.focusTrailingAction();
      const isSelected = () => instance.mdcFoundation.isSelected();
      const refreshIndex = () => instance.refreshIndex();
      const removeFocus = () => instance.mdcFoundation.removeFocus();
      const select = (selected: boolean) => instance.mdcFoundation.setSelected(selected);

      const index = this.getIndex();

      this.index = index;
      this.chipList.splice(index, 0, {
        id: this.id,
        focus,
        focusPrimaryAction,
        focusTrailingAction,
        isSelected,
        refreshIndex,
        removeFocus,
        select
      });
    },

    deregisterSegment() {
      this.chipList.splice(this.index as number, 1);
    },

    refreshIndex() {
      this.index = this.getIndex();
    },

    getIndex() {
      const chipSetParentEl = ponyfill.closest(
        this.$el,
        `.${chipSetCssClasses.ROOT}`
      );

      if (!chipSetParentEl) return -1;

      const chipEls = Array.from(
        chipSetParentEl!.querySelectorAll(`.${cssClasses.ROOT}`)
      );

      return chipEls.indexOf(this.$el);
    },

    genLeadingIcon(c: CreateElement) {
      if (!this.leadingIcon) return;

      return c(
        'mdc-material-icon',
        {
          staticClass: `${cssClasses.ICON} ${cssClasses.LEADING_ICON}`,
          class: this.leadingIconCssClasses
        },
        this.leadingIcon
      );
    },

    genTrailingIcon(c: CreateElement) {
      if (!this.input || this.trailingAction) return;

      return c(
        'span',
        {
          attrs: {
            role: 'gridcell'
          }
        },
        [
          c(
            'mdc-material-icon',
            {
              staticClass: `${cssClasses.ICON} ${cssClasses.TRAILING_ICON}`,
              attrs: {
                tabindex: '-1',
                role: 'button'
              }
            },
            'cancel'
          )
        ]
      );
    },

    genTrailingAction(c: CreateElement) {
      if (!this.input || !this.trailingAction) return;

      return c(
        'mdc-chip-trailing-action',
        {
          ref: 'trailingAction',
          props: {
            rippleDisabled: this.rippleDisabled,
            navigable: this.trailingActionNavigable
          }
        }
      );
    },

    genCheckmark(c: CreateElement) {
      if (!this.filter) return;

      return c(
        'span',
        {
          staticClass: cssClasses.CHECKMARK
        },
        [
          c(
            'svg',
            {
              ref: 'checkmarkEl',
              staticClass: 'mdc-chip__checkmark-svg',
              attrs: {
                viewBox: '-2 -3 30 30'
              }
            },
            [
              c(
                'path',
                {
                  staticClass: cssClasses.CHECKMARK_PATH,
                  attrs: {
                    fill: 'none',
                    stroke: 'black',
                    d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
                  }
                }
              )
            ]
          )
        ]
      );
    },

    genPrimaryAction(c: CreateElement) {
      const children = [] as VNode[];

      if (this.hasTouchTargetWrapperParent)
        children.push(
          c(
            'div',
            {
              staticClass: cssClasses.PRIMARY_ACTION_TOUCH
            }
          )
        );

      children.push(
        c(
          'span',
          {
            staticClass: cssClasses.TEXT
          },
          this.$slots.default
        )
      );

      return c(
        'span',
        {
          ref: 'primaryActionEl',
          staticClass: cssClasses.PRIMARY_ACTION,
          attrs: {
            ...this.primaryActionAttrs,
            role: this.primaryActionRoleAttr
          }
        },
        children
      );
    },

    onClick() {
      this.mdcFoundation.handleClick();
    },

    onDoubleClick() {
      this.mdcFoundation.handleDoubleClick();
    },

    onFocusin(event: FocusEvent) {
      this.mdcFoundation.handleFocusIn(event);
    },

    onFocusout(event: FocusEvent) {
      this.mdcFoundation.handleFocusOut(event);
    },

    onKeydown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeydown(event);
    },

    onTransitionend(event: TransitionEvent) {
      this.mdcFoundation.handleTransitionEnd(event);
    },

    //
    // Private/adapter methods
    //

    focusPrimaryAction() {
      (<PrimaryActionElRef>this.$refs.primaryActionEl).focus();
    },

    focusTrailingAction() {
      (<TrailingActionRef>this.$refs.trailingAction).focus();
    },

    //
    // Adapter methods
    //

    getAttribute(attr: string) {
      return this.$el.getAttribute(attr);
    },

    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    addClassToLeadingIcon(className: string) {
      this.leadingIconCssClasses = {
        ...this.leadingIconCssClasses,
        [className]: true
      };
    },

    removeClassFromLeadingIcon(className: string) {
      this.leadingIconCssClasses = {
        ...this.leadingIconCssClasses,
        [className]: false
      };
    },

    eventTargetHasClass(target: EventTarget, className: string) {
      return (<Element>target).classList.contains(className);
    },

    isRTL() {
      return window.getComputedStyle(this.$el)
        .getPropertyValue('direction') === 'rtl';
    },

    notifyInteraction() {
      emitCustomEvent(
        this.$el,
        constants.strings.INTERACTION_EVENT,
        {chipId: this.id},
        true
      );
    },

    notifySelection(selected: boolean, shouldIgnore: boolean) {
      emitCustomEvent(
        this.$el,
        constants.strings.SELECTION_EVENT,
        {chipId: this.id, selected, shouldIgnore},
        true
      );
    },

    notifyTrailingIconInteraction() {
      emitCustomEvent(
        this.$el,
        constants.strings.TRAILING_ICON_INTERACTION_EVENT,
        {chipId: this.id},
        true
      );
    },

    notifyRemoval(removedAnnouncement: string | null) {
      emitCustomEvent(
        this.$el,
        constants.strings.REMOVAL_EVENT,
        {
          chipId: this.id,
          removedAnnouncement
        },
        true
      );
    },

    notifyNavigation(key: string, source: constants.EventSource) {
      emitCustomEvent(
        this.$el,
        constants.strings.NAVIGATION_EVENT,
        {
          chipId: this.id,
          key,
          source
        },
        true
      );
    },

    getComputedStyleValue(propertyName: string) {
      return window.getComputedStyle(this.$el).getPropertyValue(propertyName)
    },

    setStyleProperty(propertyName: string, value: string) {
      this.style = {...this.style, [propertyName]: value};
    },

    hasLeadingIcon() {
      return !!this.leadingIcon;
    },

    getRootBoundingClientRect() {
      return this.$el.getBoundingClientRect();
    },

    getCheckmarkBoundingClientRect() {
      return (<CheckboxElRef>this.$refs.checkboxEl).getBoundingClientRect();
    },

    setPrimaryActionAttr(attr: string, value: string) {
      this.primaryActionAttrs = {...this.primaryActionAttrs, [attr]: value};
    },

    // The MDCTrailingAction component has yet to be completed, so these
    // adapter methods do nothing.

    hasTrailingAction() {
      return this.trailingAction;
    },

    removeTrailingActionFocus() {
      if (this.trailingAction)
        (<TrailingActionRef>this.$refs.trailingAction).removeFocus();
    },

    setTrailingActionAttr(attr: string, value: string) {
      this.trailingActionAttrs = {
        ...this.trailingActionAttrs,
        ...{[attr]: value}
      };
    },

    notifyEditStart() {
      /* Not implemented. */
    },

    notifyEditFinish() {
      /* Not implemented. */
    }
  }
});
