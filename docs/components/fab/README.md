---
title: FAB
---

# FAB

[Material Components Web docs](https://github.com/material-components/material-components-web/tree/v10.0.0/packages/mdc-fab#readme)

<v-fab-demo1 />

## Usage

### Regular

```vue
<mdc-fab
  icon="favorite"
  label="Favorite"
/>
```

### Mini

```vue
<mdc-fab
  icon="favorite"
  label="Favorite"
  mini
/>
```

### Extended

```vue
<mdc-fab
  icon="add"
  label="Create"
  extended
/>
```

### Link

```vue
<mdc-fab
  tag="a"
  to="https://www.google.com"
  icon="add"
  label="Create"
  extended
/>
```

You can also use the tag name of a Vue component, like `router-link` or `nuxt-link`, and the `to` prop will be passed to the component.

```vue
<mdc-fab
  tag="router-link"
  to="/create"
  icon="add"
  label="Create"
  extended
/>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` |
| `exited` | `boolean` | `false` | Set to `true` to animate the FAB out of view. Set to `false` to return the FAB to view. |
| `extended` | `boolean` | `false` | Set to `true` to modify the FAB to a wider size, which includes a text label. |
| `rippleDisabled` | `boolean` | `false` | Disable the ripple. |
| `icon` | `string` | `''` | The icon to be rendered. |
| `label` | `string` | `null` | The FAB's label. If the `extended` prop is set to true, the label will be rendered. Otherwise, the `aria-label` attribute will be set using this value. |
| `mini` | `boolean` | `false` | Set to `true` to modify the FAB to a smaller size. |
| `tag` | `string` | `'button'` | The tag name of the component's root element. This could be the tag name of a Vue component or basic `<a>` element. |
