import {MDCCheckbox} from "../../mdc-checkbox";
import {MDCMaterialIcon} from "../../mdc-material-icon";
import {MDCRadio} from "../../mdc-radio";
import {MDCRipple} from "../../mdc-ripple";
import Vue, {CreateElement, VueConstructor, VNode} from 'vue';
import {cssClasses} from "@material/list";
import {getSlot, hasSlot} from "../../../utils";

let mdcListItemID_ = 0;

interface Injections {
  menuSelectionGroup: boolean;
  menuSelectionGroupIcon: boolean;
  twoLine: boolean;
}

export default (<VueConstructor<Vue & Injections>>Vue).extend({
  name: "mdc-list-item",

  components: {
    "mdc-checkbox": MDCCheckbox,
    "mdc-material-icon": MDCMaterialIcon,
    "mdc-radio": MDCRadio,
    "mdc-ripple": MDCRipple
  },

  inject: {
    twoLine: {
      default: false
    },
    menuSelectionGroup: {
      default: false
    },
    menuSelectionGroupIcon: {
      default: false
    }
  },

  props: {
    preselected: Boolean,
    primaryText: String,
    rippleDisabled: Boolean,
    secondaryText: String,
    value: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      inputID: ""
    };
  },

  computed: {
    checkbox() {
      return hasSlot(this, 'checkbox');
    },

    radio() {
      return hasSlot(this, 'radio');
    },

    roleAttr() {
      if (this.checkbox) return "checkbox";
      else if (this.radio) return "radio";
      else return "option";
    }
  },

  created() {
    mdcListItemID_++;

    this.inputID = `__mdc-list-item-input${mdcListItemID_}`;
  },

  render(c): VNode {
    return c(
      "mdc-ripple",
      {
        staticClass: cssClasses.LIST_ITEM_CLASS,
        attrs: {
          "data-value": this.value,
          role: this.roleAttr
        },
        props: {
          disabled: this.rippleDisabled,
          standalone: false,
          tagName: "li"
        }
      },
      [
        c(
          "span",
          {
            staticClass: "mdc-list-item__ripple"
          }
        ),
        this.genGraphic(c),
        this.genText(c)
      ]
    );
  },

  methods: {
    //
    // Private methods
    //

    genGraphic(c: CreateElement) {
      const graphicSlot = getSlot(this, "graphic");
      let graphic;

      if(this.menuSelectionGroup) {
        if(graphicSlot) graphic = graphicSlot;
        else {
          graphic = c(
            "mdc-material-icon",
            this.menuSelectionGroupIcon
          );
        }
      }
      else {
        if(this.checkbox)
          graphic = getSlot(this, "checkbox", {id: this.inputID}, false);
        else if(this.radio)
          graphic = getSlot(this, "radio", {id: this.inputID}, false);
        else graphic = graphicSlot;
      }

      if(graphic) {
        return c(
          "span",
          {
            staticClass: "mdc-list-item__graphic",
            class: {
              "mdc-menu__selection-group-icon": this.menuSelectionGroup
            }
          },
          [
            graphic
          ]
        );
      }
    },

    genText(c: CreateElement) {
      if(!this.twoLine) {
        const forAttr = this.checkbox || this.radio ? this.inputID : "";

        return c(
          "label",
          {
            staticClass: `${cssClasses.LIST_ITEM_TEXT_CLASS}`,
            attrs: {
              for: forAttr
            }
          },
          this.$slots.default
        );
      }
      else {
        return c(
          "span",
          {
            staticClass: `${cssClasses.LIST_ITEM_TEXT_CLASS}`
          },
          [
            c(
              "span",
              {
                staticClass: `${cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS}`
              },
              this.primaryText
            ),
            c(
              "span",
              {
                staticClass: `mdc-list-item__secondary-text`
              },
              this.secondaryText
            )
          ]
        );
      }
    }
  }
});
