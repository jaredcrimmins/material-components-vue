---
title: Text Field
description: Text fields allow users to enter text into a UI. They typically appear in forms and dialogs.
canonicalUrl: /components/text-field/
---

# Text Field

[Material Components Web docs](https://github.com/material-components/material-components-web/tree/v10.0.0/packages/mdc-textfield#readme)

Text fields allow users to enter text into a UI. They typically appear in forms and dialogs.

<v-text-field-demo1 />

## Styles

```scss
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";

@include textfield.core-styles;
```

## Usage

### Filled

Filled text fields have more visual emphasis than outlined text fields, making them stand out when surrounded by other content and components.

```vue
<mdc-text-field
  label="Hint text"
  filled
/>
```

### Outlined

Outlined text fields have less visual emphasis than filled text fields. When they appear in places like forms, where many text fields are placed together, their reduced emphasis helps simplify the layout.

```vue
<mdc-text-field
  label="Hint text"
  outlined
/>
```

## `mdc-text-field`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` |
| `filled` | `boolean` | `false` | Set to `true` for the filled text field variant. |
| `label` | `string` | `''` | The text field's label. |
| `outlined` | `boolean` | `false` | Set to `true` for the outlined text field variant. |
| `requiredAsterisk` | `boolean` | `true` |
| `rules` | `((value: string) => boolean | string)[]` | `false` | Set to `true` for the outlined select variant. |
| `useNativeValidation` | `boolean` | `false` |
| `autocomplete` | `string` | `null` | The HTML `autocomplete` attribute. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) |
| `maxlength` | `number` | `null` | The HTML `maxlength` attribute. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength) |
| `name` | `string` | `null` | Name of the element. For example, used to identify the fields in form submits. |
| `placeholder` | `string` | `null` | The HTML `placeholder` attribute. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/placeholder) |
| `readonly` | `boolean` | `false` | The HTML `readonly` attribute. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly) |
| `required` | `boolean` | `false` | The HTML `required` attribute. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required) |
| `size` | `number` | `null` | The HTML `size` attribute. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size) |
| `spellcheck` | `string` | `null` | The HTML `spellcheck` attribute. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck) |
| `type` | `string` | `null` | The HTML `type` attribute. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) |
| `value` | `string` | `null` |

### Events

| Name | Type | Description |
| `input` | `string` | The value of the native input element. Fires when the value changes. |

## Style customization

### Sass mixins

To customize the colors of any part of the text-field, use the following mixins. We recommend you apply
these mixins within CSS selectors like `.foo-text-field:not(.mdc-text-field--focused)` to select your unfocused text fields,
and `.foo-text-field.mdc-text-field--focused` to select your focused text-fields. To change the invalid state of your text fields,
apply these mixins with CSS selectors such as `.foo-text-field.mdc-text-field--invalid`.

> _NOTE_: the `mdc-line-ripple-color` mixin should be applied from the not focused class `foo-text-field:not(.mdc-text-field--focused)`).

#### Mixins for all text fields

Mixin | Description
--- | ---
`ink-color($color)` | Customizes the color of the text entered into an enabled text field.
`placeholder-color($color)` | Customizes the color of the placeholder in an enabled text field.
`disabled-ink-color($color)` | Customizes the color of the entered text in a disabled text field.
`disabled-placeholder-color($color)` | Customizes the color of the placeholder in a disabled text field.
`label-color($color)` | Customizes the text color of the label in an enabled text field.
`disabled-label-color($color)` | Customizes the text color of the label in a disabled text field.
`caret-color($color)` | Customizes the color of the cursor caret of the text field.
`prefix-color($color)` | Customizes the color of the prefix text of an enabled text field.
`disabled-prefix-color($color)` | Customizes the color of the prefix text of a disabled text field.
`suffix-color($color)` | Customizes the color of the suffix text of an enabled text field.
`disabled-suffix-color($color)` | Customizes the color of the suffix text of a disabled text field.
`floating-label-float-transition($duration-ms, $timing-function)` | Customizes the duration and optional timing function for the floating label's "float" transition.

#### Mixins for filled text field

| Mixin | Description |
| ----- | ----------- |
| `fill-color($color)` | Customizes the background color of the text field or textarea when enabled. |
| `disabled-fill-color($color)` | Customizes the background color of the text field or textarea when disabled. |
| `shape-radius($radius, $rtl-reflexive)` | Sets rounded shape to boxed text field variant with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to false. |
| `bottom-line-color($color)` | Customizes the text field bottom line color. |
| `hover-bottom-line-color($color)` | Customizes the hover text field bottom line color. |
| `disabled-bottom-line-color($color)` | Customizes the disabled text field bottom line color. |
| `line-ripple-color($color)` | Customizes the color of the default line ripple of the text field. |
| `density($density-scale)` | Sets density scale for default text field variant. Supported density scale values `-4`, `-3`, `-2`, `-1`, `0`. |
| `height($height)` | Sets height of default text field variant. |

#### Mixins for outlined text field

| Mixin | Description |
| ----- | ----------- |
| `focused-outline-color($color)` | Customizes the outline border color when the text field or textarea is focused. |
| `hover-outline-color($color)` | Customizes the outline border color when the text field or textarea is hovered. |
| `disabled-outline-color($color)` | Customizes the outline border color when the text field or textarea is disabled. |
| `outline-color($color)` | Customizes the border color of the outlined text field or textarea. |
| `outline-shape-radius($radius, $rtl-reflexive)` | Sets rounded shape to outlined text field variant with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to false. |
| `outlined-density($density-scale)` | Sets density scale for outlined text field (Excluding outlined text field with leading icon). Supported density scale values `-4`, `-3`, `-2`, `-1`, `0`. |
| `outlined-height($height)` | Sets height of outlined text field variant (Excluding outlined text field with leading icon). |
| `outlined-with-leading-icon-density($density-scale)` | Sets density scale for outlined text field with leading icon. Supported density scale values `-4`, `-3`, `-2`, `-1`, `0`. |
| `outlined-with-leading-icon-height($height)` | Sets height of outlined text field with leading icon variant. |
