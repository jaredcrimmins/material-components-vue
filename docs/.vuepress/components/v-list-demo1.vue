<template>
  <v-demo-container>
    <div class="v-list-demo1__list-container">
      <mdc-list>
        <mdc-list-item
          v-for="num in 4"
          :key="num"
        >
          Single-line list item {{ num }}
        </mdc-list-item>
      </mdc-list>
    </div>
  </v-demo-container>
</template>

<script>
  export default {
    name: 'v-list-demo1'
  }
</script>

<style lang="scss">
  .v-list-demo1 {
    &__list-container {
      background-color: #fff;
    }
  }
</style>