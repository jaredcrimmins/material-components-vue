---
title: Drawer
description: Navigation drawers provide access to destinations in your app.
canonicalUrl: /components/drawer/
---

# Drawer

[Material Components Web docs](https://github.com/material-components/material-components-web/tree/v10.0.0/packages/mdc-drawer#readme)

Navigation drawers provide access to destinations in your app.

<v-drawer-demo1 />

## Styles

```scss
@use '@material/drawer';
@use '@material/list';

@include drawer.core-styles;
@include drawer.dismissible-core-styles;
@include drawer.modal-core-styles;
@include list.core-styles;
```

## Usage

### Standard

Standard navigation drawers allow interaction with both screen content and the drawer at the same time. They can be used on tablet and desktop, but they aren't suitable for mobile due to limited screen size.

```vue
<mdc-drawer>
  <template #header>
    <mdc-drawer-title>Mail</mdc-drawer-title>
    <mdc-drawer-subtitle>email@material.io</mdc-drawer-subtitle>
  </template>

  <mdc-drawer-list>
    <mdc-drawer-list-item>Inbox</mdc-drawer-list-item>
    <mdc-drawer-list-item>Outgoing</mdc-drawer-list-item>
    <mdc-drawer-list-item>Drafts</mdc-drawer-list-item>
  </mdc-drawer-list>
</mdc-drawer>
```

### Modal

Modal drawers block interaction with the reset of an app's content with a scrim. They are elevated above most of the app's UI and don't affect the screen's layout grid.

**Note: The `mdc-drawer-scrim` next sibling element is required, to protect the app's UI from interactions while the modal drawer is open.**

```vue
<mdc-drawer modal>
  <mdc-drawer-list>
    <mdc-drawer-list-item
      tag="a"
      to="#"
    >
      Inbox
    </mdc-drawer-list-item>
    <mdc-drawer-list-item
      tag="a"
      href="#"
    >
      Outgoing
    </mdc-drawer-list-item>
    <mdc-drawer-list-item
      tag="a"
      href="#"
    >
      Drafts
    </mdc-drawer-list-item>
  </mdc-drawer-list>
</mdc-drawer>
```

### Dismissible

Dismissible drawers are by default hidden off screen, and can slide into view. Dismissible drawers should be used when navigation is not common, and the main app content is prioritized.

**Note: Apply the `mdc-drawer-app-content` class to the sibling element after the drawer for the open/close animations to work.**

```vue
<mdc-drawer dismissible>
  <mdc-drawer-list>
    <mdc-drawer-list-item
      tag="a"
      to="#"
    >
      Inbox
    </mdc-drawer-list-item>
    <mdc-drawer-list-item
      tag="a"
      href="#"
    >
      Outgoing
    </mdc-drawer-list-item>
    <mdc-drawer-list-item
      tag="a"
      href="#"
    >
      Drafts
    </mdc-drawer-list-item>
  </mdc-drawer-list>
</mdc-drawer>

<div class="mdc-drawer-app-content">
  App Content
</div>
```

#### Usage with [top app bar](/components/top-app-bar/)

##### Dismissible drawer: full hieght drawer

In cases where the drawer occupies the full viewport height, some styles must be applied to get the dismissible drawer and the content below the top app bar to independently scroll and work in all browsers.

In the following example, the `mdc-drawer__content` and `main-content` elements should scroll independently of each other. The `mdc-drawer--dismissible` and `mdc-drawer-app-content` elements should then sit side-by-side. The markup looks something like this:

```vue
<body>
  <mdc-drawer dismissible>
    <mdc-drawer-list>
      <mdc-drawer-list-item
        tag="a"
        to="#"
      >
        Inbox
      </mdc-drawer-list-item>
      <mdc-drawer-list-item
        tag="a"
        href="#"
      >
        Outgoing
      </mdc-drawer-list-item>
      <mdc-drawer-list-item
        tag="a"
        href="#"
      >
        Drafts
      </mdc-drawer-list-item>
    </mdc-drawer-list>
  </mdc-drawer>

  <div class="mdc-drawer-app-content">
    <mdc-top-app-bar
      class="app-bar"
      page-title="Dismissible Drawer"
      navigation-icon
    >
    </mdc-top-app-bar>

    <main class="main-content">
      <div class="mdc-top-app-bar--fixed-adjust">
        App content
      </div>
    </main>
  </div>
</body>
```

##### Dismissible drawer: below top app bar

In cases where the drawer appears below the top app bar you will want to follow the markup shown below. The `mdc-drawer__content` and `main-content` elements will also scroll independently of each other. The `mdc-top-app-bar`, `mdc-drawer` and `mdc-drawer-app-content` will be sibling to each other. The `mdc-top-app-bar--fixed-adjust` helper class will be applied to `mdc-drawer` and `mdc-drawer-app-content` elements to adjust the position with top app bar.

```vue
<body>
  <mdc-top-app-bar
    class="app-bar"
    page-title="Dismissible Drawer"
    navigation-icon
  />
  <mdc-drawer dismissible>
    <mdc-drawer-list>
      <mdc-drawer-list-item
        tag="a"
        to="#"
      >
        Inbox
      </mdc-drawer-list-item>
      <mdc-drawer-list-item
        tag="a"
        href="#"
      >
        Outgoing
      </mdc-drawer-list-item>
      <mdc-drawer-list-item
        tag="a"
        href="#"
      >
        Drafts
      </mdc-drawer-list-item>
    </mdc-drawer-list>
  </mdc-drawer>

  <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
    <main class="main-content">
      App Content
    </main>
  </div>
</body>
```

The CSS to match either case looks like this:

```css
// Note: These styles do not account for any paddings/margins that you may need.

body {
  display: flex;
  height: 100vh;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

.main-content {
  overflow: auto;
  height: 100%;
}

.app-bar {
  position: absolute;
}

// Only apply this style if below top app bar.
.mdc-top-app-bar {
  z-index: 7;
}
```

## `mdc-drawer`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `dismissible` | `boolean` | `false` | Set to `true` for the dismissible drawer variant. |
| `modal` | `boolean` | `false` | Set to `true` for the modal drawer variant. |
| `value` | `boolean` | `false` | Set to `true` to open the drawer. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |
| `header` | Slot for the drawer's `mdc-drawer-title` and `mdc-drawer-subtitle` components. |

## `mdc-drawer-list`

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## `mdc-drawer-list-divider`

This component does not accept any props or slots.

## `mdc-drawer-list-item`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `primaryText` | `string` | `undefined` | For two line lists, sets the primary text. |
| `rippleDisabled` | `boolean` | `false` | Disables the ripple effect. |
| `secondaryText` | `string` | `undefined` | For two line lists, sets the secondary text. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |
| `graphic` | Slot for an `mdc-material-icon` or `<svg>` icon that appears before the text of the list item. |

## `mdc-drawer-scrim`

This component does not accept any props or slots.

## `mdc-drawer-subtitle`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `tag` | `string` | `'h6'` | Tagname of the component's root element. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## `mdc-drawer-title`

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `tag` | `string` | `'h3'` | Tagname of the component's root element. |

### Slots

| Name | Description |
| ---- | ----------- |
| `default` |

## Style customization

### CSS classes

| Class | Description |
| ----- | ----------- |
| `mdc-drawer-app-content` | Mandatory for dismissible variant only. Sibling element that is resized when the drawer opens/closes. |

### Sass mixins

| Mixin | Description |
| ----- | ----------- |
| `border-color($color)` | Sets border color of mdc-drawer surface. |
| `divider-color($color)` | Sets divider color found between list groups. |
| `fill-color-accessible($color)` | Sets the fill color to `$color`, and list item and icon ink colors to an accessible color relative to `$color`. |
| `surface-fill-color($color)` | Sets the background color of `mdc-drawer`. |
| `title-ink-color($color)` | Sets the ink color of `mdc-drawer-title`. |
| `subtitle-ink-color` | Sets drawer subtitle and list subheader ink color. |
| `item-icon-ink-color($color)` | Sets drawer list item graphic icon ink color. |
| `item-text-ink-color($color)` | Sets drawer list item text ink color. |
| `item-activated-icon-ink-color($color)` | Sets activated drawer list item icon ink color. |
| `item-activated-text-ink-color($color)` | Sets activated drawer list item text ink color. |
| `shape-radius($radius)` | Sets the rounded shape to drawer with given radius size. `$radius` can be single radius or list of 2 radius values for trailing-top and trailing-bottom. Automatically flips the radius values in RTL context. |
| `item-shape-radius($radius, $rtl-reflexive)` | Sets the rounded shape to drawer navigation item with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to true. |
| `activated-overlay-color($color)` | Sets the overlay color of the activated drawer list item. |
| `scrim-fill-color($color)` | Sets the fill color of `mdc-drawer-scrim`. |
| `z-index($value)` | Sets the z index of drawer. Drawer stays on top of top app bar except for clipped variant of drawer. |
| `width($width)` | Sets the width of the drawer. In the case of the dismissible variant, also sets margin required for `mdc-drawer-app-content`. |