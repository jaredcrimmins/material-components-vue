import {MDCCheckbox, MDCMaterialIcon, MDCRadio} from "./../../";
import {MDCRipple} from "@material/ripple";

export default {
  name: "mdc-list-item",

  components: {
    "mdc-checkbox": MDCCheckbox,
    "material-icon": MDCMaterialIcon,
    "mdc-radio": MDCRadio
  },

  inject: ["twoLine", "menuSelectionGroup", "menuSelectionGroupIcon"],

  props: {
    preselected: Boolean,
    primaryText: String,
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

    graphic() {
      return !!this.slots.radio;
    },

    radio() {
      return !!this.$slots.radio;
    },

    roleAttr() {
      if(this.checkbox) return "checkbox";
      else if(this.radio) return "radio";
      else return "option";
    }
  },

  data() {
    return {
      checkedCheckboxOrRadio: false,
      mdcRipple: null
    };
  },

  mounted() {
    this.mdcRipple = new MDCRipple(this.$el);
  },

  render(c) {
    return c(
      "li",
      {
        attrs: {
          "data-value": this.value,
          role: this.roleAttr
        },
        staticClass: "mdc-deprecated-list-item"
      },
      [
        c(
          "span",
          {
            staticClass: "mdc-deprecated-list-item__ripple"
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
          graphic = c("material-icon", {
            props: {
              icon: this.menuSelectionGroupIcon
            }
          });
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
            staticClass: "mdc-deprecated-list-item__graphic",
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
            staticClass: "mdc-deprecated-list-item__text"
          },
          this.$slots.default
        );
      }
      else {
        return c(
          "span",
          {
            staticClass: "mdc-deprecated-list-item__text"
          },
          [
            c(
              "span",
              {
                staticClass: "mdc-deprecated-list-item__primary-text"
              },
              this.primaryText
            ),
            c(
              "span",
              {
                staticClass: "mdc-deprecated-list-item__secondary-text"
              },
              this.secondaryText
            )
          ]
        );
      }
    },

    //
    // Public methods
    //

    setCheckedCheckboxOrRadio(checked) {
      this.checkedCheckboxOrRadio = checked;
    }
  }
}