export default {
  name: "mdc-image-list-item",

  inheritAttrs: false,

  props: {
    constrainAspectRatio: Boolean,
    label: String
  },

  render(c) {
    return c(
      "li",
      {
        staticClass: "mdc-image-list__item"
      },
      [
        this.genImage(c),
        this.genSupporting(c)
      ]
    );
  },

  methods: {
    genImage(c) {
      const imageNode = c(
        "img",
        {
          staticClass: "mdc-image-list__image",
          attrs: this.$attrs
        }
      );

      if(this.constrainAspectRatio) {
        return c(
          "div",
          {
            staticClass: "mdc-image-list__image-aspect-container"
          },
          [
            imageNode
          ]
        );
      }

      return imageNode;
    },

    genSupporting(c) {
      if(!this.label) return;

      return c(
        "div",
        {
          staticClass: "mdc-image-list__supporting"
        },
        [
          c(
            "span",
            {
              staticClass: "mdc-image-list__label"
            },
            this.label
          )
        ]
      );
    }
  }
}