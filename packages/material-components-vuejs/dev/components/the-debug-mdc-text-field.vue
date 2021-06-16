<template>
  <div>
    <h2 id="mdc-text-field">MDCTextField</h2>

    <mdc-text-field
      label="Label"
      :rules="[this.rules.isEmail]"
      characterCounter
      fullWidth
      outlined
      v-model="value"
    ></mdc-text-field>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-text-field",

    data() {
      return {
        rules: {
          isEmail(value) {
            return /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(value) || "Please enter a valid email address.";
          }
        },
        value: ""
      };
    }
  }
</script>

<style lang="scss">
  @use "@material/notched-outline/_index.scss" as notched-outline;
  @use "@material/textfield/_index.scss" as textfield;

  @include notched-outline.core-styles;
  @include textfield.core-styles;
</style>