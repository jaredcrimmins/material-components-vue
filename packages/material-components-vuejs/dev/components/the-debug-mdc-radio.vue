<template>
  <div>
    <h2 id="mdc-radio">MDCRadio</h2>

    <form>
      <mdc-radio name="radio" value="radio1" checked></mdc-radio>
      <mdc-radio name="radio" value="radio2"></mdc-radio>
    </form>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-radio"
  }
</script>

<style lang="scss">
  @use "@material/radio/_index.scss" as radio;

  @include radio.core-styles;
</style>