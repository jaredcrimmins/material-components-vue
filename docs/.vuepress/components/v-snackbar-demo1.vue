<template>
  <v-demo-container>
    <mdc-button
      @click="onButtonClick"
      raised
    >
      Open Snackbar
    </mdc-button>
    <mdc-snackbar
      label="Can't send photo. Retry in 5 seconds."
      :value="open"
      dismiss-button
    >
      <template #action="{staticClass, onClick}">
        <mdc-button
          :class="staticClass"
          @click="onClick"
        >
          Retry
        </mdc-button>
      </template>
    </mdc-snackbar>
  </v-demo-container>
</template>

<script>
  export default {
    name: 'v-menu-demo1',

    data() {
      return {
        open: false
      };
    },

    methods: {
      onButtonClick() {
        this.open = !this.open;
      }
    }
  }
</script>