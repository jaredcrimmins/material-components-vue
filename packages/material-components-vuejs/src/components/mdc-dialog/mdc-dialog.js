import {FocusTrap} from '@material/dom/focus-trap';
import {MDCDialogFoundation, strings, util} from '@material/dialog';
import {closest, matches} from '@material/dom/ponyfill';
import {emitCustomEvent} from '../../utils';

let dialogID_ = 0;

export default {
  name: 'mdc-dialog',

  props: {
    title: String,
    value: Boolean
  },

  data() {
    return {
      focusTrap: null,
      titleID: '',
      contentID: '',
      mdcFoundation: new MDCDialogFoundation(MDCDialogFoundation.defaultAdapter)
    };
  },

  provide() {
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

  render(c) {
    return c(
      'div',
      {
        staticClass: 'mdc-dialog',
        on: {
          click: event => {
            this.onClick(event);
          },
          keydown: event => {
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
        this.$refs.surfaceEl,
        this.focusTrapFactory,
        this.getInitialFocusEl_()
      );
    },

    deinit() {
      this.mdcFoundation.destroy();
      document.removeEventListener('keydown', this.onDocumentKeydown);
      window.removeEventListener('resize', this.onWindowResize);
      window.removeEventListener('orientationchange', this.onWindowOrientationChange);
    },

    genSurface(c) {
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

    onClick(event) {
      this.mdcFoundation.handleClick(event);
    },

    onKeydown(event) {
      this.mdcFoundation.handleKeydown(event);
    },

    onDocumentKeydown(event) {
      this.mdcFoundation.handleKeydown(event);
    },

    onWindowResize() {
      this.mdcFoundation.layout();
    },

    onWindowOrientationChange() {
      this.mdcFoundation.layout();
    },

    getDefaultButton() {
      return this.$el.querySelector(`[${strings.BUTTON_DEFAULT_ATTRIBUTE}]`);
    },

    getInitialFocusEl_() {
      return document.querySelector(`[${strings.INITIAL_FOCUS_ATTRIBUTE}]`);
    },

    focusTrapFactory(el, focusOptions) {
      return new FocusTrap(el, focusOptions);
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
      this.$el.classList.contains(className);
    },

    addBodyClass(className) {
      document.body.classList.add(className);
    },

    removeBodyClass(className) {
      document.body.classList.remove(className);
    },

    eventTargetMatches(target, selector) {
      return target ? matches(target, selector) : false;
    },

    trapFocus() {
      this.focusTrap.trapFocus();
    },

    releaseFocus() {
      this.focusTrap.releaseFocus();
    },

    getInitialFocusEl() {
      return document.querySelector(`[${strings.INITIAL_FOCUS_ATTRIBUTE}]`);
    },

    isContentScrollable() {
      const contentEl = this.$el.querySelector('.mdc-dialog__content');

      return util.isScrollable(contentEl);
    },

    areButtonsStacked() {
      const buttonEls = Array.from(this.$el.querySelectorAll('.mdc-dialog__button'));

      return util.areTopsMisaligned(buttonEls);
    },

    getActionFromEvent(event) {
      if (!event.target) return '';

      const element = closest(event.target, `[${strings.ACTION_ATTRIBUTE}]`);

      return element && element.getAttribute(strings.ACTION_ATTRIBUTE);
    },

    clickDefaultButton() {
      const defaultButton = this.getDefaultButton();

      defaultButton && defaultButton.click();
    },

    reverseButtons() {

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
    
    notifyClosing(action) {
      this.$emit('input', false);
      emitCustomEvent(this.$el, strings.CLOSING_EVENT, action ? {action} : {});
      document.removeEventListener('keydown', this.onDocumentKeydown);
      window.removeEventListener('resize', this.onWindowResize);
      window.removeEventListener('orientationchange', this.onWindowOrientationChange);
    },

    notifyClosed(action) {
      emitCustomEvent(this.$el, strings.CLOSED_EVENT, action ? {action} : {});
    }
  }
}