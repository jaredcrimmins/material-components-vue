import {MDCIconButtonToggleFoundation} from '@material/icon-button';
import {MDCMaterialIcon} from '../';
import {MDCRipple} from '@material/ripple';
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
    'mdc-material-icon': MDCMaterialIcon
  },

  props: {
    disabled: Boolean,
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
      mdcFoundation: new MDCIconButtonToggleFoundation(MDCIconButtonToggleFoundation.defaultAdapter),
      mdcRipple: null
    };
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c) {
    return c(
      'button',
      {
        staticClass: cssClasses.ROOT,
        attrs: {
          disabled: this.disabled
        },
        on: {
          click: event => {
            this.onClick(event);
          }
        }
      },
      [
        this.genIcon(c),
        this.genOnIcon(c)
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCIconButtonToggleFoundation(this);
      this.mdcFoundation.init();
      this.mdcRipple = new MDCRipple(this.$el);
      this.mdcRipple.unbounded = true;
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genIcon(c) {
      const icon = this.icon;
      const iconScopedSlot = this.$scopedSlots.icon;

      if(iconScopedSlot) {
        return iconScopedSlot({
          staticClass: cssClasses.ICON_BUTTON_ICON
        });
      }
      else if(icon) {
        return c(
          'mdc-material-icon',
          {
            staticClass: cssClasses.ICON_BUTTON_ICON
          },
          icon
        );
      }
    },

    genOnIcon(c) {
      const onIcon = this.onIcon;
      const onIconScopedSlot = this.$scopedSlots['on-icon'];

      if(onIconScopedSlot) {
        return onIconScopedSlot({
          staticClass: `${cssClasses.ICON_BUTTON_ICON} ${cssClasses.ICON_BUTTON_ICON_ON}`
        });
      }
      else if(onIcon) {
        return c(
          'mdc-material-icon',
          {
            staticClass: `${cssClasses.ICON_BUTTON_ICON} ${cssClasses.ICON_BUTTON_ICON_ON}`
          },
          onIcon
        );
      }
    },

    onClick() {
      this.mdcFoundation.handleClick();
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