<template>
  <div>
    <h2 id="mdc-menu">MDCMenu</h2>

    <button v-on:click="onToggleButtonClick">Open MDCMenu</button>
    <mdc-menu-anchor>
      <mdc-menu
        has-typeahead
        quick-open
        v-model="open"
      >
        <mdc-menu-selection-group>
          <mdc-menu-item>Item 1 - Selection Group 1</mdc-menu-item>
          <mdc-menu-item>Item 2 - Selection Group 1</mdc-menu-item>
        </mdc-menu-selection-group>

        <mdc-menu-selection-group>
          <mdc-menu-item>Item 1 - Selection Group 2</mdc-menu-item>
          <mdc-menu-item>Item 2 - Selection Group 2</mdc-menu-item>
        </mdc-menu-selection-group>

        <mdc-menu-divider></mdc-menu-divider>

        <mdc-menu-item>Item 1</mdc-menu-item>
        <mdc-menu-item>Item 2</mdc-menu-item>
      </mdc-menu>
    </mdc-menu-anchor>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-menu",

    data() {
      return {
        open: false
      };
    },

    methods: {
      onToggleButtonClick() {
        this.open = !this.open;
      }
    }
  }
</script>

<style lang="scss">
  @use "@material/menu/_index.scss" as menu;

  @include menu.core-styles;
</style>