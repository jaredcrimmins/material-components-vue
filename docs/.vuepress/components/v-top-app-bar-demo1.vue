<template>
  <v-demo-container>
    <mdc-top-app-bar
      class="v-top-app-bar-demo1__top-app-bar"
      title="Page title"
      navigation-icon
    >
      <template #actions>
        <mdc-top-app-bar-action-item
          icon="favorite"
          aria-label="Favorite"
        />
        <mdc-top-app-bar-action-item
          icon="search"
          aria-label="Search"
        />
        <mdc-top-app-bar-action-item
          icon="more_vert"
          aria-label="Options"
        />
      </template>
    </mdc-top-app-bar>
  </v-demo-container>
</template>

<style lang="scss">
  .v-top-app-bar-demo1 {
    &__top-app-bar {
      position: static;
    }
  }
</style>
