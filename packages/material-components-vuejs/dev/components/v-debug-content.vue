<template>
  <div class="v-debug-content">
    <slot />
  </div>
</template>

<script>
  export default {
    name: "VDebugContent"
  }
</script>

<style lang="scss">
  .v-debug-content {
    width: 500px;
  }
</style>