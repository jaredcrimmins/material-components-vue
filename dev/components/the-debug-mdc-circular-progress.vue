<template>
  <div>
    <h2 id="mdc-circular-progress">
      MDCCircularProgress
    </h2>

    <h3>Variants</h3>

    <h4>Small</h4>

    <mdc-circular-progress
      size="small"
      :open="smallOpen"
    />

    <button @click="onToggleSmallButtonClick">
      Toggle small MDCCircularProgress
    </button>

    <h4>Medium</h4>

    <mdc-circular-progress
      size="medium"
      :open="mediumOpen"
    />

    <button @click="onToggleMediumButtonClick">
      Toggle medium MDCCircularProgress
    </button>

    <h4>Large</h4>

    <mdc-circular-progress
      size="large"
      :open="largeOpen"
    />

    <button @click="onToggleLargeButtonClick">
      Toggle large MDCCircularProgress
    </button>

    <h4>Custom</h4>

    <mdc-circular-progress
      size="90px"
      :open="customOpen"
    />

    <h4>Determinate</h4>
    
    <mdc-circular-progress
      size="large"
      :progress="0.5"
      determinate
      open
    />
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-circular-progress",

    data() {
      return {
        smallOpen: true,
        mediumOpen: true,
        largeOpen: true,
        customOpen: true
      };
    },

    methods: {
      onToggleSmallButtonClick() {
        this.smallOpen = !this.smallOpen;
      },

      onToggleMediumButtonClick() {
        this.mediumOpen = !this.mediumOpen;
      },

      onToggleLargeButtonClick() {
        this.largeOpen = !this.largeOpen;
      },

      onToggleCustomButtonClick() {
        this.customOpen = !this.customOpen;
      }
    }
  }
</script>

<style lang="scss">
  @use "@material/circular-progress/mdc-circular-progress";
</style>