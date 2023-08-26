<template>
  <div>
    <h2 id="mdc-card">
      MDCCard
    </h2>

    <mdc-card>
      <mdc-card-primary-action>
        <mdc-card-media
          src="https://freesvg.org/storage/zip/blog/Pizza_Pepperoni.svg"
          aspect-ratio="square"
        >
          Title
        </mdc-card-media>
      </mdc-card-primary-action>
      <mdc-card-actions>
        <mdc-card-action-buttons>
          <mdc-card-button>Click me!!!</mdc-card-button>
        </mdc-card-action-buttons>
        <mdc-card-action-icons>
          <mdc-card-icon-button icon="favorite" />
        </mdc-card-action-icons>
      </mdc-card-actions>
    </mdc-card>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-card"
  }
</script>

<style lang="scss">
  @use "@material/card";

  @include card.core-styles;
</style>