<template>
  <div>
    <h2 id="mdc-checkbox">MDCCheckbox</h2>

    <mdc-checkbox></mdc-checkbox>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-checkbox"
  }
</script>

<style lang="scss">
  @use "@material/checkbox/_index.scss" as checkbox;

  @include checkbox.core-styles;
</style>