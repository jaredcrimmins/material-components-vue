---
title: Image List
---

# Image List

<v-image-list-demo1 />

## Usage

```html
<mdc-image-list>
  <mdc-image-list-item
    src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/1.jpg"
    label="Text label"
  />
  <mdc-image-list-item
    src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"
    label="Text label"
  />
  <mdc-image-list-item
    src="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/3.jpg"
    label="Text label"
  />
</mdc-image-list>
```

## mdc-image-list

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `masonry` | `boolean` | `false` | Set to `true` if this Image List should use the Masonry variant. |
| `textProtection` | `boolean` | `false` | Set to `true` to position supporting content in a scrim overlaying each image. |

## mdc-image-list-item

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `constrainAspectRatio` | `boolean` | `false` | Set to `true` to constrain the aspect ratio of this item's image to 1:1. |
| `label` | `string` | `null` | Text label of the item. |