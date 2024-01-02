<template>
  <div>
    <h2 id="mdc-slider">
      MDCSlider
    </h2>

    <h3>Continous slider</h3>

    <mdc-slider v-model="continousValue" />

    <h3>Continuous range slider</h3>

    <mdc-slider v-model="continousRangeValue" />

    <h3>Discrete slider</h3>

    <mdc-slider
      discrete
      v-model="discreteValue"
    />

    <h3>Discrete slider with tick marks</h3>

    <mdc-slider
      :step="10"
      discrete
      tick-marks
      v-model="discreteWithTickMarks"
    />

    <h3>Discrete range slider</h3>

    <mdc-slider
      :step="10"
      discrete
      v-model="discreteRange"
    />
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-slider',

    data() {
      return {
        continousValue: 50,
        continousRangeValue: [30, 70],
        discreteValue: 50,
        discreteWithTickMarks: 50,
        discreteRange: [50, 100]
      };
    }
  }
</script>

<style lang="scss">
  @use "@material/slider/styles";
</style>