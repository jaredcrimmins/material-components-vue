import {MaterialIconVariant} from '../../mixins/material-iconable';
import {getSlot, mixins} from '../../utils';
import {materialIconable} from '../../mixins';

const baseMixins = mixins(materialIconable);

export default baseMixins.extend({
  name: "mdc-material-icon",

  props: {
    tag: {
      type: String,
      default: "i"
    }
  },

  render(c) {
    const cssClass = {
      "material-icons": this.iconVariant === MaterialIconVariant.Filled,
      "material-icons-outlined": this.iconVariant === MaterialIconVariant.Outlined,
      "material-icons-round": this.iconVariant === MaterialIconVariant.Rounded,
      "material-icons-sharp": this.iconVariant === MaterialIconVariant.Sharp,
      "material-icons-two-tone": this.iconVariant === MaterialIconVariant.TwoTone
    };
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
