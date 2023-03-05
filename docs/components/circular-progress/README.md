---
title: Circular Progress
---

# Circular Progress

<v-circular-progress-demo1 />

## Usage

### Basic

```vue
<mdc-circular-progress open />
```

### Determinate

```vue
<mdc-circular-progress
  determinate
  :progress="0.5"
  open
/>
```

### Small (24px)

```vue
<mdc-circular-progress
  :size="small"
  open
/>
```

### Medium (36px)

```vue
<mdc-circular-progress
  :size="medium"
  open
/>
```

## mdc-circular-progress

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `determinate` | `boolean` | `false` | Set to `true` to put the progress indicator into a determinate state. |
| `open` | `boolean` | `false` |
| `progress` | `number` | `0` | Sets the progress bar to this value. Value must be between 0 and 1. |
| `size` | `string | 'small' | 'medium' | 'large'` | `'large'` |
