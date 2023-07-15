---
title: Banner
---

# Banner

<v-banner-demo1 />

## Usage

### Basic

```vue
<mdc-banner
  text="There was a problem processing a transaction on your credit card."
>
  <template v-slot:actions="{primaryStaticClass}">
    <mdc-button :class="primaryStaticClass">
      Fix it
    </mdc-button>
  </template>
</mdc-banner>
```

### Centered

```vue
<mdc-banner
  centered
  text="There was a problem processing a transaction on your credit card."
  fixed
>
  <template v-slot:actions="{primaryStaticClass}">
    <mdc-button :class="primaryStaticClass">
      Fix it
    </mdc-button>
  </template>
</mdc-banner>
```

### Fixed Banner

```vue
<mdc-banner
  text="There was a problem processing a transaction on your credit card."
  fixed
>
  <template v-slot:actions="{primaryStaticClass}">
    <mdc-button :class="primaryStaticClass">
      Fix it
    </mdc-button>
  </template>
</mdc-banner>
```

### Banner with graphic

```vue
  <mdc-banner
    text="There was a problem processing a transaction on your credit card."
  >
    <template v-slot:graphic="{staticClass}">
      <mdc-material-icon :class="staticClass">
        error_outline
      </mdc-material-icon>
    </template>
    <template v-slot:actions="{primaryStaticClass}">
      <mdc-button :class="primaryStaticClass">
        Fix it
      </mdc-button>
    </template>
  </mdc-banner>
```

### Banner with two actions

```vue
<mdc-banner
  text="There was a problem processing a transaction on your credit card."
>
  <template v-slot:actions="{primaryStaticClass, secondaryStaticClass}">
    <mdc-button :class="secondaryStaticClass">
      Learn more
    </mdc-button>
    <mdc-button :class="primaryStaticClass">
      Fix it
    </mdc-button>
  </template>
</mdc-banner>
```

### Mobile Stacked

```vue
<mdc-banner
  text="There was a problem processing a transaction on your credit card."
>
  <template v-slot:actions="{primaryStaticClass}">
    <mdc-button :class="primaryStaticClass">
      Fix it
    </mdc-button>
  </template>
</mdc-banner>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `centered` | `boolean` | `false` |
| `fixed` | `boolean` | `false` |
| `graphicAlt` | `string` | `''` | The `alt` text of the graphic, if included. |
| `mobileStacked` | `boolean` | `false` | Set to `true` to have banners with long text on mobile view position their action(s) below the text, instead of alongside it. |
| `text` | `string` | `''` |
| `value` | `boolean` | `false` |

## Slots

| Name        | Description |
| ----------- | ------------|
| `default`   |             |
| `graphic`   | Scoped slot. Slot for `mdc-material-icon`. |
| `actions`   | Scoped slot. |

### `graphic` scoped slot props:

```typescript
{
  staticClass: {[key: string]: boolean}
}
```

### `actions` scoped slot props:

```typescript
{
  /**
   * CSS classes to be bound to the mdc-button component to be used as the
   * primary action.
   **/
  primaryStaticClass: {[key: string]: boolean},

  /**
   * CSS classes to be bound to the mdc-button(s) to be used as the secondary
   * actions.
   **/
  secondaryStaticClass: {[key: string]: boolean}
}
```
