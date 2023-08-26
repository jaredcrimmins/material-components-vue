---
title: Card
---

# Card

<v-card-demo1 />

## Usage

```vue
<mdc-card>
  <mdc-card-primary-action>
    <mdc-card-media
      src="https://freesvg.org/storage/zip/blog/Pizza_Pepperoni.svg"
      aspect-ratio="square"
    >
      Title
    </mdc-card-media>
  </mdc-card-primary-action>
  <mdc-card-actions>
    <mdc-card-action-buttons>
      <mdc-card-button>Action 1</mdc-card-button>
      <mdc-card-button>Action 2</mdc-card-button>
    </mdc-card-action-buttons>
    <mdc-card-action-icons>
      <mdc-card-icon-button icon="share" />
      <mdc-card-icon-button icon="more_vert" />
    </mdc-card-action-icons>
  </mdc-card-actions>
</mdc-card>
```

## mdc-card

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `outlined` | `boolean` | `false` |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-card-action-buttons

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-card-action-icons

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-card-actions

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `fullBleed` | `boolean` | `false` | To have a single action button take up the entire width of the action row, set to `true`. |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-card-button

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` | Disable the button |
| `outlined` | `boolean` | `false` |
| `raised` | `string` | `'div'` |
| `rippleDisabled` | `boolean` | `false` | Disable the ripple |
| `tag` | `string` | `'button'` | The tag name of the component's root element. This could be the tag name of a Vue component or basic `<a>` element. |
| `to` | `string` | `null` | If the `tag` prop is set to `a`, the `to` prop is used as the `href` attribute on the component's root element. Otherwise, the `to` prop is based on as a prop to the component's root element — this is useful for Vue components like `<router-link>` and `<nuxt-link>`. |
| `unelevated` | `boolean` | `false` |

### Slots

| Name        | Description |
| ----------- | ------------|
| `default`   |             |
| `append`    | Slot for icon at the start of the button. |
| `trailing`  | Slot for icon at the end of the button. |

## mdc-card-icon-button

### Props

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

## mdc-card-media

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `aspectRatio` | `'16:9' | 'square'` | `''` | Automatically scale the media's height to maintain a 16:9 or square aspect ratio.  |
| `src` | `string` | `''` | The image URL. |

### Slots

| Name        | Description |
| ----------- | ------------|
| `default`   | For displaying a title or icon on top of the `background-image`. |

## mdc-card-primary-action

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `rippleDisabled` | `boolean` | `false` | Disable the ripple |

### Slots

| Name        | Description |
| ----------- | ------------|
| `default`   |
