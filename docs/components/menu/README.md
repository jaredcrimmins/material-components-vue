---
title: Menu
---

# Menu

<v-menu-demo1 />

## Usage

```vue
<mdc-menu>
  <mdc-menu-item>A Menu Item</mdc-menu-item>
  <mdc-menu-item>Another Menu Item</mdc-menu-item>
</mdc-menu>
```

## mdc-menu

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `anchorCorner` | `number` | `0` | Sets the corner that the menu will be anchored to. |
| `anchorElement` | `string | Element | null` | `null` |
| `defaultFocusState` | `number` | `1` | Use to set default focus state that will be focused every time when menu is opened. |
| `fixedPosition` | `boolean` | `false` | Set to `true` to used fixed positioning when being displayed. |
| `fullWidth` | `boolean` | `false` | Set to `true` to have the menu match the width of its parent anchor. |
| `hasTypeahead` | `boolean` | `true` |  |
| `hoisted` | `boolean` | `false` | Set to `true` to hoist the menu to the body so that the offsets are calculated relative to the page and not the anchor. |
| `quickOpen` | `boolean` | `false` | Set to `true` to open and close without animation. |
| `twoLine` | `boolean` | `false` |
| `value` | `boolean` | `false` |
| `wrapFocus` | `boolean` | `false` | Set to `true` to allow the up arrow on the first element to focus the last element of the menu and vice versa. |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-menu-anchor

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-menu-divider

This component does not accept any props or slots.

## mdc-menu-item

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `rippleDisabled` | `boolean` | `false` | Set to `true` to disable the ripple effect. |
| `value` | `string` |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-menu-selection-group

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `icon` | `string` | `'check'` |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |
