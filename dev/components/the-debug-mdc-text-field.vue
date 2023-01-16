<template>
  <div>
    <h2 id="mdc-text-field">
      MDCTextField
    </h2>

    <h3>Filled text</h3>

    <mdc-text-field
      filled
      label="Hint text"
      v-model="filledValue"
    />

    <h3>Outlined text</h3>

    <mdc-text-field
      outlined
      label="Your name"
      v-model="outlinedValue"
    />

    <h3>Other variations</h3>

    <h4>Disabled text field</h4>

    <mdc-text-field
      filled
      disabled
      label="Disabled text field"
    />

    <h4>Text field with helper text</h4>

    <mdc-text-field
      filled
      :helper-text="{value: 'helper text', persistent: false}"
      label="My Label"
    />

    <h4>Text field with character counter</h4>

    <mdc-text-field
      character-counter
      filled
      label="Label"
      :maxlength="10"
    />
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-textfield",

    data() {
      return {
        filledValue: '',
        outlinedValue: '',
        rules: {
          isEmail(value) {
            return /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(value) || "Please enter a valid email address.";
          }
        }
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