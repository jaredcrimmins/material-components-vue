<template>
  <div>
    <h2 id="mdc-dialog">MDCDialog</h2>

    <button v-on:click="onToggleButtonClick">Open Dialog</button>
    <mdc-dialog v-model="open">
      <mdc-dialog-title>Title</mdc-dialog-title>
      <form v-on:submit="onSubmit">
        <mdc-dialog-content>
          After you save, this demo will reset!
            <mdc-text-field
              ref="firstNameTextField"
              label="First name"
              :rules="[isValidFirstName]"
              outlined
              required
              useNativeValidation
            ></mdc-text-field>
            <mdc-text-field
              label="Last name"
              outlined
              required
              useNativeValidation
            ></mdc-text-field>
            <mdc-text-field
              ref="emailTextField"
              label="Email"
              :rules="[isEmail]"
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$"
              outlined
              required
              :requiredAsterisk="false"
              useNativeValidation
            ></mdc-text-field>
            <button v-on:click="onTestClick">Test</button>
        </mdc-dialog-content>
        <mdc-dialog-actions>
          <mdc-dialog-button
            action="confirm"
            disabled
            initialFocus
          >Confirm</mdc-dialog-button>
        </mdc-dialog-actions>
      </form>
      <!-- <template v-slot:content>
        After you save, this demo will reset!
        <form v-on:submit="onSubmit">
          <mdc-text-field
            ref="firstNameTextField"
            label="First name"
            :rules="[isValidFirstName]"
            outlined
            required
            useNativeValidation
          ></mdc-text-field>
          <mdc-text-field
            label="Last name"
            outlined
            required
            useNativeValidation
          ></mdc-text-field>
          <mdc-text-field
            ref="emailTextField"
            label="Email"
            :rules="[isEmail]"
            pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$"
            outlined
            required
            :requiredAsterisk="false"
            useNativeValidation
          ></mdc-text-field>
          <button v-on:click="onTestClick">Test</button>
        </form>
      </template>
      <template v-slot:actions>
        <mdc-dialog-button action="confirm" disabled>Confirm</mdc-dialog-button>
      </template> -->
    </mdc-dialog>
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-dialog',

    data() {
      return {
        open: false,
        isValidFirstName() {
          return false;
        },
        isEmail(value) {
          return /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(value) || 'Please enter a valid email address.';
        }
      };
    },

    methods: {
      onSubmit(event) {
        // const firstNameValidity = this.$refs.firstNameTextField.isValid();
        // const emailValidity = this.$refs.emailTextField.isValid();

        event.preventDefault();
      },

      onToggleButtonClick() {
        this.open = !this.open;
      },

      onTestClick() {
        console.log(this.$refs.emailTextField.isValid());
      }
    }
  }
</script>

<style lang="scss">
  @use '@material/dialog/_index.scss' as dialog;

  @include dialog.core-styles;
</style>