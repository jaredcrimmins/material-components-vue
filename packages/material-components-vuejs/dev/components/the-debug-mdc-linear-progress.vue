<template>
  <div>
    <h2 id="mdc-linear-progress">MDCLinearProgress</h2>

    <h3>Indeterminate</h3>

    <mdc-linear-progress :open="indeterminateOpen"></mdc-linear-progress>

    <button v-on:click="onToggleIndeterminateButtonClick">Toggle indeterminate MDCLinearProgress</button>

    <h3>Reverse</h3>

    <mdc-linear-progress
      open
      reverse
    ></mdc-linear-progress>

    <h3>Determinate</h3>

    <mdc-linear-progress
      :progress="0.5"
      determinate
      open
    ></mdc-linear-progress>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-linear-progress",

    data() {
      return {
        indeterminateOpen: true
      };
    },

    methods: {
      onToggleIndeterminateButtonClick() {
        this.indeterminateOpen = !this.indeterminateOpen;
      }
    }
  }
</script>

<style lang="scss">
  @use "@material/linear-progress/_index.scss" as linear-progress;

  @include linear-progress.core-styles;
</style>