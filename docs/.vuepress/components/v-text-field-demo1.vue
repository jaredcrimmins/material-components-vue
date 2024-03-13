<template>
  <v-demo-container>
    <mdc-text-field
      label="Name"
      filled
    />
  </v-demo-container>
</template>

<script>
  export default {
    name: 'v-text-field-demo1',

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