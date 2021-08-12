<template>
  <div>
    <h2 id="mdc-dialog">
      MDCDialog
    </h2>

    <h3>Variants</h3>

    <h4>Confirmation</h4>

    <button @click="onConfirmationToggleButtonClick">
      Open Dialog
    </button>

    <mdc-dialog v-model="confirmationOpen">
      <mdc-dialog-title>Title</mdc-dialog-title>
      <form @submit="onSubmit">
        <mdc-dialog-content>
          After you save, this demo will reset!
          <mdc-text-field
            ref="firstNameTextField"
            label="First name"
            :rules="[isValidFirstName]"
            outlined
            required
            use-native-validation
          />
          <mdc-text-field
            label="Last name"
            outlined
            required
            use-native-validation
          />
          <mdc-text-field
            ref="emailTextField"
            label="Email"
            :rules="[isEmail]"
            pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$"
            outlined
            required
            :required-asterisk="false"
            use-native-validation
          />
          <button @click="onTestClick">
            Test
          </button>
        </mdc-dialog-content>
        <mdc-dialog-actions>
          <mdc-dialog-button
            action="confirm"
            disabled
            initial-focus
          >
            Confirm
          </mdc-dialog-button>
        </mdc-dialog-actions>
      </form>
    </mdc-dialog>
  </div>
</template>

<script>
  export default {
    name: 'TheDebugMdcDialog',

    data() {
      return {
        confirmationOpen: false,
        emailRegEx: /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
        isValidFirstName() {
          return false;
        },
        isEmail(value) {
          return this.emailRegEx.test(value) || 'Please enter a valid email address.';
        }
      };
    },

    methods: {
      onSubmit(event) {
        event.preventDefault();
      },

      onConfirmationToggleButtonClick() {
        this.confirmationOpen = !this.confirmationOpen;
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