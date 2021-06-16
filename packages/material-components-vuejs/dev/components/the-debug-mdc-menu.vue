<template>
  <div>
    <h2 id="mdc-menu">MDCMenu</h2>

    <button v-on:click="onToggleButtonClick">Open MDCMenu</button>
    <mdc-menu-anchor>
      <mdc-menu
        hasTypeahead
        v-model="open"
      >
        <mdc-menu-selection-group>
          <mdc-menu-item>Flip X</mdc-menu-item>
        </mdc-menu-selection-group>

        <mdc-menu-selection-group>
          <mdc-menu-item>Flip Y</mdc-menu-item>
        </mdc-menu-selection-group>

        <mdc-menu-divider></mdc-menu-divider>

        <mdc-menu-item>2</mdc-menu-item>
        <mdc-menu-item>3</mdc-menu-item>
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