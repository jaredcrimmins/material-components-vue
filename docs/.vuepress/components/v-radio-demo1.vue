<template>
  <v-demo-container class="v-radio-demo1">
    <mdc-radio name="demo-radiogroup" />
    <mdc-radio name="demo-radiogroup" />
  </v-demo-container>
</template>

<script>
  export default {
    name: 'v-radio-demo1',

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

<style lang="scss">
  .v-radio-demo1 {
    gap: 20px;
  }
</style>