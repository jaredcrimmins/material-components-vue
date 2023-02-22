<template>
  <v-demo-container>
    <div class="v-checkbox-demo1__wrapper">
      <mdc-checkbox checked />

      <mdc-checkbox />
    </div>
  </v-demo-container>
</template>

<style lang="scss">
  .v-checkbox-demo1 {
    &__wrapper {
      align-content: center;
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      justify-content: center;
    }
  }
</style>