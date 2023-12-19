---
title: Tabs
---

# Tabs

<v-tabs-demo1 />

## Usage

```vue
<mdc-tab-bar underline>
  <mdc-tab>Home</mdc-tab>
  <mdc-tab>Merchandise</mdc-tab>
  <mdc-tab>About Us</mdc-tab>
</mdc-tab-bar>
```

## mdc-tab

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `icon` | `string` | `undefined` | Leading icon in the tab. |
| `indicatorIcon` | `string` | `undefined` | Icon displayed when tab is activated. |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-tab-bar

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `automaticActivation` | `boolean` | `false` | Sets how tabs activate in response to keyboard interaction. Automatic (`true`) activates as soon as a tab is focused with arrow keys; manual (`false`) activates only when the user presses space/enter. |
| `fade` | `boolean` | `false` | Set to `true` for the tab indicator to fade in on activation and fade out on deactivation. |
| `focusOnActivate` | `boolean` | `false` | Set to `true` to for tabs to focus themselves when activated. |
| `indicatorSpanContent` | `boolean` | `false` |
| `underline` | `boolean` | `false` | Set to `true` to underline activated tabs. |
| `value` | `number` | `0` | The index of the active tab. |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |
