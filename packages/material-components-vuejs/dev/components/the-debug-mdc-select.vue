<template>
  <div>
    <h2 id="mdc-select">MDCSelect</h2>

    <mdc-select
      label="Label"
      :items="[
        {text: '', value: ''},
        {text: 'Hello world!', value: 'hello-world'}
      ]"
      hasTypeahead
      outlined
    ></mdc-select>

    <h3>Variants</h3>

    <h4>Outlined</h4>

    <mdc-select
      label="Label"
      :items="[
        {text: '', value: ''},
        {text: 'Hello world!', value: 'hello-world'}
      ]"
      hasTypeahead
      outlined
    ></mdc-select>

    <h4>Filled</h4>

    <mdc-select
      label="Label"
      :items="[
        {text: '', value: ''},
        {text: 'Hello world!', value: 'hello-world'}
      ]"
      filled
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
  @use "@material/select/mdc-select";
</style>