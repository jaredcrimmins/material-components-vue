<template>
  <div>
    <h2 id="mdc-tabs">
      MDCTabs
    </h2>

    <mdc-tab-bar
      automatic-activation
      focus-on-activate
      indicator-span-content
    >
      <mdc-tab
        icon="star"
        indicator-icon="star"
      >
        Hello World!
      </mdc-tab>
      <mdc-tab
        icon="star"
        indicator-icon="recommend"
      >
        Hello World?
      </mdc-tab>
    </mdc-tab-bar>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-tabs"
  }
</script>

<style lang="scss">
  @use "@material/tab/_index.scss" as tab;
  @use "@material/tab-bar/_index.scss" as tab-bar;
  @use "@material/tab-indicator/_index.scss" as tab-indicator;
  @use "@material/tab-scroller/_index.scss" as tab-scroller;

  @include tab.core-styles;
  @include tab-bar.core-styles;
  @include tab-indicator.core-styles;
  @include tab-scroller.core-styles;
</style>