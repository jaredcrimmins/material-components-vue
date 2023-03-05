<template>
  <v-demo-container>
    <div class="v-circular-progress-demo1__wrapper">
      <div class="v-circular-progress-demo1__indicator-container">
        <mdc-circular-progress
          class="v-circular-progress-demo1__indicator"
          open
        />
        <div class="v-circular-progress-demo1__indicator-caption">
          Indeterminate
        </div>
      </div>
      <div class="v-circular-progress-demo1__indicator-container">
        <mdc-circular-progress
          class="v-circular-progress-demo1__indicator"
          determinate
          :progress="0.5"
          open
        />
        <div class="v-circular-progress-demo1__indicator-caption">
          Determinate
        </div>
      </div>
    </div>
  </v-demo-container>
</template>

<style lang="scss">
  .v-circular-progress-demo1 {
    &__wrapper {
      display: flex;
      gap: 32px;
    }

    &__indicator-container {
      display: flex;
      flex-direction: column;
    }

    &__indicator {
      margin: auto;
    }

    &__indicator-caption {
      font-size: 12px;
      letter-spacing: 0.4px;
    }
  }
</style>