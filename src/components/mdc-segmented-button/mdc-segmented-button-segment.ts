import {MDCMaterialIcon} from '../mdc-material-icon';
import {MDCRipple} from '../mdc-ripple';
import {MDCSegmentedButtonSegmentFoundation} from '@material/segmented-button';
import {CreateElement, VNode, VueConstructor} from 'vue';
import {ExtractVue} from '@/utils';
import {SegmentListType} from './mdc-segmented-button';
import {ponyfill} from '@material/dom';
import {cssClasses as segmentedButtonCssClasses} from './mdc-segmented-button';
import * as constants from '@material/segmented-button/segment/constants';
import {emitCustomEvent, mixins} from '../../utils';
import {touchTargetWrappable} from '../../mixins';

const cssClasses = {
  ...constants.cssClasses,
  ...{
    RIPPLE: 'mdc-segmented-button__ripple',
    ROOT: 'mdc-segmented-button__segment',
    ICON: 'mdc-segmented-button__icon',
    LABEL: 'mdc-segmented-button__label'
  }
};

const baseMixins = mixins(touchTargetWrappable);

interface Injections {
  segmentList: SegmentListType;
  singleSelect: boolean;
}

export default (<VueConstructor<ExtractVue<typeof baseMixins> & Injections>>baseMixins).extend({
  name: 'mdc-segmented-button-segment',

  components: {
    'mdc-material-icon': MDCMaterialIcon,
    'mdc-ripple': MDCRipple
  },

  inject: {
    segmentList: {
      from: 'mdcSegmentedButtonSegmentList__',
      default: []
    },
    singleSelect: {
      from: 'mdcSegmentedButtonSingleSelect__',
      default: false
    }
  },

  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    rippleDisabled: Boolean,
  },

  data() {
    return {
      attrs: {} as {[attributeName: string]: string},
      cssClasses: {} as {[className: string]: boolean},
      index: null as number | null,
      mdcFoundation: new MDCSegmentedButtonSegmentFoundation(
        MDCSegmentedButtonSegmentFoundation.defaultAdapter
      )
    };
  },

  computed: {
    hasLabel(): boolean {
      return !!(this.label || this.$slots.default);
    },

    hasIcon(): boolean {
      return !!(this.icon || this.$slots.icon);
    }
  },

  render(c: CreateElement): VNode {
    const children: VNode[] = [];

    children.push(this.genRipple(c));

    if (this.hasIcon) children.push(this.genIcon(c));

    if (this.hasLabel) children.push(this.genLabel(c));

    return c(
      'button',
      {
        staticClass: cssClasses.ROOT,
        class: this.cssClasses,
        attrs: this.attrs,
        on: {
          click: this.onClick
        }
      },
      children
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
      this.registerSegment();
      this.mdcFoundation = new MDCSegmentedButtonSegmentFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.setUnselected();
      this.mdcFoundation.destroy();
      this.deregisterSegment();
    },

    registerSegment() {
      const instance = this;
      const select = () => instance.mdcFoundation.setSelected();
      const unselect = () => instance.mdcFoundation.setUnselected();
      const isSelected = () => instance.mdcFoundation.isSelected();
      const getSegmentId = () => instance.mdcFoundation.getSegmentId();
      const refreshIndex = () => instance.refreshIndex();

      const index = this.getIndex();

      this.index = index;
      this.segmentList.splice(index, 0, {
        select,
        unselect,
        isSelected,
        getSegmentId,
        refreshIndex
      });
    },

    deregisterSegment() {
      this.segmentList.splice(this.index as number, 1);
    },

    refreshIndex() {
      this.index = this.getIndex();
    },

    getIndex() {
      const segmentedButtonParentEl = ponyfill.closest(
        this.$el,
        `.${segmentedButtonCssClasses.ROOT}`
      );

      if (!segmentedButtonParentEl) return -1;

      const segmentEls = Array.from(
        segmentedButtonParentEl!.querySelectorAll(`.${cssClasses.ROOT}`)
      );

      return segmentEls.indexOf(this.$el);
    },

    genRipple(c: CreateElement) {
      return c(
        'mdc-ripple',
        {
          props: {
            disabled: this.rippleDisabled
          },
          staticClass: cssClasses.RIPPLE
        }
      );
    },

    genIcon(c: CreateElement) {
      const iconSlot = this.$slots.icon

      if (iconSlot)
        return c(
          'div',
          {
            staticClass: cssClasses.ICON
          },
          iconSlot
        );
      else
        return c(
          'mdc-material-icon',
          {
            staticClass: cssClasses.ICON
          },
          this.icon
        );
    },

    genLabel(c: CreateElement) {
      const label = this.label || this.$slots.default;

      return c(
        'div',
        {
          staticClass: cssClasses.LABEL
        },
        label
      );
    },

    onClick() {
      this.mdcFoundation.handleClick();
      this.$emit('click');
    },

    //
    // Adapter methods
    //

    isSingleSelect() {
      return this.singleSelect;
    },

    getAttr(attrName: string) {
      return this.$attrs[attrName];
    },

    setAttr(attrName: string, value: string) {
      this.attrs = {...this.attrs, [attrName]: value};
    },

    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    notifySelectedChange(selected: boolean) {
      emitCustomEvent(
        this.$el,
        constants.events.SELECTED,
        {
          index: this.index,
          selected,
          segmentId: this.$el.id
        },
        true
      );
    },

    getRootBoundingClientRect() {
      return this.$el.getBoundingClientRect();
    }
  }
});
