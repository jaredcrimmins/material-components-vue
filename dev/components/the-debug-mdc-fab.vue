<template>
  <div>
    <h2 id="mdc-fab">
      MDCFab
    </h2>

    <h3>Regular</h3>

    <mdc-fab
      icon="favorite"
      label="Favorite"
      :exited="exited"
      @click="onClick"
    />

    <h3>Mini</h3>

    <mdc-fab
      icon="favorite"
      label="Favorite"
      mini
      :exited="exited"
      @click="onClick"
    />

    <h3>Extended</h3>

    <mdc-fab
      icon="add"
      label="Create"
      extended
      :exited="exited"
      @click="onClick"
    />

    <h3>Link</h3>

    <mdc-fab
      tag="a"
      to="#mdc-fab"
      icon="add"
      label="Create"
      extended
      :exited="exited"
      @click="onClick"
    />
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-fab',

    data() {
      return {
        exited: false
      };
    },

    methods: {
      onClick() {
        this.exited = true;

        setTimeout(() => this.exited = false, 500);
      }
    }
  }
</script>

<style lang="scss">
  @use '@material/fab';

  @include fab.core-styles;
</style>