<template>
  <v-demo-container>
    <mdc-image-list>
      <mdc-image-list-item
        v-for="(imageListItemUrl) in imageListItemUrls"
        :key="imageListItemUrl"
        :src="imageListItemUrl"
        label="Text label"
      />
    </mdc-image-list>
  </v-demo-container>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        imageListItemUrls: []
      };
    },

    created() {
      this.imageListItemUrls = this.getImageListItemUrls();
    },

    methods: {
      getImageListItemUrls() {
        const numOfImageListItems = 4;
        const imageListItemUrls = [];

        for (let x = 1; x < numOfImageListItems + 1; x++) {
          imageListItemUrls.push(this.getImageListItemUrl(x));
        }

        return imageListItemUrls;
      },

      getImageListItemUrl(num) {
        return `https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/${num}.jpg`;
      }
    }
  });
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