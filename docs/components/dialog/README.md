---
title: Dialog
---

# Dialog

<v-dialog-demo1 />

## Usage

### Alert dialog

```vue
<mdc-dialog>
  <mdc-dialog-content>Discard draft?</mdc-dialog-content>
  <mdc-dialog-actions>
    <mdc-dialog-button action="cancel">
      Cancel
    </mdc-dialog-button>
    <mdc-dialog-button
      action="confirm"
      initial-focus
    >
      Discard
    </mdc-dialog-button>
  </mdc-dialog-actions>
</mdc-dialog>
```

### Simple Dialog

```vue
<mdc-dialog>
  <mdc-dialog-title>Choose a Ringtone</mdc-dialog-title>
  <mdc-dialog-content>
    <mdc-list class="mdc-list--avatar-list">
      <mdc-list-item data-mdc-dialog-action="none">None</mdc-list-item>
      <mdc-list-item data-mdc-dialog-action="callisto">Callisto</mdc-list-item>
      <mdc-list-item data-mdc-dialog-action="ganymede">Ganymede</mdc-list-item>
      <mdc-list-item data-mdc-dialog-action="luna">Luna</mdc-list-item>
      <mdc-list-item data-mdc-dialog-action="oberon">Oberon</mdc-list-item>
      <mdc-list-item data-mdc-dialog-action="phobos">Phobos</mdc-list-item>
      <mdc-list-item data-mdc-dialog-action="dione">Dione</mdc-list-item>
    </mdc-list>
  </mdc-dialog-content>
</mdc-dialog>
```

### Confirmation Dialog

```vue
<mdc-dialog>
  <mdc-dialog-title>Choose a Ringtone</mdc-dialog-title>
  <mdc-dialog-content>
    <mdc-list class="mdc-list--avatar-list">
      <mdc-list-item>
        <template #radio="slotProps">
          <mdc-radio
            v-bind="slotProps"
            name="dialog-confirmation-radio-group"
          />
        </template>
        <template #default>
          None
        </template>
      </mdc-list-item>
      <mdc-list-item>
        <template #radio="slotProps">
          <mdc-radio
            v-bind="slotProps"
            name="dialog-confirmation-radio-group"
          />
        </template>
        <template #default>
          Callisto
        </template>
      </mdc-list-item>
      <mdc-list-item>
        <template #radio="slotProps">
          <mdc-radio
            v-bind="slotProps"
            name="dialog-confirmation-radio-group"
          />
        </template>
        <template #default>
          Ganymede
        </template>
      </mdc-list-item>
      <mdc-list-item>
        <template #radio="slotProps">
          <mdc-radio
            v-bind="slotProps"
            name="dialog-confirmation-radio-group"
            checked
          />
        </template>
        <template #default>
          Luna
        </template>
      </mdc-list-item>
      <mdc-list-item>
        <template #radio="slotProps">
          <mdc-radio
            v-bind="slotProps"
            name="dialog-confirmation-radio-group"
          />
        </template>
        <template #default>
          Oberon
        </template>
      </mdc-list-item>
      <mdc-list-item>
        <template #radio="slotProps">
          <mdc-radio
            v-bind="slotProps"
            name="dialog-confirmation-radio-group"
          />
        </template>
        <template #default>
          Phobos
        </template>
      </mdc-list-item>
      <mdc-list-item>
        <template #radio="slotProps">
          <mdc-radio
            v-bind="slotProps"
            name="dialog-confirmation-radio-group"
          />
        </template>
        <template #default>
          Dione
        </template>
      </mdc-list-item>
    </mdc-list>
  </mdc-dialog-content>
  <mdc-dialog-actions>
    <mdc-dialog-button action="close">
      Cancel
    </mdc-dialog-button>
    <mdc-dialog-button
      action="accept"
      initial-focus
    >
      OK
    </mdc-dialog-button>
  </mdc-dialog-actions>
</mdc-dialog>
```

## mdc-dialog

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `boolean` | `false` |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-dialog-actions

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-dialog-button

### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `action` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `initialFocus` | `boolean` | `false` | Set to `true` to indicate that it is the element to initially focus on after the dialog has opened. |
| `outlined` | `boolean` | `false` |
| `raised` | `boolean` | `false` |
| `unelevated` | `boolean` | `false` |

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-dialog-content

### Slots

| Name | Description |
| ---- | ------------|
| `default` |

## mdc-dialog-title

### Slots

| Name        | Description |
| ----------- | ------------|
| `default`   |             |
