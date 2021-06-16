<template>
  <div>
    <h2 id="mdc-button">MDCButton</h2>

    <mdc-button>MDCButton</mdc-button>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-button"
  }
</script>

<style lang="scss">
  @use "@material/button/_index.scss" as button;

  @include button.core-styles;
</style>