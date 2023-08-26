---
title: Switch
---

# Switch

<v-switch-demo1 />

## Usage

### Basic

```vue
<mdc-switch checked />
```

### With mdc-form-field

```vue
<mdc-form-field
  input-id="mdc-switch1"
  label="Label"
>
  <mdc-switch
    id="mdc-switch1"
    checked
  />
</mdc-form-field>
```

## mdc-tooltip

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `checked` | `boolean` | `false` | Native `<input type="checkbox">` element's `checked` attribute. |
| `disabled` | `boolean` | `false` |
