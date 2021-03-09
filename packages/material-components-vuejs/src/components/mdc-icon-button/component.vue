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
  "use-strict"

  import {MDCRipple} from "@material/ripple";

  export default {
    name: "mdc-icon-button",
    inheritAttrs: true,

    props: {
      disabled: Boolean
    },

    data() {
      return {
        mdcRipple: null
      };
    },

    mounted() {
      this.init();
    },

    methods: {
      init() {
        this.mdcRipple = new MDCRipple(this.$el);
        this.mdcRipple.unbounded = true;
      }
    }
  }
</script>