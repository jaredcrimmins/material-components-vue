## Usage

```html
<mdc-checkbox v-model="checked"></mdc-checkbox>
<mdc-checkbox
  v-model="checked"
  :disabled="disabled"
  v-model:indeterminate="indeterminate"
/>
```

```javascript
var vm = new Vue({
  data: {
    checked: true,
  },
});
```

### Indeterminate checkbox

```html
<mdc-checkbox
  v-model="checked"
  v-model:indeterminate="indeterminate"
/>
```

```javascript
var vm = new Vue({
  data: {
    checked: false,
    indeterminate: true,
  },
});
```

### props

| props           | Type    | Default | Description                                            |
| --------------- | ------- | ------- | ------------------------------------------------------ |
| `indeterminate` | Boolean |         | checkbox's indeterminate state                         |
| `disabled`      | Boolean |         | whether the checkbox is disabled                       |
| `value`         | Boolean |         | the input's value                                      |

### events

| event                 | args    | Description             |
| --------------------- | ------- | ----------------------- |
| `@change`             | boolean | checked state           |

### Reference

- <https://github.com/material-components/material-components-web/tree/v7.0.0/packages/mdc-checkbox>