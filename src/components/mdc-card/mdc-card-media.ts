import Vue, {CreateElement, VNode, VueConstructor} from 'vue';

export default (<VueConstructor>Vue).extend({
  name: 'mdc-card-media',

  inheritAttrs: true,

  props: {
    aspectRatio: {
      validator(value) {
        return typeof value === 'string' && ['16:9', 'square'].includes(value);
      }
    },
    src: {
      type: String
    }
  },

  render(c): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-card__media',
        class: {
          'mdc-card__media--square': this.aspectRatio === 'square',
          'mdc-card__media--16:9': this.aspectRatio === '16:9'
        },
        style: {
          'background-image': this.src ? `url("${this.src}")` : undefined
        }
      },
      [
        this.genContent(c)
      ]
    );
  },

  methods: {
    genContent(c: CreateElement) {
      const defaultSlot = this.$slots.default;

      if (defaultSlot) {
        return c(
          'div',
          {
            staticClass: 'mdc-card__media-content'
          },
          defaultSlot
        );
      }
    }
  }
});
