---
title: Slider
---

# Slider

<v-slider-demo1 />

## Usage

### Continous slider

```vue
<mdc-slider :value="50" />
```

### Continuous range slider

```vue
<mdc-slider :value="[30, 70]" />
```

### Discrete slider

```vue
<mdc-slider
  discrete
  :value="50"
/>
```

### Discrete slider with tick marks

```vue
<mdc-slider
  :step="10"
  discrete
  tick-marks
  :value="50"
/>
```

### Discrete range slider

```vue
<mdc-slider
  :step="10"
  discrete
  :value="[50, 100]"
/>
```

## mdc-slider

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` |
| `discrete` | `boolean` | `false` | Set to `true` to display a numeric value label upon pressing the thumb, which allows a user to select an exact value. |
| `max` | `number` | `100` | Maximum value of the slider. |
| `min` | `number` | `0` | Minimum value of the slider. |
| `step` | `number | null` | `null` | Set to specify the granularity that the value must adhere to. |
| `tickMarks` | `boolean` | `false` | Set to `true` to display tick marks representing the granularity that the value must adhere to, defined by the `step` prop. |
| `value` | `number | number[]` |
