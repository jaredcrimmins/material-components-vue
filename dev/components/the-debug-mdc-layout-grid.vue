<template>
  <div class="the-debug-mdc-layout-grid">
    <h2 id="mdc-layout-grid">
      MDCLayoutGrid
    </h2>

    <h3>Basic</h3>

    <mdc-layout-grid>
      <mdc-layout-grid-inner>
        <mdc-layout-grid-cell
          v-for="num in 3"
          :key="num"
        >
          {{ num }}
        </mdc-layout-grid-cell>
      </mdc-layout-grid-inner>
    </mdc-layout-grid>

    <h3>Nested</h3>

    <mdc-layout-grid>
      <mdc-layout-grid-inner>
        <mdc-layout-grid-cell>
          <mdc-layout-grid-inner>
            <mdc-layout-grid-cell
              v-for="num in 2"
              :key="num"
            >
              <span>Second level</span>
            </mdc-layout-grid-cell>
          </mdc-layout-grid-inner>
        </mdc-layout-grid-cell>
        <mdc-layout-grid-cell
          v-for="num in 2"
          :key="num"
        >
          First level
        </mdc-layout-grid-cell>
      </mdc-layout-grid-inner>
    </mdc-layout-grid>

    <h3>Columns</h3>

    <mdc-layout-grid>
      <mdc-layout-grid-inner>
        <mdc-layout-grid-cell :span="6" />
        <mdc-layout-grid-cell :span="3" />
        <mdc-layout-grid-cell :span="2" />
        <mdc-layout-grid-cell :span="1" />
        <mdc-layout-grid-cell :span="3" />
        <mdc-layout-grid-cell :span="1" />
        <mdc-layout-grid-cell :span="8" />
      </mdc-layout-grid-inner>
    </mdc-layout-grid>

    <h3>Left Alignment</h3>

    <mdc-layout-grid
      class="the-debug-mdc-layout-grid__grid-alignment"
      align="left"
    >
      <mdc-layout-grid-inner>
        <mdc-layout-grid-cell
          v-for="num in 3"
          :key="num"
        />
      </mdc-layout-grid-inner>
    </mdc-layout-grid>

    <h3>Right Alignment</h3>

    <mdc-layout-grid
      class="the-debug-mdc-layout-grid__grid-alignment"
      align="right"
    >
      <mdc-layout-grid-inner>
        <mdc-layout-grid-cell
          v-for="num in 3"
          :key="num"
        />
      </mdc-layout-grid-inner>
    </mdc-layout-grid>

    <h3>Cell Alignment</h3>

    <mdc-layout-grid class="the-debug-mdc-layout-grid__cell-alignment">
      <mdc-layout-grid-inner>
        <mdc-layout-grid-cell align="top" />
        <mdc-layout-grid-cell align="middle" />
        <mdc-layout-grid-cell align="bottom" />
      </mdc-layout-grid-inner>
    </mdc-layout-grid>
  </div>
</template>

<script>
  export default {
    name: 'the-debug-mdc-layout-grid'
  }
</script>

<style lang="scss">
  @use '@material/layout-grid/mdc-layout-grid';

  .the-debug-mdc-layout-grid {
    &__grid-alignment {
      max-width: 800px;
    }

    &__cell-alignment {
      & .mdc-layout-grid__inner {
        min-height: 200px;
      }

      & .mdc-layout-grid__cell {
        max-height: 50px;
      }
    }

    & .mdc-layout-grid, .mdc-layout-grid__cell {
      background: rgba(0, 0, 0, 0.2);
    }

    & .mdc-layout-grid__cell {
      height: 100px;
    }
  }
</style>