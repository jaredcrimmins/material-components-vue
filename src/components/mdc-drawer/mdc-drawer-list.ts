import {MDCList} from '../mdc-list';
import Vue from 'vue';

export default Vue.extend({
  name: 'mdc-drawer-list',

  components: {
    'mdc-list': MDCList
  },

  render(c) {
    return c(
      'mdc-list',
      {
        props: {
          singleSelection: true,
          tag: 'nav',
          vertical: true
        }
      },
      this.$slots.default
    );
  }
});
