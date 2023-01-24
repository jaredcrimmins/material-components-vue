<template>
  <div class="v-demo-container">
    <slot />
  </div>
</template>

<style>
  .v-demo-container {
    align-items: center;
    background-color: #f2f2f2;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    min-height: 360px;
    padding: 8px;
    width: 100%;
  }
</style>