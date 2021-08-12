<template>
  <div>
    <h2 id="mdc-checkbox">
      MDCCheckbox
    </h2>

    <h3>Standard checkbox</h3>

    <mdc-checkbox />

    <h3>Disabled checkbox</h3>

    <mdc-checkbox disabled />

    <h3>Indeterminate checkbox</h3>

    <mdc-checkbox indeterminate />
  </div>
</template>

<script>
  export default {
    name: "TheDebugMdcCheckbox"
  }
</script>

<style lang="scss">
  @use "@material/checkbox/_index.scss" as checkbox;

  @include checkbox.core-styles;
</style>