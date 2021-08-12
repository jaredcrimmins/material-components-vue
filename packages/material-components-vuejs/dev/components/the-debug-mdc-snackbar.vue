<template>
  <div>
    <h2 id="mdc-snackbar">
      MDCSnackbar
    </h2>

    <button @click="onToggleButtonClick">
      Open/close MDCSnackbar
    </button>

    <mdc-snackbar
      v-model="open"
      label="MDCSnackbar label"
      close-on-escape
      dismiss-button
    >
      <template v-slot:action="{staticClass, onClick}">
        <mdc-button
          :class="staticClass"
          @click="onClick"
        >
          Retry
        </mdc-button>
      </template>
    </mdc-snackbar>
  </div>
</template>

<script>
  export default {
    name: "TheDebugMdcSnackbar",

    data() {
      return {
        open: false
      };
    },

    methods: {
      onToggleButtonClick() {
        this.open = !this.open;
      },

      onActionButtonClick() {
        this.open = false;
      }
    }
  }
</script>

<style lang="scss">
  @use "@material/snackbar/_index.scss" as snackbar;

  @include snackbar.core-styles;
</style>