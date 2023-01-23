<template>
  <div>
    <h2 id="mdc-button">
      MDCButton
    </h2>

    <h3>Text button</h3>

    <mdc-button>MDCButton</mdc-button>

    <h4>Text Button plus icon</h4>

    <mdc-button>
      <template #append>
        <mdc-material-icon>bookmark</mdc-material-icon>
      </template>
      <template #default>
        Text Button plus icon
      </template>
    </mdc-button>

    <h3>Outlined button</h3>

    <mdc-button outlined>
      Outlined Button
    </mdc-button>

    <h4>Outlined button with icon</h4>

    <mdc-button outlined>
      <template #append>
        <mdc-material-icon>bookmark</mdc-material-icon>
      </template>
      <template #default>
        Outlined Button plus icon
      </template>
    </mdc-button>

    <h3>Contained button</h3>

    <mdc-button raised>
      Contained Button
    </mdc-button>

    <h4>Contained button with icon</h4>

    <mdc-button raised>
      <template #append>
        <mdc-material-icon>bookmark</mdc-material-icon>
      </template>
      <template #default>
        Contained Button plus icon
      </template>
    </mdc-button>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-button"
  }
</script>

<style lang="scss">
  @use "@material/button/mdc-button";
</style>