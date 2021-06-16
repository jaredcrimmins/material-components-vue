<template>
  <div>
    <h2 id="mdc-select">MDCSelect</h2>

    <mdc-select
      label="Label"
      :outlined="false"
      :items="[
        {text: '', value: ''},
        {text: 'Hello world!', value: 'hello-world'}
      ]"
      hasTypeahead
    ></mdc-select>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-select"
  }
</script>

<style lang="scss">
  @use "@material/select/_index.scss" as select;

  @include select.core-styles;
</style>