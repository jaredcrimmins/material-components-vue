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
        staticClass: "mdc-list-item"
      },
      [
        c(
          "span",
          {
            staticClass: "mdc-list-item__ripple"
          }
        ),
        c(
          "span",
          {
            staticClass: "mdc-list-item__text"
          },
          this.genListItemText(c)
        )
      ]
    );
  },

  methods: {
    genListItemText(c) {
      if(this.$slots.default) {
        return this.$slots.default;
      }
      else {
        return [
          c(
            "span",
            {
              staticClass: "mdc-list-item__primary-text"
            },
            this.primaryText
          ),
          c(
            "span",
            {
              staticClass: "mdc-list-item__secondary-text"
            },
            this.secondaryText
          )
        ];
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