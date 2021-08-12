<template>
  <div>
    <h2 id="mdc-select">
      MDCSelect
    </h2>

    <mdc-select
      label="Label"
      :items="[
        {text: '', value: ''},
        {text: 'Hello world!', value: 'hello-world'}
      ]"
      has-typeahead
      outlined
    />

    <h3>Variants</h3>

    <h4>Outlined</h4>

    <mdc-select
      label="Label"
      :items="[
        {text: '', value: ''},
        {text: 'Hello world!', value: 'hello-world'}
      ]"
      has-typeahead
      outlined
    />

    <h4>Filled</h4>

    <mdc-select
      label="Label"
      :items="[
        {text: '', value: ''},
        {text: 'Hello world!', value: 'hello-world'}
      ]"
      filled
      has-typeahead
    />
  </div>
</template>

<script>
  export default {
    name: "TheDebugMdcSelect"
  }
</script>

<style lang="scss">
  @use "@material/select/mdc-select";
</style>