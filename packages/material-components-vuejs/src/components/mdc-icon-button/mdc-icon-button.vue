<template>
  <button
    class="mdc-icon-button material-icons"
    :disabled="disabled"
  >
    <div class="mdc-button__icon">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  import {MDCMaterialIcon} from "./../";
  import {MDCRipple} from "@material/ripple";

  export default {
    name: "mdc-icon-button",

    inheritAttrs: true,

    components: {
      "mdc-material-icon": MDCMaterialIcon
    },

    props: {
      disabled: Boolean,
      tagName: {
        type: String,
        default: "button",
        validator(value) {
          return ["a", "button"].indexOf(value) !== -1;
        }
      },
      toggleable: Boolean,
      onIcon: String
    },

    data() {
      return {
        mdcRipple: null
      };
    },

    mounted() {
      this.init();
    },

    render(c) {
      return c(
        "button",
        {
          staticClass: "mdc-icon-button",
          class: {
            "mdc-icon-button--on": this.isOn
          },
          attrs: {
            disabled: this.disabled
          }
        }
      );
    },

    methods: {
      init() {
        this.mdcRipple = new MDCRipple(this.$el);
        this.mdcRipple.unbounded = true;
      },

      genIcon(c) {
        if(!this.toggleable) {
          return c(
            "mdc-material-icon",
            {
              staticClass: "mdc-icon-button__icon",
              props: {
                icon: this.icon
              }
            }
          );
        }

      }
    }
  }
</script>