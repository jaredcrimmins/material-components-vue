<template>
  <div>
    <h2 id="mdc-ripple">
      MDCRipple
    </h2>

    <mdc-ripple
      class="the-debug-mdc-ripple__demo-box"
      tag-name="div"
    >
      Click here!
    </mdc-ripple>
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-ripple'
  }
</script>

<style lang="scss">
  @use '@material/ripple/styles';

  .the-debug-mdc-ripple {
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