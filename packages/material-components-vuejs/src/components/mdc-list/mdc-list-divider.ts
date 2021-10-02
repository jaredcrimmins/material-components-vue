import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-list-divider",

  render(c): VNode {
    return c(
      "li",
      {
        staticClass: "mdc-list-divider",
        attrs: {
          role: "seperator"
        }
      }
    );
  }
});
