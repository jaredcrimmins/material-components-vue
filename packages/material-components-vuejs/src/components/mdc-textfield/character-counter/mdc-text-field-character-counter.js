import {MDCTextFieldCharacterCounterFoundation} from "@material/textfield/character-counter";

export default {
  name: "mdc-text-field-character-counter",

  data() {
    return {
      content: ""
    };
  },

  props: {
    currentLength: {
      default: 0,
      type: Number
    },
    maxLength: {
      default: 0,
      type: Number
    }
  },

  watch: {
    currentLength() {
      this.genContentString();
    },

    maxLength() {
      this.genContentString();
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c) {
    return c(
      "div",
      {
        staticClass: "mdc-text-field-character-counter"
      },
      this.content
    );
  },

  methods: {
    init() {
      this.mdcFoundation = new MDCTextFieldCharacterCounterFoundation(this);
      this.mdcFoundation.init();

      this.genContentString();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genContentString(currentLength, maxLength) {
      let content = "";

      currentLength = currentLength || this.currentLength;
      maxLength = maxLength || this.maxLength;

      content = `${ currentLength }`;

      if(maxLength) {
        content += ` / ${ maxLength }`;
      }

      this.content = content;

      return content;
    },

    // Adapter methods
    setContent(content) {
      this.content = content;
    }
  }
}