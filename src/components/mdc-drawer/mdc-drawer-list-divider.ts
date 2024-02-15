import {MDCListDivider} from '../mdc-list';
import Vue from 'vue';

export default Vue.extend({
  name: 'mdc-drawer-list-divider',

  components: {
    'mdc-list-divider': MDCListDivider
  },

  render(c) {
    return c('mdc-drawer-list-divider');
  }
});
