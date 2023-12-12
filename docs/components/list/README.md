---
title: List
---

# List

<v-list-demo1 />

## Usage

### Single-line list

```vue
<mdc-list>
  <mdc-list-item>Line item</mdc-list-item>
  <mdc-list-item>Line item</mdc-list-item>
  <mdc-list-item>Line item</mdc-list-item>
</mdc-list>
```

### Two-line list

```vue
<mdc-list two-line>
  <mdc-list-item
    primary-text="Line item"
    secondary-text="Secondary text"
  />
  <mdc-list-item
    primary-text="Line item"
    secondary-text="Secondary text"
  />
  <mdc-list-item
    primary-text="Line item"
    secondary-text="Secondary text"
  />
</mdc-list>
```

### List Groups

```vue
<mdc-list-group>
  <mdc-list
    v-for="listNum in 2"
    :key="listNum"
  >
    <mdc-list-item
      v-for="itemNum in 3"
      :key="itemNum"
    >
      Item {{ itemNum }} - List {{ listNum }}
    </mdc-list-item>
  </mdc-list>
</mdc-list-group>
```

### List Dividers

```vue
<mdc-list>
  <mdc-list-item>Item 1 - Division 1</mdc-list-item>
  <mdc-list-item>Item 2 - Division 1</mdc-list-item>
  <mdc-list-divider />
  <mdc-list-item>Item 1 - Division 2</mdc-list-item>
  <mdc-list-item>Item 2 - Division 2</mdc-list-item>
</mdc-list>
```

### Single Selection List

```vue
<mdc-list single-selection>
  <mdc-list-item
    v-for="num in 4"
    :key="num"
  >
    Single-line item {{ num }}
  </mdc-list-item>
</mdc-list>
```

### List with radio group

```vue
<mdc-list radio-group>
  <mdc-list-item
    v-for="num in 3"
    :key="num"
  >
    Option {{ num }}
    <template v-slot:radio="{id, tabindex}">
      <mdc-radio
        :id="id"
        name="radio-group-demo"
        :tabindex="tabindex"
        :value="num"
      />
    </template>
  </mdc-list-item>
</mdc-list>
```

```vue
<mdc-list radio-group>
  <mdc-list-item
    v-for="num in 3"
    :key="num"
  >
    Option {{ num }}
    <template v-slot:checkbox="{id, tabindex}">
      <mdc-checkbox
        :id="id"
        name="checkbox-items-demo"
        :tabindex="tabindex"
        :value="num"
      />
    </template>
  </mdc-list-item>
</mdc-list>
```

## mdc-list

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `hasTypeahead` | `boolean` | `false` | Set to `true` to enable typeahead on the list. |
| `selectedIndex` | `number | number[] | null` | `null` | Sets the selection state to given index or list of indexes if it is a checkbox-based list. |
| `singleSelection` | `boolean` | `false` | Set to `true` to be a selection list. Enables the `enter` and `space` keys for selecting/deselecting a list item. |
| `twoLine` | `boolean` | `false` | Set to `true` to style list with two lines. |
| `wrapFocus` | `boolean` | `false` | Set to `true` to allow the up arrow on the first element to focus the last element of the list and vice versa. |
| `vertical` | `boolean` | `true` | Sets the orientation of the list, causing the keys used for navigation to change. `true` results in the Up/Down arrow keys being used. `false` results in the Left/Right arrow keys being used. |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-dialog-actions

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-list-divider

This component does not accept any props or slots.

## mdc-list-group

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-list-item

### Slots

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `primaryText` | `string` | `''` | For two line lists, sets the primary text. |
| `rippleDisabled` | `boolean` | `false` | Disables the ripple effect. |
| `secondaryText` | `string` | `''` | For two line lists, sets the secondary text. |
| `value` | `string` | `''` |

| Name | Description |
| ---- | ------------|
| `default` |
| `checkbox` | For checkbox-based lists, use this slot for the `mdc-checkbox` component. |
| `radio` | For radio-based lists, use this slot of the `mdc-radio` component. |
