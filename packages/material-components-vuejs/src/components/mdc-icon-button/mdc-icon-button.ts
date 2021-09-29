import {MDCIconButtonToggleFoundation} from '@material/icon-button';
import {MDCMaterialIcon} from '../mdc-material-icon';
import {MDCRipple} from '../mdc-ripple';
import Vue, {CreateElement, VNode} from 'vue';
import {emitCustomEvent} from '../../utils';

const {strings} = MDCIconButtonToggleFoundation;

const cssClasses = {...MDCIconButtonToggleFoundation.cssClasses, ...{
  ICON_BUTTON_ICON: 'mdc-icon-button__icon',
  ICON_BUTTON_ICON_ON: 'mdc-icon-button__icon--on'
}};

export default Vue.extend({
  name: 'mdc-icon-button',

  inheritAttrs: true,

  components: {
    'mdc-material-icon': MDCMaterialIcon,
    'mdc-ripple': MDCRipple
  },

  props: {
    disabled: Boolean,
    rippleDisabled: Boolean,
    icon: {
      type: String,
      default: ''
    },
    tagName: {
      type: String,
      default: 'button',
      validator(value) {
        return ['a', 'button'].indexOf(value) !== -1;
      }
    },
    toggleable: Boolean,
    onIcon: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      mdcFoundation: new MDCIconButtonToggleFoundation(
        MDCIconButtonToggleFoundation.defaultAdapter
      )
    };
  },

  computed: {
    isTagNameButton(): boolean {
      return this.tagName === 'button';
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c): VNode {
    return c(
      'mdc-ripple',
      {
        staticClass: cssClasses.ROOT,
        props: {
          disabled: this.rippleDisabled,
          unbounded: true
        },
        attrs: {
          disabled: this.disabled && this.isTagNameButton
        },
        nativeOn: {
          click: this.onClick
        },
        scopedSlots: {
          root: ({cssClass, on, style}) => {
            if (this.$scopedSlots['on-icon'] || this.onIcon) {
              return c(
                this.tagName,
                {
                  class: cssClass,
                  on: on,
                  style
                },
                this.genToggleIcons(c)
              );
            }

            return c(
              'mdc-material-icon',
              {
                class: cssClass,
                props: {
                  tag: this.tagName
                },
                nativeOn: on
              },
              this.icon
            );
          }
        }
      }
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCIconButtonToggleFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    onClick() {
      this.mdcFoundation.handleClick();
    },

    genToggleIcons(c: CreateElement) {
      const iconScopedSlot = this.$scopedSlots.icon;
      const onIconScopedSlot = this.$scopedSlots['on-icon'];
      const onIconCSSClass = `${cssClasses.ICON_BUTTON_ICON} ${cssClasses.ICON_BUTTON_ICON_ON}`;
      const vNodes = [];

      if (iconScopedSlot) {
        vNodes.push(iconScopedSlot({
          staticClass: cssClasses.ICON_BUTTON_ICON
        }));
      } else {
        vNodes.push(
          c(
            'mdc-material-icon',
            {
              staticClass: cssClasses.ICON_BUTTON_ICON
            },
            this.icon
          )
        );
      }

      if (onIconScopedSlot) {
        vNodes.push(onIconScopedSlot({
          staticClass: onIconCSSClass
        }));
      } else {
        vNodes.push(
          c(
            'mdc-material-icon',
            {
              staticClass: onIconCSSClass
            },
            this.onIcon
          )
        );
      }

      return vNodes;
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.$el.classList.add(className);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    setAttr(name: string, value: string) {
      this.$el.setAttribute(name, value);
    },

    notifyChange(evtData: any) {
      emitCustomEvent(this.$el, strings.CHANGE_EVENT, evtData, false);
    }
  }
});
