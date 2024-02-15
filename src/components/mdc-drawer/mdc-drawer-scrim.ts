import Vue from 'vue';

export default Vue.extend({
  name: 'mdc-drawer-scim',

  render(c) {
    return c(
      'div',
      {
        staticClass: 'mdc-drawer-scrim'
      }
    );
  }
})
