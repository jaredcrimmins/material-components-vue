---
title: Button
---

# Button

<v-button-demo1 />

## Usage

### Basic

```html
<mdc-button>Text</mdc-button>
```

### With icon

```html
<mdc-button>
  <template #append>
    <mdc-material-icon>favorite</mdc-material-icon>
  </template>
  <template #default>
    Text
  </template>
  <template #trailing>
    <mdc-material-icon>star</mdc-material-icon>
  </template>
</mdc-button>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` | Disable the button |
| `outlined` | `boolean` | `false` |
| `raised` | `string` | `'div'` | |
| `rippleDisabled` | `boolean` | `false` | Disable the ripple |
| `tag` | `string` | `'button'` | The tag name of the component's root element. This could be the tag name of a Vue component or basic `<a>` element. |
| `to` | `string` | `null` | If the `tag` prop is set to `a`, the `to` prop is used as the `href` attribute on the component's root element. Otherwise, the `to` prop is based on as a prop to the component's root element — this is useful for Vue components like `<router-link>` and `<nuxt-link>`. |
| `unelevated` | `boolean` | `false` | 

## Slots

| Name        | Description |
| ----------- | ------------|
| `default`   |             |
| `append`    | Slot for icon at the start of the button. |
| `trailing`  | Slot for icon at the end of the button. |
