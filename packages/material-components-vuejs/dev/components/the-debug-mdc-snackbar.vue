<template>
  <div>
    <h2 id="mdc-snackbar">MDCSnackbar</h2>

    <button v-on:click="onToggleButtonClick">Open/close MDCSnackbar</button>

    <mdc-snackbar
      v-model="open"
      label="MDCSnackbar label"
      close-on-escape
      dismissButton
    >
      <template v-slot:action="{staticClass, onClick}">
        <mdc-button
          :class="staticClass"
          v-on:click="onClick"
        >
          Retry
        </mdc-button>
      </template>
    </mdc-snackbar>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-snackbar",

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