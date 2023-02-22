---
title: Linear Progress
---

# Linear Progress

<v-linear-progress-demo1 />

## Usage

```vue
<mdc-linear-progress
  :progress="0.5"
  determinate
  open
/>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `buffer` | `number` | `0` | Value of the buffer bar. Value should be between [0, 1]. |
| `determinate` | `boolean` | `false` |
| `open` | `boolean` | `false` |
| `progress` | `number` | `0` | Value of the progress bar. Value should be between [0, 1]. |