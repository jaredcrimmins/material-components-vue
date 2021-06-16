<template>
  <div>
    <h2 id="mdc-linear-progress">MDCLinearProgress</h2>

    <mdc-linear-progress :open="open"></mdc-linear-progress>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-linear-progress",

    data() {
      return {
        open: true
      };
    }
  }
</script>

<style lang="scss">
  @use "@material/linear-progress/_index.scss" as linear-progress;

  @include linear-progress.core-styles;
</style>