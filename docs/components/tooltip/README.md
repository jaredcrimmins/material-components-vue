---
title: Tooltip
---

# Tooltip

<v-tooltip-demo1 />

## Usage

### Basic

```html
<button data-tooltip-id="tooltip1">
  Tooltip anchor
</button>

<mdc-tooltip id="tooltip1">
  lorem ipsum dolor
</mdc-tooltip>
```

### Rich tooltip

```html
<mdc-tooltip-wrapper #default="defaultProps">
  <button
    data-tooltip-id="tooltip2"
    v-bind="defaultProps.attrs"
  >
    Rich tooltip anchor
  </button>
  <mdc-tooltip id="tooltip2">
    <template>
      <mdc-tooltip-title>Lorem Ipsum</mdc-tooltip-title>
      <mdc-tooltip-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
        aliquam sit amet sit amet eros.
      </mdc-tooltip-content>
    </template>
  </mdc-tooltip>
</mdc-tooltip-wrapper>
```

### Rich tooltip with interactive content

```html
<mdc-tooltip-wrapper #default="defaultProps">
  <button
    data-tooltip-id="tooltip3"
    v-bind="defaultProps.attrs"
  >
    Rich tooltip with interactive content anchor
  </button>
  <mdc-tooltip id="tooltip3">
    <template>
      <mdc-tooltip-title>Lorem Ipsum</mdc-tooltip-title>
      <mdc-tooltip-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
        aliquam sit amet sit amet eros.

        <mdc-tooltip-content-link to="google.com">
          link
        </mdc-tooltip-content-link>
      </mdc-tooltip-content>
      <mdc-tooltip-action>
        <template #root="rootProps">
          <mdc-button
            :class="rootProps.cssClass"
            v-bind="rootProps.attrs"
          >
            action
          </mdc-button>
        </template>
      </mdc-tooltip-action>
    </template>
  </mdc-tooltip>
</mdc-tooltip-wrapper>
```

### Persistent rich tooltip with interactive content anchor

```html
<mdc-tooltip-wrapper #default="defaultProps">
  <button
    data-tooltip-id="tooltip4"
    v-bind="defaultProps.attrs"
  >
    Persistent rich tooltip with interactive content anchor
  </button>
  <mdc-tooltip
    id="tooltip4"
    persistent
  >
    <template>
      <mdc-tooltip-title>Lorem Ipsum</mdc-tooltip-title>
      <mdc-tooltip-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
        aliquam sit amet sit amet eros.

        <mdc-tooltip-content-link to="google.com">
          link
        </mdc-tooltip-content-link>
      </mdc-tooltip-content>
      <mdc-tooltip-rich-actions>
        <mdc-tooltip-action>
          <template #root="rootProps">
            <mdc-button
              :class="rootProps.cssClass"
              v-bind="rootProps.attrs"
            >
              action
            </mdc-button>
          </template>
        </mdc-tooltip-action>
      </mdc-tooltip-rich-actions>
    </template>
  </mdc-tooltip>
</mdc-tooltip-wrapper>
```

## mdc-tooltip

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `anchorBoundaryType` | `0 | 1` | `null` | Set to `0` to specify the anchor element is bounded (element has an identifiable boundary such as a button), or to `1` to specify the anchor element is unbounded (element does not have a visually declared boundary such as a text link). |
| `id` | `string` | `` `__mdc-tooltip-${number}` `` |
| `persistent` | `boolean` | `false` | Set to `true` to toggle the tooltip's visibility on clicks and enter/space bar keystrokes on the anchor element. |
| `xPosition` | `0 | 1 | 2 | 3` | `0` | Specify how the tooltip should be aligned with the anchor element on the x-axis. Set to `0` for detected; `1` for start; `2` for center; and `3` for end. |
| `yPosition` | `0 | 1 | 2` | `0` | Specify how the tooltip should be aligned with the anchor element on the y-axis. Set to `0` for detected; `1` for above; and `2` for below. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## mdc-tooltip-action

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `tag` | `string` | `null` | Set to `0` to specify the anchor element is bounded (element has an identifiable boundary such as a button), or to `1` to specify the anchor element is unbounded (element does not have a visually declared boundary such as a text link). |
| `to` | `string` | `null` | If the `tag` prop is set to `a`, the `to` prop is used as the `href` attribute on the component's root element. Otherwise, the `to` prop is provided as a prop to the component's root element — this is useful for Vue components like `<router-link>` and `<nuxt-link>`. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |
| `root` | Scoped slot. Replaces root element. |

#### `root` scoped slot props:

```typescript
{
  /**
   * Key-value pairs of attribute names and their values to be bound to the
   * tooltip anchor element.
   **/
  attrs: {[key: string]: string},

  /**
   * CSS classes to be bound to the element to be used as the component's root.
   **/
  cssClass: {[key: string]: boolean}
}
```

## mdc-tooltip-content

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## mdc-tooltip-content-link

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `tag` | `string` | `'a'` | The tag name of the component's root element. This could be the tag name of a Vue component or basic `<a>` element. |
| `to` | `string` | `null` | If the `tag` prop is set to `a`, the `to` prop is used as the `href` attribute on the component's root element. Otherwise, the `to` prop is provided as a prop to the component's root element — this is useful for Vue components like `<router-link>` and `<nuxt-link>`. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## mdc-tooltip-rich-actions

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## mdc-tooltip-title

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `tag` | `string` | `'h2'` | The tag name of the component's root element. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## mdc-tooltip-wrapper

### Slots

| Name | Description |
| ---- | ----------- |
| `default` | Scoped slot |

#### `default` scoped slot props:

```typescript
{
  /**
   * Key-value pairs of attribute names and their values to be bound to the
   * tooltip anchor element.
   **/
  attrs: {[key: string]: string}
}
```
