import {MDCCircularProgressFoundation} from '@material/circular-progress';
import Vue, {CreateElement, VNode} from 'vue';

type CircleGraphicAttrs = {
  viewBox: string;
  cx: number;
  cy: number;
  r: number;
  'stroke-dasharray': number;
  'stroke-dashoffset': number;
}

export default Vue.extend({
  name: 'mdc-circular-progress',

  props: {
    determinate: {
      default: false,
      type: Boolean,
    },
    open: {
      default: false,
      type: Boolean,
    },
    progress: {
      default: 0,
      type: Number,
      validator(value) {
        return value >= 0 && value <= 1;
      },
    },
    size: {
      default: 'large',
      type: String,
      validator(value) {
        return ['small', 'medium', 'large'].includes(value);
      }
    },
  },

  data() {
    return {
      mdcFoundation: new MDCCircularProgressFoundation(
        MDCCircularProgressFoundation.defaultAdapter
      ),
    };
  },

  computed: {
    actualSize(): string {
      if (this.size === 'large') return `${48}px`;
      else if (this.size === 'medium') return `${36}px`;
      else if (this.size === 'small') return `${24}px`;

      return this.size;
    },
  },

  watch: {
    determinate(value) {
      this.setDeterminate(value);
    },

    open(value) {
      value ? this.mdcFoundation.open() : this.mdcFoundation.close();
    },

    progress(value) {
      this.setProgress(value);
    },
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c): VNode {
    const circleGraphicAttrs = this.getCircleGraphicAttrs();

    return c(
      'div',
      {
        staticClass: 'mdc-circular-progress',
        attrs: {
          'aria-valuemax': '1',
          'aria-valuemin': '0',
          'role': 'progress-bar',
        },
        style: {
          height: this.actualSize,
          width: this.actualSize,
        },
      },
      [
        this.genDeterminateContainer(c, circleGraphicAttrs.determinate),
        this.genIndeterminateContainer(c, circleGraphicAttrs.indeterminate),
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCCircularProgressFoundation(this);
      this.mdcFoundation.init();
      this.setDeterminate(this.determinate);
      this.setProgress(this.progress);
      this.open ? this.mdcFoundation.open() : this.mdcFoundation.close();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    getCircleGraphicAttrs() {
      const SMALL_VIEW_BOX = '0 0 24 24';
      const MEDIUM_VIEW_BOX = '0 0 32 32';
      const LARGE_VIEW_BOX = '0 0 48 48';
      const SMALL_CX = 12;
      const MEDIUM_CX = 16;
      const LARGE_CX = 24;
      const SMALL_CY = 12;
      const MEDIUM_CY = 16;
      const LARGE_CY = 24;
      const SMALL_R = 8.75;
      const MEDIUM_R = 12.5;
      const LARGE_R = 18;
      const SMALL_STROKE_DASHARRAY = 54.978;
      const MEDIUM_STROKE_DASHARRAY = 78.54;
      const LARGE_STROKE_DASHARRAY = 113.097;
      const SMALL_DETERMINATE_STROKE_DASHOFFSET = 54.978;
      const MEDIUM_DETERMINATE_STROKE_DASHOFFSET = 78.54;
      const LARGE_DETERMINATE_STROKE_DASHOFFSET = 113.097;
      const SMALL_INDETERMINATE_STROKE_DASHOFFSET = SMALL_DETERMINATE_STROKE_DASHOFFSET / 2;
      const MEDIUM_INDETERMINATE_STROKE_DASHOFFSET = MEDIUM_DETERMINATE_STROKE_DASHOFFSET / 2;
      const LARGE_INDETERMINATE_STROKE_DASHOFFSET = LARGE_DETERMINATE_STROKE_DASHOFFSET / 2;
      const attrs = {
        determinate: {
          'viewBox': '',
          'cx': 0,
          'cy': 0,
          'r': 0,
          'stroke-dasharray': 0,
          'stroke-dashoffset': 0,
        },
        indeterminate: {
          'viewBox': '',
          'cx': 0,
          'cy': 0,
          'r': 0,
          'stroke-dasharray': 0,
          'stroke-dashoffset': 0,
        },
      };

      if(this.small) {
        Object.assign(attrs.determinate, {
          'viewBox': SMALL_VIEW_BOX,
          'cx': SMALL_CX,
          'cy': SMALL_CY,
          'r': SMALL_R,
          'stroke-dasharray': SMALL_STROKE_DASHARRAY,
          'stroke-dashoffset': SMALL_DETERMINATE_STROKE_DASHOFFSET,
        });
        Object.assign(attrs.indeterminate, {
          'viewBox': SMALL_VIEW_BOX,
          'cx': SMALL_CX,
          'cy': SMALL_CY,
          'r': SMALL_R,
          'stroke-dasharray': SMALL_STROKE_DASHARRAY,
          'stroke-dashoffset': SMALL_INDETERMINATE_STROKE_DASHOFFSET,
        });
      }
      else if(this.medium) {
        Object.assign(attrs.determinate, {
          'viewBox': MEDIUM_VIEW_BOX,
          'cx': MEDIUM_CX,
          'cy': MEDIUM_CY,
          'r': MEDIUM_R,
          'stroke-dasharray': MEDIUM_STROKE_DASHARRAY,
          'stroke-dashoffset': MEDIUM_DETERMINATE_STROKE_DASHOFFSET,
        });
        Object.assign(attrs.indeterminate, {
          'viewBox': MEDIUM_VIEW_BOX,
          'cx': MEDIUM_CX,
          'cy': MEDIUM_CY,
          'r': MEDIUM_R,
          'stroke-dasharray': MEDIUM_STROKE_DASHARRAY,
          'stroke-dashoffset': MEDIUM_INDETERMINATE_STROKE_DASHOFFSET,
        });
      }
      else {
        Object.assign(attrs.determinate, {
          'viewBox': LARGE_VIEW_BOX,
          'cx': LARGE_CX,
          'cy': LARGE_CY,
          'r': LARGE_R,
          'stroke-dasharray': LARGE_STROKE_DASHARRAY,
          'stroke-dashoffset': LARGE_DETERMINATE_STROKE_DASHOFFSET,
        });
        Object.assign(attrs.indeterminate, {
          'viewBox': LARGE_VIEW_BOX,
          'cx': LARGE_CX,
          'cy': LARGE_CY,
          'r': LARGE_R,
          'stroke-dasharray': LARGE_STROKE_DASHARRAY,
          'stroke-dashoffset': LARGE_INDETERMINATE_STROKE_DASHOFFSET,
        });
      }

      return attrs;
    },

    setDeterminate(value: boolean) {
      this.mdcFoundation.setDeterminate(value);
    },

    setProgress(value: number) {
      this.mdcFoundation.setProgress(value);
    },

    genDeterminateContainer(c: CreateElement, circleGraphicAttrs: CircleGraphicAttrs) {
      return c(
        'div',
        {
          staticClass: 'mdc-circular-progress__determinate-container',
        },
        [this.genDeterminateCircleGraphic(c, circleGraphicAttrs)]
      );
    },

    genIndeterminateContainer(c: CreateElement, circleGraphicAttrs: CircleGraphicAttrs) {
      return c(
        'div',
        {
          staticClass: 'mdc-circular-progress__indeterminate-container',
        },
        [
          c(
            'div',
            {
              staticClass: 'mdc-circular-progress__spinner-layer',
            },
            [
              this.genCircleClipper(c, circleGraphicAttrs, true),
              this.genGapPatch(c, circleGraphicAttrs),
              this.genCircleClipper(c, circleGraphicAttrs),
            ]
          ),
        ]
      );
    },

    genCircleClipper(
      c: CreateElement,
      circleGraphicAttrs: CircleGraphicAttrs,
      left = false
    ) {
      let staticClass = 'mdc-circular-progress__circle-clipper ';

      staticClass += left ? 'mdc-circular-progress__circle-left' : 'mdc-circular-progress__circle-right';

      return c(
        'div',
        {
          staticClass,
        },
        [this.genIndeterminateCircleGraphic(c, circleGraphicAttrs)]
      );
    },

    genDeterminateCircleGraphic(c: CreateElement, attrs: CircleGraphicAttrs) {
      const {
        viewBox,
        cx,
        cy,
        r,
        'stroke-dasharray': strokeDasharray,
        'stroke-dashoffset': strokeDashoffset,
      } = attrs;

      return c(
        'svg',
        {
          staticClass: 'mdc-circular-progress__determinate-circle-graphic',
          attrs: {
            viewBox,
            'xmlns': 'http://www.w3.org/2000/svg',
          },
        },
        [
          c(
            'circle',
            {
              ref: 'determinateCirlceEl',
              staticClass: 'mdc-circular-progress__determinate-circle',
              attrs: {
                cx,
                cy,
                r,
                'stroke-dasharray': strokeDasharray,
                'stroke-dashoffset': strokeDashoffset,
              },
            }
          ),
        ]
      );
    },

    genIndeterminateCircleGraphic(c: CreateElement, attrs: CircleGraphicAttrs) {
      const {
        viewBox,
        cx,
        cy,
        r,
        'stroke-dasharray': strokeDasharray,
        'stroke-dashoffset': strokeDashoffset,
      } = attrs;

      return c(
        'svg',
        {
          staticClass: 'mdc-circular-progress__indeterminate-circle-graphic',
          attrs: {
            viewBox,
            'xmlns': 'http://www.w3.org/2000/svg',
          },
        },
        [
          c(
            'circle',
            {
              staticClass: 'mdc-circular-progress__determinate-circle',
              attrs: {
                cx,
                cy,
                r,
                'stroke-dasharray': strokeDasharray,
                'stroke-dashoffset': strokeDashoffset,
              },
            }
          ),
        ]
      );
    },

    genGapPatch(c: CreateElement, circleGraphicAttrs: CircleGraphicAttrs) {
      return c(
        'div',
        { staticClass: 'mdc-circular-progress__gap-patch' },
        [this.genIndeterminateCircleGraphic(c, circleGraphicAttrs)]
      );
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.$el.classList.add(className);
    },

    getDeterminateCircleAttribute(attributeName: string) {
      const determinateCirlceEl = this.$refs.determinateCirlceEl;

      return (<Element>determinateCirlceEl).getAttribute(attributeName);
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    removeAttribute(attributeName: string) {
      this.$el.removeAttribute(attributeName);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    },

    setAttribute(attributeName: string, value: string) {
      this.$el.setAttribute(attributeName, value);
    },

    setDeterminateCircleAttribute(attributeName: string, value: string) {
      (<Element>this.$refs.determinateCirlceEl).setAttribute(attributeName, value);
    },
  },
});
