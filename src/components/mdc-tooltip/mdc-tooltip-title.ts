import Vue, {CreateElement} from 'vue';

export default Vue.extend({
  name: 'mdc-tooltip-title',

  inheritAttrs: true,

  props: {
    tag: {
      type: String,
      default: 'h2'
    }
  },

  render(c: CreateElement) {
    return c(
      this.tag,
      {
        staticClass: 'mdc-tooltip__title'
      },
      this.$slots.default
    );
  }
})
