import {
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation,
  cssClasses,
  strings
} from '@material/drawer';
import {MDCList, MDCListItem} from '../mdc-list';
import {CreateElement, VNode} from 'vue';
import {emitCustomEvent, mixins} from '@/utils';
import {focusTrappable} from '@/mixins';
import {cssClasses as listCssClasses} from '@material/list';

const baseMixins = mixins(focusTrappable);

export default baseMixins.extend({
  name: 'mdc-drawer',

  components: {
    'mdc-list': MDCList,
    'mdc-list-item': MDCListItem
  },

  props: {
    dismissible: Boolean,
    modal: Boolean,
    value: Boolean
  },

  data() {
    return {
      cssClass: {
        [cssClasses.DISMISSIBLE]: this.dismissible,
        [cssClasses.MODAL]: this.modal
      },
      mdcFoundation: new MDCDismissibleDrawerFoundation(
        MDCDismissibleDrawerFoundation.defaultAdapter
      ) as MDCDismissibleDrawerFoundation | MDCModalDrawerFoundation,
      previousFocusEl: null as Element | null
    };
  },

  watch: {
    value(value: boolean) {
      if (value) this.mdcFoundation.open();
      else this.mdcFoundation.close();
    },
  },

  render(c): VNode {
    return c(
      'aside',
      {
        staticClass: cssClasses.ROOT,
        class: this.cssClass,
        on: {
          'keydown': this.onKeydown,
          'transitionend': this.onTransitionend
        }
      },
      [
        this.genHeader(c),
        c(
          'div',
          {
            staticClass: 'mdc-drawer__content'
          },
          this.$slots.default
        )
      ]
    );
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
      if (this.dismissible && this.modal)
        throw new Error('Only the dismissible or modal prop may be true.');

      this.mdcFoundation = this.modal
        ? new MDCModalDrawerFoundation(this)
        : new MDCDismissibleDrawerFoundation(this);

      if (this.modal) {
        const scrimEl = document.querySelector('.mdc-drawer-scrim');

        if (!scrimEl) return;

        scrimEl.addEventListener('click', () => {
          (<MDCModalDrawerFoundation>this.mdcFoundation).handleScrimClick();
        });
      }
    },

    deinit() {
      const scrimEl = document.querySelector('.mdc-drawer-scrim');

      if (scrimEl)
        scrimEl.removeEventListener('click', () => {
          (<MDCModalDrawerFoundation>this.mdcFoundation).handleScrimClick();
        });

      this.mdcFoundation?.destroy();
    },

    genHeader(c: CreateElement) {
      const headerSlot = this.$slots.header;

      if (!headerSlot) return;

      return c(
        'div',
        {
          staticClass: 'mdc-drawer__header'
        },
        headerSlot
      );
    },

    onKeydown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeydown(event);
    },

    onTransitionend(event: TransitionEvent) {
      this.mdcFoundation.handleTransitionEnd(event);
    },

    //
    // Adapter methods
    //

    notifyOpen() {
      emitCustomEvent(this.$el, strings.OPEN_EVENT, {}, true);
      this.$emit('input', true);
    },

    addClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: true};
    },

    focusActiveNavigationItem() {
      const activeNavItemEl = this.$el.querySelector<HTMLElement>(
        `.${listCssClasses.LIST_ITEM_ACTIVATED_CLASS}`);

      if (activeNavItemEl) activeNavItemEl.focus();
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    notifyClose() {
      emitCustomEvent(this.$el, strings.CLOSE_EVENT, {}, true);
      this.$emit('input', false);
    },

    elementHasClass(element: Element, className: string) {
      return element.classList.contains(className);
    },

    removeClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: false};
    },

    restoreFocus() {
      const previousFocusEl = <HTMLElement | SVGElement | null>this.previousFocusEl;

      if (previousFocusEl && previousFocusEl.focus &&
          this.$el.contains(document.activeElement))
        previousFocusEl.focus();
    },

    saveFocus() {
      this.previousFocusEl = document.activeElement;
    }
  }
});
