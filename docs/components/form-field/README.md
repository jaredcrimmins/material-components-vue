---
title: Form Field
---

# Form Field

<v-form-field-demo1 />

## Usage

```vue
<mdc-form-field label="This is my checkbox">
  <mdc-checkbox />
</mdc-form-field>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `alignEnd` | `boolean` | `false` | Set to `true` to position the input after the label. |
| `inputId` | `string` | `` `__mdc-form-field-${number}` `` | Used as the `for` attribute on the `<label>` element. |
| `label` | `string` | `null` |
| `nowrap` | `boolean` | `false` | Set to `true` to force the text to stay on a single line and ellipse the overflow text. |

## Slots

| Name | Description |
| ---- | ----------- |
| `default` |
