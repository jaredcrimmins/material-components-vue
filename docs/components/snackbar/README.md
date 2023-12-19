---
title: Snackbar
---

# Snackbar

<v-snackbar-demo1 />

## Usage

```vue
<mdc-snackbar label="Can't send photo. Retry in 5 seconds." close-on-escape>
  <template #action="{staticClass, onClick}">
    <mdc-button
      :class="staticClass"
      @click="onClick"
    >
      Retry
    </mdc-button>
  </template>
</mdc-snackbar>
```

## mdc-snackbar

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `closeOnEscape` | `boolean` | `false` | Set to `true` to close the snackbar when it is focused and the user presses the <kbd>ESC</kbd> key. |
| `dismissButton` | `boolean` | `false` | Set to `true` to display a dismiss button. |
| `label` | `string` | `''` |
| `leading` | `boolean` | `false` | On tablet and desktop only, the snackbar can optionally be displayed on the *leading* edge of the screen (the left side in LTR, or the right side in RTL). |
| `stacked` | `boolean` | `false` | Set to `true` to position the action button/icon below the label instead of alongside it. |
| `timeoutMs` | `number` | `0` | Sets the automatic dismiss timeout in milliseconds. Value must be between `4000` and `10000` (or `-1` to disable the timeout completely) or an error will be thrown.
| `value` | `boolean` | `false` |

### Slots

| Name | Description |
| ---- | ------------|
| `action` | Scoped slot |

```typescript
{
  /**
   * CSS class to be bound to the element to be used as the component's root.
   **/
  staticClass: string,

  /**
   * Add a `click` event listener to the action button with this function as
   * the handler.
   */
  onClick: (event: MouseEvent) => void;
}
```
