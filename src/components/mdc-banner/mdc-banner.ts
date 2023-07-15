import Vue, {CreateElement, VNode} from 'vue';
import {CloseReason, MDCBannerFoundation, events, selectors} from '@material/banner';
import {closest} from '@material/dom/ponyfill';
import {emitCustomEvent} from '../../utils';

type ContentElRef = HTMLElement;

export default Vue.extend({
  name: 'mdc-banner',

  inheritAttrs: true,

  props: {
    centered: Boolean,
    fixed: Boolean,
    graphicAlt: {
      type: String,
      default: ''
    },
    mobileStacked: Boolean,
    text: {
      type: String,
      default: ''
    },
    value: Boolean
  },

  data() {
    return {
      cssClasses: {
        'mdc-banner--centered': this.centered,
        'mdc-banner--mobile-stacked': this.mobileStacked
      } as {[className: string]: boolean},
      mdcFoundation: new MDCBannerFoundation(
        MDCBannerFoundation.defaultAdapter
      ),
      style: {} as {[key: string]: string},
    };
  },

  watch: {
    value(value: boolean) {
      value ? this.open() : this.close(CloseReason.UNSPECIFIED);
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c): VNode {
    const children: VNode[] = [
      this.fixed ? this.genFixed(c) : this.genContent(c)
    ];

    return c(
      'div',
      {
        staticClass: 'mdc-banner',
        class: this.cssClasses,
        style: this.style,
        attrs: {
          role: 'banner'
        }
      },
      children
    );
  },

  methods: {
    init() {
      this.mdcFoundation = new MDCBannerFoundation(this);
      this.mdcFoundation.init();
      this.initListeners();
      this.value ? this.open() : this.close(CloseReason.UNSPECIFIED);
    },

    deinit() {
      this.mdcFoundation.destroy();
      this.deinitListeners();
    },

    initListeners() {
      window.addEventListener('resize', this.onWindowResize);
    },

    deinitListeners() {
      window.removeEventListener('resize', this.onWindowResize);
    },

    //
    // Private methods
    //

    genFixed(c: CreateElement) {
      return c(
        'div',
        {
          staticClass: 'mdc-banner__fixed'
        },
        [
          this.genContent(c),
        ]
      );
    },

    genContent(c: CreateElement) {
      return c(
        'div',
        {
          ref: 'contentEl',
          staticClass: 'mdc-banner__content',
          attrs: {
            role: 'status',
            'aria-live': 'assertive'
          },
          on: {
            click: this.onContentClick
          }
        },
        [
          this.genGraphicTextWrapper(c),
          this.genActions(c)
        ]
      );
    },

    genGraphicTextWrapper(c: CreateElement) {
      return c(
        'div',
        {
          staticClass: 'mdc-banner__graphic-text-wrapper'
        },
        [
          this.genGraphic(c),
          c(
            'div',
            {
              staticClass: 'mdc-banner__text'
            },
            this.text
          )
        ]
      );
    },

    genGraphic(c: CreateElement) {
      const graphicSlot = this.$scopedSlots.graphic;

      if (!graphicSlot) return;

      return c(
        'div',
        {
          staticClass: 'mdc-banner__graphic',
          attrs: {
            role: 'img',
            alt: this.graphicAlt
          }
        },
        [
          graphicSlot({
            staticClass: 'mdc-banner__icon'
          })
        ]
      );
    },

    genActions(c: CreateElement) {
      const actionsSlot = this.$scopedSlots.actions;

      return c(
        'div',
        {
          staticClass: 'mdc-banner__actions'
        },
        actionsSlot ?
          [
            actionsSlot({
              primaryStaticClass: 'mdc-banner__primary-action',
              secondaryStaticClass: 'mdc-banner__secondary-action'
            })
          ] :
          undefined
      );
    },

    onWindowResize() {
      this.mdcFoundation.layout();
    },

    onContentClick(event: Event) {
      const target = event.target as HTMLElement;

      if (closest(target, selectors.PRIMARY_ACTION))
        this.mdcFoundation.handlePrimaryActionClick();
      else if (closest(target, selectors.SECONDARY_ACTION))
        this.mdcFoundation.handleSecondaryActionClick();
    },

    open() {
      this.mdcFoundation.open();
    },

    close(reason: CloseReason) {
      this.mdcFoundation.close(reason);
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      // Modifying the root element class list solely using a Vue mechanism
      // causes the content element's height to be improperly measured when the
      // component is opening.
      // Modifying the root element class list solely using the
      // Element.classList property allows the content element's height to be
      // properly measured, but also opens up the possibility of the class list
      // to be overwritten by a parent component.
      // Combining the two approaches gives the best of both worlds: allowing
      // the content element to be properly measured, and protecting the class
      // list from being overwritten by the parent component.
      this.$el.classList.add(className);
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    getContentHeight() {
      return (<ContentElRef>this.$refs.contentEl).offsetHeight;
    },

    notifyClosed(reason: CloseReason) {
      emitCustomEvent(this.$el, events.CLOSED, {reason});
    },

    notifyClosing(reason: CloseReason) {
      emitCustomEvent(this.$el, events.CLOSING, {reason});
      this.$emit('input', false);
    },

    notifyOpened() {
      emitCustomEvent(this.$el, events.OPENED, {});
    },

    notifyOpening() {
      emitCustomEvent(this.$el, events.OPENING, {});
      this.$emit('input', true);
    },

    setStyleProperty(propertyName: string, value: string) {
      this.style = {...this.style, [propertyName]: value};
    }
  }
});
