<template>
  <div>
    <h2 id="mdc-chips">
      MDCChips
    </h2>

    <h3>Basic</h3>

    <mdc-chip-set>
      <mdc-chip>Chip One</mdc-chip>
      <mdc-chip>Chip Two</mdc-chip>
    </mdc-chip-set>

    <h3>Leading icon</h3>

    <mdc-chip-set>
      <mdc-chip leading-icon="event">
        Add to calendar
      </mdc-chip>
    </mdc-chip-set>

    <h3>Trailing icon</h3>

    <mdc-chip-set>
      <mdc-chip trailing-icon="event">
        Add to calendar
      </mdc-chip>
    </mdc-chip-set>

    <h3>Choice Chips</h3>

    <mdc-chip-set choice>
      <mdc-chip selected>
        Chip One
      </mdc-chip>
      <mdc-chip>Chip Two</mdc-chip>
    </mdc-chip-set>

    <mdc-chip-set filter>
      <mdc-chip>Filterable content</mdc-chip>
    </mdc-chip-set>

    <h3>Input Chips</h3>

    <mdc-chip-set input>
      <mdc-chip>Chip One</mdc-chip>
      <mdc-chip>Chip Two</mdc-chip>
    </mdc-chip-set>

    <h3>Trailing Action</h3>

    <mdc-chip-set input>
      <mdc-chip trailing-action>
        Chip One
      </mdc-chip>
    </mdc-chip-set>
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-chips'
  }
</script>

<style lang="scss">
  @use '@material/chips/mdc-chips';
</style>