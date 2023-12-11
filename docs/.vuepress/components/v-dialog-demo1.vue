<template>
  <v-demo-container>
    <mdc-button @click="onAlertButtonClick">Alert Dialog</mdc-button>
    <mdc-button @click="onSimpleButtonClick">Simple Dialog</mdc-button>
    <mdc-button @click="onConfirmationButtonClick">Confirmation Dialog</mdc-button>

    <mdc-dialog v-model="alertOpen">
      <mdc-dialog-content>Discard draft?</mdc-dialog-content>
      <mdc-dialog-actions>
        <mdc-dialog-button action="cancel">
          Cancel
        </mdc-dialog-button>
        <mdc-dialog-button
          action="confirm"
          initial-focus
        >
          Discard
        </mdc-dialog-button>
      </mdc-dialog-actions>
    </mdc-dialog>

    <mdc-dialog v-model="simpleOpen">
      <mdc-dialog-title>Choose a Ringtone</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-list class="mdc-list--avatar-list">
          <mdc-list-item data-mdc-dialog-action="none">None</mdc-list-item>
          <mdc-list-item data-mdc-dialog-action="callisto">Callisto</mdc-list-item>
          <mdc-list-item data-mdc-dialog-action="ganymede">Ganymede</mdc-list-item>
          <mdc-list-item data-mdc-dialog-action="luna">Luna</mdc-list-item>
          <mdc-list-item data-mdc-dialog-action="oberon">Oberon</mdc-list-item>
          <mdc-list-item data-mdc-dialog-action="phobos">Phobos</mdc-list-item>
          <mdc-list-item data-mdc-dialog-action="dione">Dione</mdc-list-item>
        </mdc-list>
      </mdc-dialog-content>
    </mdc-dialog>

    <mdc-dialog v-model="confirmationOpen">
      <mdc-dialog-title>Choose a Ringtone</mdc-dialog-title>
      <mdc-dialog-content>
        <mdc-list class="mdc-list--avatar-list">
          <mdc-list-item>
            <template #radio="slotProps">
              <mdc-radio
                v-bind="slotProps"
                name="dialog-confirmation-radio-group"
              />
            </template>
            <template #default>
              None
            </template>
          </mdc-list-item>
          <mdc-list-item>
            <template #radio="slotProps">
              <mdc-radio
                v-bind="slotProps"
                name="dialog-confirmation-radio-group"
              />
            </template>
            <template #default>
              Callisto
            </template>
          </mdc-list-item>
          <mdc-list-item>
            <template #radio="slotProps">
              <mdc-radio
                v-bind="slotProps"
                name="dialog-confirmation-radio-group"
              />
            </template>
            <template #default>
              Ganymede
            </template>
          </mdc-list-item>
          <mdc-list-item>
            <template #radio="slotProps">
              <mdc-radio
                v-bind="slotProps"
                name="dialog-confirmation-radio-group"
                checked
              />
            </template>
            <template #default>
              Luna
            </template>
          </mdc-list-item>
          <mdc-list-item>
            <template #radio="slotProps">
              <mdc-radio
                v-bind="slotProps"
                name="dialog-confirmation-radio-group"
              />
            </template>
            <template #default>
              Oberon
            </template>
          </mdc-list-item>
          <mdc-list-item>
            <template #radio="slotProps">
              <mdc-radio
                v-bind="slotProps"
                name="dialog-confirmation-radio-group"
              />
            </template>
            <template #default>
              Phobos
            </template>
          </mdc-list-item>
          <mdc-list-item>
            <template #radio="slotProps">
              <mdc-radio
                v-bind="slotProps"
                name="dialog-confirmation-radio-group"
              />
            </template>
            <template #default>
              Dione
            </template>
          </mdc-list-item>
        </mdc-list>
      </mdc-dialog-content>
      <mdc-dialog-actions>
        <mdc-dialog-button action="close">
          Cancel
        </mdc-dialog-button>
        <mdc-dialog-button
          action="accept"
          initial-focus
        >
          OK
        </mdc-dialog-button>
      </mdc-dialog-actions>
    </mdc-dialog>
  </v-demo-container>
</template>

<script>
  export default {
    name: 'v-dialog-demo1',

    data() {
      return {
        alertOpen: false,
        simpleOpen: false,
        confirmationOpen: false
      };
    },

    methods: {
      onAlertButtonClick() {
        this.alertOpen = true;
      },

      onSimpleButtonClick() {
        this.simpleOpen = true;
      },

      onConfirmationButtonClick() {
        this.confirmationOpen = true;
      }
    }
  }
</script>