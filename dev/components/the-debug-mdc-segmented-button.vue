<template>
  <div>
    <h2 id="mdc-segmented-button">
      MDCSegmentedButton
    </h2>

    <h3>Multi select</h3>

    <mdc-segmented-button>
      <mdc-segmented-button-segment>
        Sample Text
      </mdc-segmented-button-segment>
      <mdc-segmented-button-segment icon="favorite">
        Sample Text
      </mdc-segmented-button-segment>
    </mdc-segmented-button>

    <h3>Single select</h3>

    <mdc-segmented-button single-select>
      <mdc-segmented-button-segment>
        Conditional Segment
      </mdc-segmented-button-segment>
      <mdc-segmented-button-segment>
        Sample Text
      </mdc-segmented-button-segment>
      <mdc-segmented-button-segment icon="favorite">
        Sample Text
      </mdc-segmented-button-segment>
    </mdc-segmented-button>
  </div>
</template>

<style lang="scss">
  @use '@material/segmented-button/styles';
</style>