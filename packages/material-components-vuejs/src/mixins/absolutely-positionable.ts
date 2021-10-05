import Vue, {PropType} from 'vue';
import {MDCMenuPoint} from '@material/menu-surface';

export default Vue.extend({
  name: 'absolutely-positionable',

  props: {
    absolutePosition: {
      type: <PropType<MDCMenuPoint>>Object,
      validator: value => {
        return Number.isFinite(value.x) && Number.isFinite(value.y);
      }
    }
  }
});
