import Vue from 'vue';

export default Vue.extend({
  name: 'absolutely-positionable',

  props: {
    absolutePosition: {
      type: Object,
      validator: value => {
        return Number.isFinite(value.x) && Number.isFinite(value.y);
      }
    }
  }
});
