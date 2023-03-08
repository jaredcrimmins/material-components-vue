<template>
  <v-demo-container>
    <div class="v-material-icon-demo1__wrapper">
      <div class="v-material-icon-demo1__icon-container">
        <mdc-material-icon class="v-material-icon-demo1__icon" icon-variant="filled">
          shopping_bag
        </mdc-material-icon>
        <div class="v-material-icon-demo1__icon-caption">
          Filled
        </div>
      </div>

      <div class="v-material-icon-demo1__icon-container">
        <mdc-material-icon class="v-material-icon-demo1__icon" icon-variant="outlined">
          shopping_bag
        </mdc-material-icon>
        <div class="v-material-icon-demo1__icon-caption">
          Outlined
        </div>
      </div>

      <div class="v-material-icon-demo1__icon-container">
        <mdc-material-icon class="v-material-icon-demo1__icon" icon-variant="rounded">
          shopping_bag
        </mdc-material-icon>
        <div class="v-material-icon-demo1__icon-caption">
          Rounded
        </div>
      </div>

      <div class="v-material-icon-demo1__icon-container">
        <mdc-material-icon class="v-material-icon-demo1__icon" icon-variant="sharp">
          shopping_bag
        </mdc-material-icon>
        <div class="v-material-icon-demo1__icon-caption">
          Sharp
        </div>
      </div>

      <div class="v-material-icon-demo1__icon-container">
        <mdc-material-icon class="v-material-icon-demo1__icon" icon-variant="two-tone">
          shopping_bag
        </mdc-material-icon>
        <div class="v-material-icon-demo1__icon-caption">
          Two tone
        </div>
      </div>
    </div>
  </v-demo-container>
</template>

<style lang="scss">
  .v-material-icon-demo1 {
    &__wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      justify-content: center;
    }

    &__icon-container {
      display: flex;
      flex-direction: column;
    }

    &__icon {
      margin: auto;
    }

    &__icon-caption {
      font-size: 12px;
      letter-spacing: 0.4px;
    }
  }
</style>