<template>
  <div>
    <h2 id="mdc-form-field">
      MDCFormField
    </h2>

    <mdc-form-field label="Label">
      <mdc-checkbox />
    </mdc-form-field>

    <h3>Variants</h3>
    
    <h4>Align end</h4>

    <mdc-form-field
      label="Label"
      align-end
    >
      <mdc-checkbox />
    </mdc-form-field>

    <h4>Nowrap</h4>

    <mdc-form-field
      label="Label"
      nowrap
    >
      <mdc-checkbox />
    </mdc-form-field>
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-form-field'
  }
</script>

<style lang="scss">
  @use '@material/form-field/_index.scss' as form-field;

  @include form-field.core-styles();
</style>