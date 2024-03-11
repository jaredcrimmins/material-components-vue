<template>
  <v-demo-container>
    <mdc-drawer>
      <template #header>
        <mdc-drawer-title>Mail</mdc-drawer-title>
        <mdc-drawer-subtitle>email@material.io</mdc-drawer-subtitle>
      </template>

      <mdc-drawer-list>
        <mdc-drawer-list-item>Inbox</mdc-drawer-list-item>
        <mdc-drawer-list-item>Outgoing</mdc-drawer-list-item>
        <mdc-drawer-list-item>Drafts</mdc-drawer-list-item>
      </mdc-drawer-list>
    </mdc-drawer>
  </v-demo-container>
</template>

<script>
  export default {
    name: 'v-drawer-demo1'
  }
</script>