import Vue, {CreateElement, PropOptions, VNode} from 'vue';

export default Vue.extend({
  name: 'mdc-layout-grid',

  props: {
    align: {
      default: null,
      validator(value: unknown) {
        return value === 'left' || value === 'right';
      }
    } as PropOptions<'left' | 'right' | null>,
    fixedColumnWidth: Boolean
  },

  computed: {
    alignCssClass(): string {
      if (!this.align) return '';

      return `mdc-layout-grid--align-${this.align}`;
    }
  },

  render(c: CreateElement): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-layout-grid',
        class: {
          'mdc-layout-grid--fixed-column-width': this.fixedColumnWidth,
          [`mdc-layout-grid--align-${this.align}`]: !!this.alignCssClass
        }
      },
      this.$slots.default
    );
  }
});
