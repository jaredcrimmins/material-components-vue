import Vue from 'vue';
import {focusTrap} from '@material/dom';

export default Vue.extend({
  name: 'focus-trappable',

  data() {
    return {
      focusTrap: <focusTrap.FocusTrap | null>null
    };
  },

  mounted() {
    this.focusTrap = this.focusTrapFactory(<HTMLElement>this.$el);
  },

  methods: {
    //
    // Private methods
    //

    focusTrapFactory(el: HTMLElement, focusOptions?: focusTrap.FocusOptions) {
      return new focusTrap.FocusTrap(el, focusOptions);
    },

    //
    // Adapter methods
    //

    trapFocus() {
      this.focusTrap?.trapFocus();
    },

    releaseFocus() {
      this.focusTrap?.releaseFocus();
    }
  }
});
