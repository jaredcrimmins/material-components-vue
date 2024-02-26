<template>
  <div>
    <h2 id="mdc-drawer">
      MDCDrawer
    </h2>

    <mdc-drawer>
      <template #header>
        <mdc-drawer-title>Mail</mdc-drawer-title>
        <mdc-drawer-subtitle>email@material.io</mdc-drawer-subtitle>
      </template>

      <mdc-list tag="nav">
        <mdc-list-item>Inbox</mdc-list-item>
        <mdc-list-item>Outgoing</mdc-list-item>
        <mdc-list-item>Drafts</mdc-list-item>
      </mdc-list>
    </mdc-drawer>

    <button @click="onDismissibleButtonClick">
      Open/close dismissible Drawer
    </button>

    <mdc-drawer
      dismissible
      :value="dismissibleDrawerOpen"
    >
      <template #header>
        <mdc-drawer-title>Mail</mdc-drawer-title>
        <mdc-drawer-subtitle>email@material.io</mdc-drawer-subtitle>
      </template>

      <mdc-list tag="nav">
        <mdc-list-item>Inbox</mdc-list-item>
        <mdc-list-item>Outgoing</mdc-list-item>
        <mdc-list-item>Drafts</mdc-list-item>
      </mdc-list>
    </mdc-drawer>
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-drawer',

    data() {
      return {
        dismissibleDrawerOpen: false,
        modalDrawerOpen: false
      };
    },

    methods: {
      onDismissibleButtonClick() {
        this.dismissibleDrawerOpen = !this.dismissibleDrawerOpen;
      },

      onModalButtonClick() {
        this.modalDrawerOpen = !this.modalDrawerOpen;
      }
    }
  }
</script>

<style lang="scss">
  @use '@material/drawer/index.scss' as drawer;

  @include drawer.core-styles;
  @include drawer.dismissible-core-styles;
  @include drawer.modal-core-styles;
</style>