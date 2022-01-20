import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-list-group",

  render(c): VNode {
    return c(
      "div",
      {
        staticClass: "mdc-list-group"
      },
      this.$slots.default
    );
  }
});
