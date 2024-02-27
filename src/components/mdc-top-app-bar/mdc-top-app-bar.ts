import {
  MDCFixedTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
  MDCTopAppBarFoundation
} from '@material/top-app-bar';
import {MDCIconButton} from '../mdc-icon-button';
import Vue, {CreateElement, VNode} from 'vue';
import {emitCustomEvent} from '../../utils';

const {strings} = MDCTopAppBarFoundation;

const cssClasses = {
  ...MDCTopAppBarFoundation.cssClasses,
  ...{
    DENSE: 'mdc-top-app-bar--dense',
    NAVIGATION_ICON: 'mdc-top-app-bar__navigation-icon',
    PROMINENT: 'mdc-top-app-bar--prominent',
    SECTION: 'mdc-top-app-bar__section',
    SECTION_ALIGN_END: 'mdc-top-app-bar__section--align-end',
    SECTION_ALIGN_START: 'mdc-top-app-bar__section--align-start'
  }
};

export default Vue.extend({
  name: 'mdc-top-app-bar',

  components: {
    'mdc-icon-button': MDCIconButton
  },

  props: {
    dense: Boolean,
    fixed: Boolean,
    navigationIcon: Boolean,
    prominent: Boolean,
    short: Boolean,
    shortCollapsed: Boolean,
    title: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      cssClasses: {} as {[className: string]: boolean},
      mdcFoundation: new MDCTopAppBarFoundation(
        MDCTopAppBarFoundation.defaultAdapter
      ),
      style: {} as {[property: string]: string}
    };
  },

  watch: {
    fixed(value: boolean) {
      if (value) this.init();
      else this.deinit();
    },

    short(value: boolean) {
      if (value) this.init();
      else this.deinit();
    },

    shortCollapsed(value: boolean) {
      (<MDCShortTopAppBarFoundation>this.mdcFoundation)
        .setAlwaysCollapsed(value);
    }
  },

  render(c): VNode {
    return c(
      'header',
      {
        staticClass: 'mdc-top-app-bar',
        class: {
          ... {
            [cssClasses.DENSE]: this.dense,
            [cssClasses.FIXED_CLASS]: this.fixed,
            [cssClasses.PROMINENT]: this.prominent,
            [cssClasses.SHORT_CLASS]: this.short
          },
          ...this.cssClasses
        },
        style: this.style
      },
      [
        c(
          'div',
          {
            staticClass: 'mdc-top-app-bar__row'
          },
          [
            this.genSectionAlignStart(c),
            this.genSectionAlignEnd(c)
          ]
        )
      ]
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
      if (this.fixed) this.mdcFoundation = new MDCFixedTopAppBarFoundation(this);
      else if (this.short) this.mdcFoundation = new MDCShortTopAppBarFoundation(this);
      else this.mdcFoundation = new MDCTopAppBarFoundation(this);

      this.mdcFoundation.init();

      if (this.short && this.shortCollapsed) {
        (<MDCShortTopAppBarFoundation>this.mdcFoundation).setAlwaysCollapsed(this.shortCollapsed);
      }

      window.addEventListener('resize', () => {
        this.mdcFoundation.handleWindowResize();
      });
      window.addEventListener('scroll', () => {
        this.mdcFoundation.handleTargetScroll();
      });
    },

    deinit() {
      this.mdcFoundation.destroy();

      window.removeEventListener('resize', () => {
        this.mdcFoundation.handleWindowResize();
      });
      window.removeEventListener('scroll', () => {
        this.mdcFoundation.handleTargetScroll();
      });
    },

    genRow(c: CreateElement) {
      return c(
        'div',
        {
          staticClass: 'mdc-top-app-bar__row'
        },
        [
          this.genSectionAlignStart(c),
          this.genSectionAlignEnd(c)
        ]
      );
    },

    genSectionAlignStart(c: CreateElement) {
      return c(
        'section',
        {
          staticClass: `${cssClasses.SECTION} ${cssClasses.SECTION_ALIGN_START}`
        },
        [
          this.genNavigationIcon(c),
          this.genTitle(c)
        ]
      );
    },

    genNavigationIcon(c: CreateElement) {
      if (!this.navigationIcon) return;

      return c(
        'mdc-icon-button',
        {
          staticClass: cssClasses.NAVIGATION_ICON,
          props: {
            icon: 'menu'
          },
          attrs: {
            'aria-label': 'Open navigation menu'
          },
          on: {
            click: this.onNavigationIconClick
          }
        }
      );
    },

    genTitle(c: CreateElement) {
      if (!this.title) return;

      return c(
        'span',
        {
          staticClass: 'mdc-top-app-bar__title'
        },
        this.title
      );
    },

    genSectionAlignEnd(c: CreateElement) {
      return c(
        'section',
        {
          staticClass: `${cssClasses.SECTION} ${cssClasses.SECTION_ALIGN_END}`
        },
        this.$slots.actions
      );
    },

    onNavigationIconClick() {
      this.mdcFoundation.handleNavigationClick();
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
      return this.$el.classList.contains(className);
    },

    setStyle(property: string, value: string) {
      this.style = {...this.style, [property]: value};
    },

    getTopAppBarHeight() {
      return this.$el.clientHeight;
    },

    getViewportScrollY() {
      const el = this.$el;

      return window.scrollY !== undefined ? window.scrollY : el.scrollTop;
    },

    getTotalActionItems() {
      return this.$el.querySelectorAll(strings.ACTION_ITEM_SELECTOR).length;
    },

    notifyNavigationIconClicked() {
      emitCustomEvent(this.$el, strings.NAVIGATION_EVENT, {});
      this.$emit('navigation');
    }
  }
});
