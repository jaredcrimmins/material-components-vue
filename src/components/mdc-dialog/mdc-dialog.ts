import {MDCDialogFoundation, strings, util} from '@material/dialog';
import Vue, {CreateElement, VNode} from 'vue';
import {emitCustomEvent} from '../../utils';
import {focusTrap, ponyfill} from '@material/dom';

let dialogID_ = 0;

type SurfaceElRef = HTMLElement;

export default Vue.extend({
  name: 'mdc-dialog',

  props: {
    value: Boolean
  },

  data() {
    return {
      cssClasses: {} as {[cssClass: string]: boolean},
      focusTrap: <focusTrap.FocusTrap | null>null,
      titleID: '',
      contentID: '',
      mdcFoundation: new MDCDialogFoundation(MDCDialogFoundation.defaultAdapter)
    };
  },

  provide(): object {
    return {
      mdcDialogContentID__: this.contentID,
      mdcDialogTitleID__: this.titleID
    };
  },

  created() {
    dialogID_++;

    this.titleID = `__mdc-dialog-title-${dialogID_}`;
    this.contentID = `__mdc-dialog-content-${dialogID_}`;
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  watch: {
    value(value) {
      value ? this.mdcFoundation.open() : this.mdcFoundation.close();
    }
  },

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-dialog',
        on: {
          click: (event: MouseEvent) => {
            this.onClick(event);
          },
          keydown: (event: KeyboardEvent) => {
            this.onKeydown(event);
          }
        }
      },
      [
        c(
          'div',
          {
            staticClass: 'mdc-dialog__container'
          },
          [
            this.genSurface(c)
          ]
        ),
        c(
          'div',
          {
            staticClass: 'mdc-dialog__scrim'
          }
        )
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCDialogFoundation(this);
      this.mdcFoundation.init();
      this.focusTrap = util.createFocusTrapInstance(
        <SurfaceElRef>this.$refs.surfaceEl,
        this.focusTrapFactory,
        this.getInitialFocusEl_() || undefined
      );
    },

    deinit() {
      this.mdcFoundation.destroy();
      document.removeEventListener('keydown', this.onDocumentKeydown);
      window.removeEventListener('resize', this.onWindowResize);
      window.removeEventListener('orientationchange', this.onWindowOrientationChange);
    },

    genSurface(c: CreateElement) {
      return c(
        'div',
        {
          ref: 'surfaceEl',
          staticClass: 'mdc-dialog__surface',
          attrs: {
            role: 'alertdialog',
            'aria-modal': 'true',
            'aria-labeledby': this.titleID,
            'aria-describedby': this.contentID
          }
        },
        this.$slots.default
      );
    },

    onClick(event: MouseEvent) {
      this.mdcFoundation.handleClick(event);
    },

    onKeydown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeydown(event);
    },

    onDocumentKeydown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeydown(event);
    },

    onWindowResize() {
      this.mdcFoundation.layout();
    },

    onWindowOrientationChange() {
      this.mdcFoundation.layout();
    },

    getDefaultButton() {
      return this.$el.querySelector<HTMLButtonElement>(`[${strings.BUTTON_DEFAULT_ATTRIBUTE}]`);
    },

    getInitialFocusEl_() {
      return document.querySelector<HTMLElement>(`[${strings.INITIAL_FOCUS_ATTRIBUTE}]`);
    },

    focusTrapFactory(el: HTMLElement, focusOptions?: focusTrap.FocusOptions) {
      return new focusTrap.FocusTrap(el, focusOptions);
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    hasClass(className: string) {
      return !!this.cssClasses[className];
    },

    addBodyClass(className: string) {
      document.body.classList.add(className);
    },

    removeBodyClass(className: string) {
      document.body.classList.remove(className);
    },

    eventTargetMatches(target: Element, selector: string) {
      return target ? ponyfill.matches(target, selector) : false;
    },

    trapFocus() {
      this.focusTrap?.trapFocus();
    },

    releaseFocus() {
      this.focusTrap?.releaseFocus();
    },

    getInitialFocusEl() {
      return document.querySelector<HTMLElement>(`[${strings.INITIAL_FOCUS_ATTRIBUTE}]`);
    },

    isContentScrollable() {
      const contentEl = this.$el.querySelector<HTMLElement>('.mdc-dialog__content') || null;

      return util.isScrollable(contentEl);
    },

    areButtonsStacked() {
      const buttonEls = Array.from(this.$el.querySelectorAll<HTMLElement>('.mdc-dialog__button'));

      return util.areTopsMisaligned(buttonEls);
    },

    getActionFromEvent(event: Event) {
      if (!event.target) return '';

      const element = ponyfill.closest(<Element>event.target, `[${strings.ACTION_ATTRIBUTE}]`);

      return element && element.getAttribute(strings.ACTION_ATTRIBUTE);
    },

    clickDefaultButton() {
      const defaultButton = this.getDefaultButton();

      defaultButton && defaultButton.click();
    },

    reverseButtons() {
      const buttons = Array.from(this.$el.querySelectorAll(strings.BUTTON_SELECTOR));

      buttons.reverse();
      buttons.forEach(button => {
        button.parentElement?.appendChild(button);
      });
    },

    notifyOpening() {
      this.$emit('input', true);
      emitCustomEvent(this.$el, strings.OPENING_EVENT, {});
      document.addEventListener('keydown', this.onDocumentKeydown);
      window.addEventListener('resize', this.onWindowResize);
      window.addEventListener('orientationchange', this.onWindowOrientationChange);
    },

    notifyOpened() {
      emitCustomEvent(this.$el, strings.OPENED_EVENT, {});
    },

    notifyClosing(action: string) {
      this.$emit('input', false);
      emitCustomEvent(this.$el, strings.CLOSING_EVENT, action ? {action} : {});
      document.removeEventListener('keydown', this.onDocumentKeydown);
      window.removeEventListener('resize', this.onWindowResize);
      window.removeEventListener('orientationchange', this.onWindowOrientationChange);
    },

    notifyClosed(action: string) {
      emitCustomEvent(this.$el, strings.CLOSED_EVENT, action ? {action} : {});
    }
  }
});
