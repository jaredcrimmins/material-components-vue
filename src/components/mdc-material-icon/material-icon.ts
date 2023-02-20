import Vue from 'vue';
import {getSlot} from '../../utils';

export default Vue.extend({
  name: "material-icon",

  props: {
    tag: {
      type: String,
      default: "i"
    }
  },

  render(c) {
    const cssClass = {"material-icons": true};
    const rootSlot = getSlot(this, "root", {cssClass});

    if (rootSlot) return rootSlot[0];

    return c(
      this.tag,
      {
        class: cssClass
      },
      this.$slots.default
    );
  }
});
