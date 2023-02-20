import {CreateElement, VNode} from 'vue';
import {MDCIconButtonToggleFoundation} from '@material/icon-button';
import {MDCMaterialIcon} from '../mdc-material-icon';
import {MDCRipple} from '../mdc-ripple';
import {emitCustomEvent, mixins} from '../../utils';
import {linkable} from '../../mixins';

const {strings} = MDCIconButtonToggleFoundation;

const cssClasses = {...MDCIconButtonToggleFoundation.cssClasses, ...{
  ICON_BUTTON_ICON: 'mdc-icon-button__icon',
  ICON_BUTTON_ICON_ON: 'mdc-icon-button__icon--on'
}};

const baseMixins = mixins(linkable);

export default baseMixins.extend({
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
    tag: {
      type: String,
      default: 'button'
    },
    toggleable: Boolean,
    onIcon: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      cssClass: <{[className: string]: boolean}>{},
      mdcFoundation: new MDCIconButtonToggleFoundation(
        MDCIconButtonToggleFoundation.defaultAdapter
      )
    };
  },

  computed: {
    isTagButton(): boolean {
      return this.tag === 'button';
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
        class: this.cssClass,
        props: {
          disabled: this.rippleDisabled,
          unbounded: true
        },
        attrs: {
          disabled: this.disabled && this.isTagButton
        },
        nativeOn: {
          click: this.onClick
        },
        scopedSlots: {
          root: ({cssClass, on, style}) => {
            if (this.$scopedSlots['on-icon'] || this.onIcon) {
              return c(
                this.tag,
                {
                  class: cssClass,
                  on: on,
                  style,
                  props: {
                    to: this.to
                  }
                },
                this.genToggleIcons(c)
              );
            }

            return c(
              'mdc-material-icon',
              {
                class: cssClass,
                props: {
                  tag: this.tag
                },
                nativeOn: on,
                scopedSlots: {
                  root: ({cssClass}) => {
                    return c(
                      this.tag,
                      {
                        class: cssClass,
                        props: {
                          to: this.to
                        }
                      },
                      this.icon
                    )
                  }
                }
              }
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
      this.cssClass = {...this.cssClass, [className]: true};
    },

    removeClass(className: string) {
      this.cssClass = {...this.cssClass, [className]: false};
    },

    hasClass(className: string) {
      return !!this.cssClass[className];
    },

    setAttr(name: string, value: string) {
      this.$el.setAttribute(name, value);
    },

    notifyChange(evtData: any) {
      emitCustomEvent(this.$el, strings.CHANGE_EVENT, evtData, false);
    }
  }
});
