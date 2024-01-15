import Vue, {CreateElement, PropOptions, VNode} from 'vue';

const orderOrSpanPropOptions = {
  default: null,
  validator(value: number) {
    if (typeof value !== 'number') return false;

    return value >= 1 && value <= 12;
  }
} as PropOptions<number | null>;

export default Vue.extend({
  name: 'mdc-layout-grid-cell',

  props: {
    align: {
      default: null,
      validator(value: unknown) {
        return value === 'top' || value === 'middle' || value || 'bottom';
      }
    } as PropOptions<'top' | 'middle' | 'bottom' | null>,
    order: orderOrSpanPropOptions,
    span: orderOrSpanPropOptions,
    spanDesktop: orderOrSpanPropOptions,
    spanMobile: orderOrSpanPropOptions,
    spanTablet: orderOrSpanPropOptions
  },

  computed: {
    alignCssClass(): string {
      if (!this.align) return '';

      return `mdc-layout-grid__cell--align-${this.align}`;
    },

    orderCssClass(): string {
      if (!this.order) return '';

      return `mdc-layout-grid__cell--order-${this.order}`;
    }
  },

  render(c: CreateElement): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-layout-grid__cell',
        class: {
          [`mdc-layout-grid__cell--span-${this.span}`]: !!this.span,
          [`mdc-layout-grid__cell--span-${this.spanDesktop}-desktop`]: !!this.spanDesktop,
          [`mdc-layout-grid__cell--span-${this.spanMobile}-mobile`]: !!this.spanMobile,
          [`mdc-layout-grid__cell--span-${this.spanTablet}-tablet`]: !!this.spanTablet,
          [this.alignCssClass]: !!this.alignCssClass,
          [this.orderCssClass]: !!this.orderCssClass
        }
      },
      this.$slots.default
    );
  }
});
