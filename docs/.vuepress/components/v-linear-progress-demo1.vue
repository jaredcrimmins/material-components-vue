<template>
  <v-demo-container>
    <mdc-linear-progress
      :progress="0.5"
      determinate
      open
    />
  </v-demo-container>
</template>

<style lang="scss">
  @use "@material/linear-progress/_index.scss" as linear-progress;

  @include linear-progress.core-styles;
</style>