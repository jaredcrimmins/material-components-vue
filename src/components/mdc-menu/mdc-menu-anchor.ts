import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-menu-anchor",

  render(c): VNode {
    return c(
      "div",
      {
        staticClass: "mdc-menu-surface--anchor"
      },
      this.$slots.default
    );
  }
});
