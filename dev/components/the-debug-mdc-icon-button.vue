<template>
  <div>
    <h2 id="mdc-icon-button">
      MDCIconButton
    </h2>

    <mdc-icon-button
      icon="favorite_border"
      on-icon="favorite"
      toggleable
    />

    <mdc-icon-button
      icon="favorite_border"
      on-icon="favorite"
      icon-variant="two-tone"
      toggleable
    />
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-icon-button"
  }
</script>

<style lang="scss">
  @use "@material/icon-button/_index.scss" as icon-button;

  @include icon-button.core-styles;
</style>