---
title: Segmented Button
---

# Segmented Button

[Material Components Web docs](https://github.com/material-components/material-components-web/tree/v10.0.0/packages/mdc-segmented-button#readme)

<v-segmented-button-demo1 />

## Usage

### Multi select

```vue
<mdc-segmented-button>
  <mdc-segmented-button-segment>
    Sample Text
  </mdc-segmented-button-segment>
  <mdc-segmented-button-segment icon="favorite">
    Sample Text
  </mdc-segmented-button-segment>
</mdc-segmented-button>
```

### Single select

```vue
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
```

## mdc-segmented-button

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `singleSelect` | `boolean` | `false` |
| `value` | `number | number[]` | The index(es) of the selected segments. For single select segmented buttons, the value must be a number. For multi select segmented buttons, the value must be an array of numbers. |

### Slots

| Name      | Description |
| --------- | ----------- |
| `default` |

## mdc-segmented-button-segment

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `icon` | `string` | `null` | The icon rendered. |
| `label` | `string` | `null` |
| `rippleDisabled` | `boolean` | `false` | Disable the ripple. |
