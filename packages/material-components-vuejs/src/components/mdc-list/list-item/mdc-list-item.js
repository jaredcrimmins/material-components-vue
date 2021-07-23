import {MDCCheckbox, MDCMaterialIcon, MDCRadio, MDCRipple} from "../../";
import {cssClasses} from "@material/list";

export default {
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

  computed: {
    checkbox() {
      return !!this.$slots.checkbox;
    },

    radio() {
      return !!this.$slots.radio;
    },

    roleAttr() {
      if (this.checkbox) return "checkbox";
      else if (this.radio) return "radio";
      else return "option";
    }
  },

  render(c) {
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

    genGraphic(c) {
      let graphic;

      if(this.menuSelectionGroup) {
        if(this.$slots.graphic) graphic = this.$slots.graphic;
        else {
          graphic = c(
            "mdc-material-icon", {
              props: {
                icon: this.menuSelectionGroupIcon
              }
            },
            this.menuSelectionGroupIcon
          );
        }
      }
      else {
        if(this.checkbox) graphic = this.$slots.checkbox;
        else if(this.radio) graphic = this.$slots.radio;
        else graphic = this.$slots.graphic;
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

    genText(c) {
      if(!this.twoLine) {
        return c(
          "label",
          {
            staticClass: `${cssClasses.LIST_ITEM_TEXT_CLASS}`
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
}