<template>
  <div>
    <h2 id="mdc-touch-target">
      MDCTouchTarget
    </h2>

    <h3>Touch Target wrapped MDCButton</h3>

    <mdc-touch-target-wrapper>
      <mdc-button unelevated>
        Button
      </mdc-button>
    </mdc-touch-target-wrapper>

    <h3>Touch Target wrapped MDCCheckbox</h3>

    <mdc-touch-target-wrapper>
      <mdc-checkbox />
    </mdc-touch-target-wrapper>

    <h3>Touch Target wrapped MDCRadio</h3>

    <mdc-touch-target-wrapper>
      <mdc-radio />
    </mdc-touch-target-wrapper>
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-touch-target'
  }
</script>

<style lang="scss">
  @use '@material/touch-target/mdc-touch-target';
</style>