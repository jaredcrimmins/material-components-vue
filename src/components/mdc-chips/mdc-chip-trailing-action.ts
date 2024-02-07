import {
  MDCChipTrailingActionFoundation,
  MDCChipTrailingActionInteractionEventDetail,
  MDCChipTrailingActionNavigationEventDetail
} from '@material/chips/trailingaction';
import {MDCMaterialIcon} from '../mdc-material-icon';
import {MDCRipple} from '../mdc-ripple';
import {CreateElement, VNode} from 'vue';
import {InteractionTrigger, strings} from '@material/chips/trailingaction/constants';
import {emitCustomEvent, mixins} from '../../utils';
import {touchTargetWrappable} from '@/mixins';

const baseMixins = mixins(touchTargetWrappable);

export default baseMixins.extend({
  name: 'mdc-chip-trailing-action',

  components: {
    'mdc-material-icon': MDCMaterialIcon,
    'mdc-ripple': MDCRipple
  },

  props: {
    navigable: Boolean,
    rippleDisabled: Boolean
  },

  data() {
    return {
      attrs: {} as {[attr: string]: string},
      mdcFoundation: new MDCChipTrailingActionFoundation(
        MDCChipTrailingActionFoundation.defaultAdapter
      )
    };
  },

  render(c: CreateElement): VNode {
    const attrs = {} as {[attr: string]: string};

    if (!this.navigable) attrs[strings.ARIA_HIDDEN] = 'true';
    else attrs['aria-label'] = 'Remove chip';

    return c(
      'mdc-ripple',
      {
        props: {
          disabled: this.rippleDisabled,
          standalone: false,
          unbounded: true
        },
        scopedSlots: {
          root: ({cssClass, on, style}) => {
            return c(
              'button',
              {
                staticClass: 'mdc-chip-trailing-action',
                class: cssClass,
                attrs: {
                  ...attrs,
                  ...this.attrs
                },
                on: {
                  ...on,
                  ...{
                    click: this.onClick,
                    keydown: this.onKeydown
                  }
                },
                style,
              },
              [
                c(
                  'span',
                  {
                    staticClass: 'mdc-chip-trailing-action__ripple'
                  }
                ),
                this.genTouch(c),
                c(
                  'mdc-material-icon',
                  {
                    staticClass: 'mdc-chip-trailing-action__icon'
                  },
                  'close'
                )
              ]
            );
          }
        }
      }
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
      this.mdcFoundation = new MDCChipTrailingActionFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genTouch(c: CreateElement) {
      if (!this.hasTouchTargetWrapperParent) return;

      return c(
        'div',
        {
          staticClass: 'mdc-chip-trailing-action__touch'
        }
      );
    },

    onClick(event: MouseEvent) {
      this.mdcFoundation.handleClick(event);
    },

    onKeydown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeydown(event);
    },

    //
    // Public methods
    //

    removeFocus() {
      this.mdcFoundation.removeFocus();
    },

    //
    // Public/adapter methods
    //

    focus() {
      (<HTMLButtonElement>this.$el).focus();
    },

    //
    // Adapter methods
    //

    getAttribute(attr: string) {
      return (<HTMLButtonElement>this.$el).getAttribute(attr);
    },

    setAttribute(attr: string, value: string) {
      this.attrs = {...this.attrs, [attr]: value};
    },

    notifyInteraction(trigger: InteractionTrigger) {
      emitCustomEvent(
        this.$el,
        strings.INTERACTION_EVENT,
        {trigger} as MDCChipTrailingActionInteractionEventDetail,
        true
      );
    },

    notifyNavigation(key: string) {
      emitCustomEvent(
        this.$el,
        strings.NAVIGATION_EVENT,
        {key} as MDCChipTrailingActionNavigationEventDetail,
        true
      );
    }
  }
});
