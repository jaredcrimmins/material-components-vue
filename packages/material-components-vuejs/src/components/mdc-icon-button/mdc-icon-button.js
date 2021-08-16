import {MDCIconButtonToggleFoundation} from '@material/icon-button';
import {MDCMaterialIcon} from '../mdc-material-icon';
import {MDCRipple} from '../mdc-ripple';
import {emitCustomEvent} from '../../utils';

const {cssClasses, strings} = MDCIconButtonToggleFoundation;

Object.assign(cssClasses, {
  ICON_BUTTON_ICON: 'mdc-icon-button__icon',
  ICON_BUTTON_ICON_ON: 'mdc-icon-button__icon--on'
});

export default {
  name: 'mdc-icon-button',

  inheritAttrs: true,

  components: {
    'mdc-material-icon': MDCMaterialIcon,
    'mdc-ripple': MDCRipple
  },

  props: {
    disabled: Boolean,
    rippleDisabled: Boolean,
    icon: String,
    tagName: {
      type: String,
      default: 'button',
      validator(value) {
        return ['a', 'button'].indexOf(value) !== -1;
      }
    },
    toggleable: Boolean,
    onIcon: String
  },

  data() {
    return {
      mdcFoundation: new MDCIconButtonToggleFoundation(
        MDCIconButtonToggleFoundation.defaultAdapter
      )
    };
  },

  computed: {
    isTagNameButton() {
      return this.tagName === 'button';
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c) {
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
          root: ({cssClass, on}) => {
            if (this.$scopedSlots['on-icon'] || this.onIcon) {
              return c(
                this.tagName,
                {
                  class: cssClass,
                  on: on
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

    genToggleIcons(c) {
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

    addClass(className) {
      this.$el.classList.add(className);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    },

    hasClass(className) {
      return this.$el.classList.contains(className);
    },

    setAttr(name, value) {
      this.$el.setAttribute(name, value);
    },

    notifyChange(evtData) {
      emitCustomEvent(this.$el, strings.CHANGE_EVENT, evtData, false);
    }
  }
}
