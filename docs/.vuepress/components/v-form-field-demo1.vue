<template>
  <v-demo-container>
    <mdc-form-field label="Label">
      <input type="checkbox">
    </mdc-form-field>
  </v-demo-container>
</template>

<style lang="scss">
  @use '@material/form-field/_index.scss' as form-field;

  @include form-field.core-styles();
</style>