<template>
  <v-demo-container>
    <mdc-menu-anchor>
      <mdc-button @click="onButtonClick">
        Open Menu
      </mdc-button>
      <mdc-menu v-model="open">
        <mdc-menu-item>A Menu Item</mdc-menu-item>
        <mdc-menu-item>Another Menu Item</mdc-menu-item>
      </mdc-menu>
    </mdc-menu-anchor>
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