import {MDCListDivider} from "./../";

export default {
  name: "mdc-menu-divider",

  components: {
    "mdc-list-divider": MDCListDivider
  },

  render(c) {
    return c(
      "mdc-list-divider"
    );
  }
}