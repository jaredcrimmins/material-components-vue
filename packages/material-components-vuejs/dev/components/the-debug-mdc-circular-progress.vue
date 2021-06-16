<template>
  <div>
    <h2 id="mdc-circular-progress">MDCCircularProgress</h2>

    <mdc-circular-progress :open="open"></mdc-circular-progress>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-circular-progress",

    data() {
      return {
        open: true
      };
    }
  }
</script>

<style lang="scss">
  @use "@material/circular-progress/_index.scss" as circular-progress;

  @include circular-progress.core-styles;
</style>