---
title: Ripple
---

# Ripple

<v-ripple-demo1 />

## Usage

### Basic

```html
<mdc-ripple>Click here!</mdc-ripple>
```

### Using `root` scoped slot

```html
<mdc-ripple>
  <template #root="rootProps">
    <div
      :class="rootProps.cssClass"
      :style="rootProps.style"
      @:blur="rootProps.on.blur"
      @:focus="rootProps.on.focus"
    >
      Click here!
    </div>
  </template>
</mdc-ripple>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` | Disable the ripple |
| `standalone` | `boolean` | `true` | Assigns the `mdc-ripple-surface` class to the component's root element. |
| `tag` | `string` | `'div'` | The tag name of the component's root element. |
| `unbounded` | `boolean` | `false` |

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` |             |
| `root`    | Scoped slot |

### `root` scoped slot props:

```typescript
{
  /**
   * CSS classes to be bound to the element to be used as the component's root.
   **/
  cssClass: {[key: string]: boolean},

  /**
   * Events and their handlers to be bound to the element to be used as the
   * component's root.
   **/
  on: {
    blur: () => void;
    focus: () => void;
  },

  /**
   * Key-value pairs of style properties and their values to be bound to the
   * element to be used as the component's root.
   **/
  style: {[key: string]: string}
}
```
