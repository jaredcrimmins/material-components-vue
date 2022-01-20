<template>
  <div>
    <h2 id="mdc-image-list">
      MDCImageList
    </h2>

    <v-debug-content>
      <mdc-image-list>
        <mdc-image-list-item
          src="https://freesvg.org/storage/zip/blog/Pizza_Pepperoni.svg"
          label="Hello world!"
          constrain-aspect-ratio
        />
        <mdc-image-list-item
          src="https://freesvg.org/storage/zip/blog/Hello-World-In-Several-Languages.svg"
          label="Hello world!"
          constrain-aspect-ratio
        />
        <mdc-image-list-item
          src="https://freesvg.org/storage/zip/blog/Hello-World-In-Several-Languages.svg"
          label="Hello world!"
          constrain-aspect-ratio
        />
      </mdc-image-list>
    </v-debug-content>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-image-list"
  }
</script>

<style lang="scss">
  @use "@material/image-list/_index.scss" as image-list;

  @include image-list.core-styles;

  .mdc-image-list:not(--mdc-image-list--masonry) {
    @include image-list.standard-columns(2);
  }

  .mdc-image-list.mdc-image-list--masonry {
    @include image-list.masonry-columns(2);
  }
</style>