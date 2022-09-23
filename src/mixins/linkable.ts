import Vue, {PropType} from 'vue';

export default Vue.extend({
  name: 'linkable',

  props: {
    tag: {
      type: String,
      default: 'a'
    },
    to: {
      type: <PropType<string | null>>String,
      default: null
    }
  },

  computed: {
    href(): string | null {
      if (this.tag === 'a') return this.to;
      else return null;
    }
  }
});
