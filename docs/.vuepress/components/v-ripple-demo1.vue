<template>
  <v-demo-container>
    <mdc-ripple
      class="v-ripple-demo1__demo-box"
      tag="div"
    >
      Click here!
    </mdc-ripple>
  </v-demo-container>
</template>

<style lang="scss">
  @use '@material/ripple/styles';

  .v-ripple-demo1 {
    &__demo-box {
      align-items: center;
      background-color: #fff;
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
      cursor: pointer;
      display: flex;
      height: 100px;
      justify-content: center;
      overflow: hidden;
      padding: 1rem;
      user-select: none;
      width: 200px;
    }
  }
</style>