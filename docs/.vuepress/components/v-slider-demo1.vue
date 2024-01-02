<template>
  <v-demo-container>
    <div class="v-slider-demo1__wrapper">
      <mdc-slider v-model="value" />
    </div>
  </v-demo-container>
</template>

<script>
  export default {
    name: 'v-slider-demo1',

    data() {
      return {
        value: 50
      };
    }
  }
</script>

<style lang="scss">
  .v-slider-demo1 {
    &__wrapper {
      width: 100%;
    }
  }
</style>
