---
title: Layout Grid
---

# Layout Grid

[Material Components Web docs](https://github.com/material-components/material-components-web/tree/v10.0.0/packages/mdc-layout-grid)

<v-layout-grid-demo1 />

## Usage

### Basic

```vue
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
```

### Nested

```vue
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
```

### Columns

```vue
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
```

### Left Alignment

This requires a max-width on the top-level grid element.

```vue
<mdc-layout-grid
  class="grid-alignment"
  align="left"
>
  <mdc-layout-grid-inner>
    <mdc-layout-grid-cell
      v-for="num in 3"
      :key="num"
    />
  </mdc-layout-grid-inner>
</mdc-layout-grid>
```

```css
.grid-alignment {
  max-width: 800px;
}
```

### Right Alignment

This requires a max-width on the top-level grid element.

```vue
<mdc-layout-grid
  class="grid-alignment"
  align="right"
>
  <mdc-layout-grid-inner>
    <mdc-layout-grid-cell
      v-for="num in 3"
      :key="num"
    />
  </mdc-layout-grid-inner>
</mdc-layout-grid>
```

```css
.grid-alignment {
  max-width: 800px;
}
```

### Cell Alignment

Cell alignment requires a cell height smaller than the inner height of the grid.

```vue
<mdc-layout-grid class="cell-alignment">
  <mdc-layout-grid-inner>
    <mdc-layout-grid-cell align="top" />
    <mdc-layout-grid-cell align="middle" />
    <mdc-layout-grid-cell align="bottom" />
  </mdc-layout-grid-inner>
</mdc-layout-grid>
```

```css
.cell-alignment .mdc-layout-grid__inner {
  min-height: 200px;
}

.cell-alignment .mdc-layout-grid__cell {
  max-height: 50px;
}
```

## mdc-layout-grid

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `align` | `'left' | 'right'` | `null` |
| `fixedColumnWidth` | `boolean` | `false` |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-layout-grid-cell

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `align` | `'top' | 'middle' | 'bottom'` | `null` |
| `order` | `number` | `null` | By default, items are positioned in the source order. However, you can reorder them using this prop. The value must be an integer between 1 and 12. |
| `span` | `number` | `null` | Set the number of columns the cell spans. The value must be an integer between 1 and 12. |
| `spanDesktop` | `number` | `null` | The number of columns the cell spans on dekstop. The value must be an integer between 1 and 12. |
| `spanMobile` | `number` | `null` | The number of columns the cell spans on mobile. The value must be an integer between 1 and 12. |
| `spanTablet` | `number` | `null` | The number of columns the cell spans on tablet. The value must be an integer between 1 and 12. |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-layout-grid-inner

### Slots

| Name | Description |
| ---- | ------------|
| `default` |
