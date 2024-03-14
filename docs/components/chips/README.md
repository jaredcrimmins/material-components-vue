---
title: Chips
description: Chips are compact elements that allow users to enter information, select a choice, filter content, or trigger an action.
canonicalUrl: /components/chips/
---

# Chips

[Material Components Web docs](https://github.com/material-components/material-components-web/tree/v10.0.0/packages/mdc-chips#readme)

Chips are compact elements that allow users to enter information, select a choice, filter content, or trigger an action.

<v-chips-demo1 />

## Styles

```scss
@use "@material/chips/mdc-chips";
```

## Usage

### Basic

```vue
<mdc-chip-set>
  <mdc-chip>Chip One</mdc-chip>
  <mdc-chip>Chip Two</mdc-chip>
  <mdc-chip>Chip Three</mdc-chip>
  <mdc-chip>Chip Four</mdc-chip>
</mdc-chip-set>
```

### Leading and Trailing Icons

You can optionally add a leading icon (i.e. thumbnail) and/or a trailing "remove" icon to a chip.

#### Leading icon

```vue
<mdc-chip leading-icon="event">
  Add to calendar
</mdc-chip>
```

#### Trailing icon

```vue
<mdc-chip trailing-icon="event">
  Add to calendar
</mdc-chip>
```

### Choice Chips

Choice chips are a variant of chips which allow single selection from a set of options. To define a set of chips as choice chips, set the `choice` prop to `true` on the `mdc-chip-set` component.

```vue
<mdc-chip-set choice>
  <mdc-chip selected>
    Chip One
  </mdc-chip>
  <mdc-chip>Chip Two</mdc-chip>
</mdc-chip-set>
```

### Filter Chips

Filter chips are a variant of chips which allow multiple selection from a set of options. To define a set of chips as filter chips, set the `filter` prop to `true` on the `mdc-chip-set` component. When a filter chip is selected, a checkmark appears as the leading icon. If the chip already has a leading icon, the checkmark replaces it.

```vue
<mdc-chip-set filter>
  <mdc-chip>Filterable content</mdc-chip>
</mdc-chip-set>
```

### Pre-selected

To display a pre-selected filter or choice chip, set the `selected` prop to `true` on the desired `mdc-chip` component.

```vue
<mdc-chip-set choice>
  <mdc-chip selected>
    Chip One
  </mdc-chip>
  <mdc-chip>Chip Two</mdc-chip>
</mdc-chip-set>
```


## `mdc-chip`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | `string` | Automatically generated unique value. | The HTML `id` attribute. |
| `rippleDisabled` | `boolean` | `false` | Disable the ripple |
| `leadingIcon` | `string` | `null` | The chip's leading icon to be render. |
| `hiddenLeadingIcon` | `boolean` | `false` | Set to `true` to hide the leading icon in a filter chip set when the chip is selected. |
| `trailingAction` | `boolean` | `true` |

### Native Events

| Name | `event.detail` | Description |
| ---- | -------------- | ----------- |
| `MDCChip:interaction` | `{chipId: string}` | Indicates the chip was interacted with (via click/tap or Enter key) |
| `MDCChip:selection` | `{chipId: string, selected: boolean}` | Indicates the chip's selection state has changed (for choice/filter chips) |
| `MDCChip:removal` | `{chipId: string, removedAnnouncement: string \| null}` | 
| `MDCChip:trailingIconInteraction` | `{chipId: string}` | Indicates the chip's trailing icon was interacted with (via click/tap or Enter key) |
| `MDCChip:navigation` | `{chipId: string, key: string, source: FocusSource}` | Indicates a navigation event has occurred on a chip |

## `mdc-chip-set`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `choice` | `boolean` | `false` | Set to `true` for the choice chip set variant. |
| `filter` | `boolean` | `false` | Set to `true` for the filter chip set variant. |
| `input` | `boolean` | `false` | Set to `true` for the input chip set variant. |
| `value` | `boolean` | `number[]` | Indexes of the selected chips within the chip set. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## Style customization

### Sass Mixins

| Mixin | Description |
| ----- | ----------- |
| `set-spacing($gap-size)` | Customizes the amount of space between each chip in the set |
| `shape-radius($radius, $rtl-reflexive)` | Sets the rounded shape to chip with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to false. |
| `fill-color-accessible($color)` | Customizes the background fill color for a chip, and updates the chip's ink, icon and ripple colors to meet accessibility standards |
| `fill-color($color)` | Customizes the background fill color for a chip |
| `ink-color($color)` | Customizes the text ink color for a chip, and updates the chip's ripple color to match |
| `selected-ink-color($color)` | Customizes text ink and ripple color of a chip in the _selected_ state |
| `outline($width, $style, $color)` | Customizes the outline properties for a chip |
| `outline-width($width, $horizontal-padding)` | Customizes the outline width for a chip. `$horizontal-padding` is only required in cases where `horizontal-padding` is also included with a custom value |
| `outline-style($style)` | Customizes the outline style for a chip |
| `outline-color($color)` | Customizes the outline color for a chip |
| `height($height)` | Customizes the height for a chip |
| `horizontal-padding($padding)` | Customizes the horizontal padding for a chip |
| `leading-icon-color($color, $opacity)` | Customizes the color of a leading icon in a chip, optionally customizes opacity |
| `trailing-icon-color($color, $opacity, $hover-opacity, $focus-opacity)` | Customizes the color of a trailing icon in a chip, optionally customizes regular/hover/focus opacities |
| `leading-icon-size($size)` | Customizes the size of a leading icon in a chip |
| `trailing-icon-size($size)` | Customizes the size of a trailing icon in a chip |
| `leading-icon-margin($left-margin, $right-margin)` | Customizes the margin of a leading icon in a chip |
| `trailing-icon-margin($left-margin, $right-margin)` | Customizes the margin of a trailing icon in a chip |
| `elevation-transition()` | Adds a MDC elevation transition to the chip. This should be used instead of setting transition with `mdc-elevation-transition-value()` directly when a box shadow transition is desired for a chip |
| `density($density-scale)` | Sets density scale for chip. Supported density scales  are `-2`, `-1` and `0` (default). |

> _NOTE_: `mdc-chip-set-spacing` also sets the amount of space between a chip and the edge of the set it's contained in.