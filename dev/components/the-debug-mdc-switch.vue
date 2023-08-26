<template>
  <div>
    <h2 id="mdc-switch">
      MDCSwitch
    </h2>

    <mdc-switch />
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-switch"
  }
</script>

<style lang="scss">
  @use "@material/switch/_index.scss" as switch;

  @include switch.core-styles;
</style>