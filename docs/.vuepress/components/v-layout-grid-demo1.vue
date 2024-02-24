<template>
  <v-demo-container class="v-layout-grid-demo1">
    <mdc-layout-grid>
      <mdc-layout-grid-inner>
        <mdc-layout-grid-cell
          v-for="num in 3"
          :key="num"
        >
          {{ num }}
        </mdc-layout-grid-cell>
      </mdc-layout-grid-inner>
    </mdc-layout-grid>
  </v-demo-container>
</template>

<style lang="scss">
  .v-layout-grid-demo1 {
    & .mdc-layout-grid, .mdc-layout-grid__cell {
      background: rgba(0, 0, 0, 0.2);
    }

    & .mdc-layout-grid__cell {
      height: 100px;
    }
  }
</style>
