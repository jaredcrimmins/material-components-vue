<template>
  <v-demo-container>
    <div class="v-button-demo1__wrapper">
      <mdc-button>Text</mdc-button>
      <mdc-button outlined>Outlined</mdc-button>
      <mdc-button raised>Raised</mdc-button>
      <mdc-button unelevated>Unelevated</mdc-button>
    </div>
  </v-demo-container>
</template>

<style lang="scss">
  @use "@material/button/mdc-button";

  .v-button-demo1 {
    &__wrapper {
      align-content: center;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }
  }
</style>