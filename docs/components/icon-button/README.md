---
title: Icon Button
---

# Icon Button

<v-icon-button-demo1 />

## Usage

### Basic

```vue
<mdc-icon-button icon="favorite" />
```

### Icon button toggle

```vue
<mdc-icon-button
  icon="favorite_border"
  on-icon="favorite"
  toggleable
/>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` | Disable the button |
| `icon` | `string` | `''` | The icon rendered. When `toggleable` is set to `true`, this is the icon rendered when the button is in the "off" state. |
| `iconVariant` | `'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone'` | `'filled'` | Controls the appearance of the rendered icon. |
| `rippleDisabled` | `boolean` | `false` | Disable the ripple |
| `tag` | `string` | `'button'` | The tag name of the component's root element. This could be the tag name of a Vue component or basic `<a>` element. |
| `to` | `string` | `null` | If the `tag` prop is set to `a`, the `to` prop is used as the `href` attribute on the component's root element. Otherwise, the `to` prop is based on as a prop to the component's root element — this is useful for Vue components like `<router-link>` and `<nuxt-link>`. |
| `toggleable` | `boolean` | `false` | Set to `true` to allow the button to be switched between "on" and "off" states. |
| `onIcon` | `string` | `''` | The icon rendered when the button is in the "on" state. Only used if `toggleable` is set to `true`. |

## Slots

| Name        | Description |
| ----------- | ------------|
| `default`   |             |
| `icon`    | Scoped slot |
| `onIcon`  | Scoped slot |

### `icon` scoped slot props:

```typescript
{
  /**
   * CSS class to be bound to the element to be used as the component's root.
   **/
  staticClass: string,

  props: {
    /**
     * Pass this prop option to the `mdc-material-icon` component in this
     * scoped slot, so that the icon variant matches the `mdc-icon-button`.
     **/
    iconVariant: 'outlined' | 'filled' | 'rounded' | 'sharp' | 'two-tone'
  }
}
```

### `onIcon` scoped slot props:

```typescript
{
  /**
   * CSS class to be bound to the element to be used as the component's root.
   **/
  staticClass: string,

  props: {
    /**
     * Pass this prop option to the `mdc-material-icon` component in this
     * scoped slot, so that the icon variant matches the `mdc-icon-button`.
     **/
    iconVariant: 'outlined' | 'filled' | 'rounded' | 'sharp' | 'two-tone'
  }
}
```
