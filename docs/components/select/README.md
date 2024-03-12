---
title: Select
description: Select components provide Material Design single-option select menus.
canonicalUrl: /components/select/
---

# Select

[Material Components Web docs](https://github.com/material-components/material-components-web/tree/v10.0.0/packages/mdc-select#readme)

Select components provide Material Design single-option select menus. Select components are fully accessible and support RTL rendering.

<v-select-demo1 />

## Styles

```scss
@use "@material/list/mdc-list";
@use "@material/menu-surface/mdc-menu-surface";
@use "@material/menu/mdc-menu";
@use "@material/select/styles";
```

## Usage

### Filled

```vue
<mdc-select
  label="Pick a Food Group"
  :items="[
    {text: '', value: ''},
    {text: 'Bread, Cereal, Rice, and Pasta', value: 'grains'},
    {text: 'Vegetables', value: 'vegetables'},
    {text: 'Fruit', value: 'fruit'}
  ]"
  has-typeahead
  filled
/>
```

### Outlined

```vue
<mdc-select
  label="Pick a Food Group"
  :items="[
    {text: '', value: ''},
    {text: 'Bread, Cereal, Rice, and Pasta', value: 'grains'},
    {text: 'Vegetables', value: 'vegetables'},
    {text: 'Fruit', value: 'fruit'}
  ]"
  has-typeahead
  outlined
/>
```

## `mdc-select`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` |
| `filled` | `boolean` | `false` | Set to `true` for the filled select variant. |
| `hasTypeahead` | `boolean` | `false` | Set to `true` to activate typeahead. |
| `items` | `{text: string, value: string}[]` | `[]` |
| `label` | `string` | `''` |
| `outlined` | `boolean` | `false` | Set to `true` for the outlined select variant. |
| `required` | `boolean` | `false` |
| `rippleDisabled`| `boolean` | `false` | Disable the ripple effect |
| `selectedIndex` | `number` | `-1` |
| `value` | `string` | `''` |

## Style customization

### Sass mixins

Mixins should be included in the context of a custom class applied to the component's root element, e.g. `.my-select`.

| Mixin | Description |
| ----- | ----------- |
| `ink-color($state)` | Customizes the color of the selected item displayed in the select. Accepts a Map for `default` and `disabled` states. |
| `container-fill-color($state)` | Customizes the background color of the select. Accepts a Map for `default` and `disabled` states. |
| `dropdown-icon-color($state)` | Customizes the dropdown icon color of the select. Accepts a Map for `default`, `hover`, `focus`, and `disabled` states. |
| `label-color($state)` | Customizes the label color of the select. Accepts a Map for `default`, `hover`, `focus`, and `disabled` states. |
| `label-floating-color($state)` | Customizes the label color of the select when the label is floating. Accepts a Map for `default` and `hover` states. |
| `bottom-line-color($state)` | Customizes the color of the bottom line of the select. Accepts a Map for `default`, `hover`, `focus`, and `disabled` states. |
| `filled-shape-radius($radius, $density-scale, $rtl-reflexive)` | Sets rounded shape to filled select variant with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to false. |
| `outline-color($state)` | Customizes the color of the notched outline. Accepts a Map for `default`, `hover`, `focus`, and `disabled` states. |
| `outline-shape-radius($radius, $density-scale, $rtl-reflexive)` | Sets the border radius of the outlined select variant. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to false. |
| `filled-density($density-scale)` | Sets density scale for the filled select variant (Excluding filled select with leading icon). |
| `filled-with-leading-icon-density($density-scale)` | Sets density scale for filled select with leading icon. |
| `outlined-density($density-scale)` | Sets density scale for outlined select (Excluding outlined select with leading icon). |
| `outlined-with-leading-icon-density($density-scale)` | Sets density scale for outlined select with leading icon. |
| `filled-height($height)` | Sets height of the filled select variant (Excluding filled select with leading icon). |
| `filled-with-leading-icon-height($height)` | Sets height of filled select with leading icon variant. |
| `outlined-height($height)` | Sets height of outlined select variant (Excluding outlined select with leading icon). |
| `outlined-with-leading-icon-height($height)` | Sets height of outlined select with leading icon variant. |
| `variable-width($min-width)` | Sets the select behavior to change width dynamically based on content. |
