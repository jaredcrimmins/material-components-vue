import {CreateElement, VNode} from 'vue';
import {MDCMaterialIcon} from '../mdc-material-icon';
import {MDCRipple} from '../mdc-ripple';
import {mixins} from '../../utils';
import {linkable, materialIconable, touchTargetWrappable} from '../../mixins';

const baseMixins = mixins(linkable, materialIconable, touchTargetWrappable);

export default baseMixins.extend({
  name: 'mdc-fab',

  inheritAttrs: true,

  components: {
    'mdc-material-icon': MDCMaterialIcon,
    'mdc-ripple': MDCRipple
  },

  props: {
    disabled: Boolean,
    exited: Boolean,
    extended: Boolean,
    rippleDisabled: Boolean,
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    mini: Boolean,
    tag: {
      type: String,
      default: 'button'
    }
  },

  data() {
    return {
      cssClass: <{[className: string]: boolean}>{}
    };
  },

  computed: {
    isTagButton(): boolean {
      return this.tag === 'button';
    }
  },

  render(c): VNode {
    return c(
      'mdc-ripple',
      {
        props: {
          disabled: this.rippleDisabled,
          unbounded: true,
          standalone: false
        },
        scopedSlots: {
          root: ({cssClass, on, style}) => {
            return c(
              this.tag,
              {
                staticClass: 'mdc-fab',
                class: {
                  ...{
                    'mdc-fab--exited': this.exited,
                    'mdc-fab--extended': this.extended,
                    'mdc-fab--mini': this.mini,
                    'mdc-fab--touch': this.hasTouchTargetWrapperParent
                  },
                  ...cssClass
                },
                props: {
                  to: this.to
                },
                attrs: {
                  disabled: this.disabled && this.isTagButton,
                  'aria-label': this.label && !this.extended ? this.label : null,
                  href: this.href
                },
                style,
                on: {
                  ...{
                    click: this.onClick
                  },
                  ...on
                }
              },
              [
                c(
                  'div',
                  {
                    staticClass: 'mdc-fab__ripple'
                  }
                ),
                this.genIcon(c),
                this.genLabel(c)
              ]
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

    genIcon(c: CreateElement) {
      if (!this.icon) return;

      return c(
        'mdc-material-icon',
        {
          staticClass: 'mdc-fab__icon'
        },
        this.icon
      );
    },

    genLabel(c: CreateElement) {
      if (!this.label || !this.extended) return;

      return c(
        'span',
        {
          staticClass: 'mdc-fab__label'
        },
        this.label
      );
    },

    onClick() {
      this.$emit('click');
    }
  }
});
