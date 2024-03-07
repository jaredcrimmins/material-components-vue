---
title: Top App Bar
---

# Top App Bar

[Material Components Web docs](https://github.com/material-components/material-components-web/tree/v10.0.0/packages/mdc-top-app-bar#readme)

<v-top-app-bar-demo1 />

## Styles

```scss
@use "@material/icon-button";
@use "@material/top-app-bar/mdc-top-app-bar";

@include icon-button.core-styles;
```

## Usage

### Regular

The top app bar provides content and actions related to the current screen. It's used for branding, screen titles, navigation, and actions.

```vue
<mdc-top-app-bar
  title="Page title"
  navigation-icon
>
  <template #actions>
    <mdc-top-app-bar-action-item
      icon="favorite"
      aria-label="Favorite"
    />
    <mdc-top-app-bar-action-item
      icon="search"
      aria-label="Search"
    />
    <mdc-top-app-bar-action-item
      icon="more_vert"
      aria-label="Options"
    />
  </template>
</mdc-top-app-bar>
<main class="mdc-top-app-bar--fixed-adjust">
  App content
</main>
```

### Short

Short top app bars are top app bars that can collapse to the navigation icon side when scrolled.

**Note: Short top app bars should be used with no more than 1 action item.**

```vue
<mdc-top-app-bar
  title="Title"
  navigation-icon
  prominent
>
  <template #actions>
    <mdc-top-app-bar-action-item
      icon="favorite"
      aria-label="Favorite"
    />
    <mdc-top-app-bar-action-item
      icon="search"
      aria-label="Search"
    />
    <mdc-top-app-bar-action-item
      icon="more_vert"
      aria-label="Options"
    />
  </template>
</mdc-top-app-bar>
<main class="mdc-top-app-bar--prominent-fixed-adjust">
  App content
</main>
```

### Short — togglable collapse

Short top app bars can be programmatically configured to appear collapsed by setting the `shortCollapsed` prop to `true`.

```vue
<mdc-top-app-bar
  title="Title"
  navigation-icon
  shortCollapsed
>
  <template #actions>
    <mdc-top-app-bar-action-item
      icon="favorite"
      aria-label="Favorite"
    />
    <mdc-top-app-bar-action-item
      icon="search"
      aria-label="Search"
    />
    <mdc-top-app-bar-action-item
      icon="more_vert"
      aria-label="Options"
    />
  </template>
</mdc-top-app-bar>
<main class="mdc-top-app-bar--prominent-fixed-adjust">
  App content
</main>
```

### Fixed

Fixed top app bars stay at the top of the page and elevate above the content when scrolled.

```vue
<mdc-top-app-bar
  title="Title"
  navigation-icon
  fixed
>
  <template #actions>
    <mdc-top-app-bar-action-item
      icon="favorite"
      aria-label="Favorite"
    />
    <mdc-top-app-bar-action-item
      icon="search"
      aria-label="Search"
    />
    <mdc-top-app-bar-action-item
      icon="more_vert"
      aria-label="Options"
    />
  </template>
</mdc-top-app-bar>
<main class="mdc-top-app-bar--prominent-fixed-adjust">
  App content
</main>
```

### Prominent

The prominent top app bar is taller.

```vue
<mdc-top-app-bar
  title="Title"
  navigation-icon
  prominent
>
  <template #actions>
    <mdc-top-app-bar-action-item
      icon="favorite"
      aria-label="Favorite"
    />
    <mdc-top-app-bar-action-item
      icon="search"
      aria-label="Search"
    />
    <mdc-top-app-bar-action-item
      icon="more_vert"
      aria-label="Options"
    />
  </template>
</mdc-top-app-bar>
<main class="mdc-top-app-bar--fixed-adjust">
  App content
</main>
```

### Dense

The dense top app bar is shorter.

```vue
<mdc-top-app-bar
  title="Title"
  navigation-icon
  dense
>
  <template #actions>
    <mdc-top-app-bar-action-item
      icon="favorite"
      aria-label="Favorite"
    />
    <mdc-top-app-bar-action-item
      icon="search"
      aria-label="Search"
    />
    <mdc-top-app-bar-action-item
      icon="more_vert"
      aria-label="Options"
    />
  </template>
</mdc-top-app-bar>
<main class="mdc-top-app-bar--fixed-adjust">
  App content
</main>
```

## `mdc-top-app-bar`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `dense` | `boolean` | `false` | Set to `true` to style the top app bar as a dense top app bar. |
| `fixed` | `boolean` | `false` |
| `navigationIcon` | `boolean` | `false` | Set to `true` to render the navigation icon. |
| `prominent` | `boolean` | `false` |
| `short` | `boolean` | `false` |
| `shortCollapsed` | `boolean` | `false` | Set to `true` to render the short top app bar as closed, regardless of scroll. |
| `title` | `string | null` | `null` |

### Slots

| Name | Description |
| ---- | ----------- |
| `actions` | Slot for the top app bar's `mdc-top-app-bar-action-item` components. |

## `mdc-top-app-bar-action-item`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `disabled` | `boolean` | `false` |
| `rippleDisabled` | `boolean` | `false` |
| `icon` | `string` | `string | null` |
| `tag` | `string` | `'button'` | The tag name of the component's root element. This could be the tag name of a Vue component or basic `<a>` element. |

## Style customization

### CSS classes

| Class | Description |
| ----- | ----------- |
| `mdc-top-app-bar--fixed-adjust` | Class used to style the content below the top app bar to prevent the top app bar from covering it. |
| `mdc-top-app-bar--prominent-fixed-adjust` | Class used to style the content below the prominent top app bar to prevent the top app bar from covering it. |
| `mdc-top-app-bar--dense-fixed-adjust` | Class used to style the content below the dense top app bar to prevent the top app bar from covering it. |
| `mdc-top-app-bar--dense-prominent-fixed-adjust` | Class used to style the content below the top app bar when styled as both dense and prominent, to prevent the top app bar from covering it. |
| `mdc-top-app-bar--short-collapsed` | Class used to indicate the short top app bar is collapsed. |
| `mdc-top-app-bar--short-fixed-adjust` | Class used to style the content below the short top app bar to prevent the top app bar from covering it. |

### Sass mixins

| Mixin | Description |
| ----- | ----------- |
| `ink-color($color)` | Sets the ink color of the top app bar. |
| `icon-ink-color($color)` | Sets the ink color of the top app bar icons. |
| `fill-color($color)` | Sets the fill color of the top app bar. |
| `fill-color-accessible($color)` | Sets the fill color of the top app bar and automatically sets a high-contrast ink color. |
| `short-shape-radius($radius, $rtl-reflexive)` | Sets the rounded shape to short top app bar variant (when it is collapsed) with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to true. |
