---
title: Checkbox
---

# Checkbox

<v-checkbox-demo1 />

## Usage

### Unchecked

```vue
<mdc-checkbox />
```

### Indeterminate

```vue
<mdc-checkbox indeterminate />
```

### Checked

```vue
<mdc-checkbox checked />
```

## mdc-checkbox

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `checked` | `boolean` | `false` | Native `<input type="checkbox">` element's `checked` attribute. |
| `disabled` | `boolean` | `false` |
| `id` | `string` | `''` |
| `indeterminate` | `boolean` | `false` | Set to `true` to indicate that the checkbox is neither on nor off. |
| `value` | `string | number` | `null` | Native `<input type="checkbox">` element's `value` attribute. |
