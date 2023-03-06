<template>
  <div>
    <h2 id="mdc-material-icon">
      MDCMaterialIcon
    </h2>

    <mdc-material-icon>question_answer</mdc-material-icon>

    <h3>Variants</h3>

    <h4>Filled</h4>

    <mdc-material-icon variant="filled">
      question_answer
    </mdc-material-icon>

    <h4>Outlined</h4>

    <mdc-material-icon variant="outlined">
      question_answer
    </mdc-material-icon>

    <h4>Rounded</h4>

    <mdc-material-icon variant="rounded">
      question_answer
    </mdc-material-icon>

    <h4>Sharp</h4>

    <mdc-material-icon variant="sharp">
      question_answer
    </mdc-material-icon>

    <h4>Two tone</h4>

    <mdc-material-icon variant="two-tone">
      question_answer
    </mdc-material-icon>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-material-icon",

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