import {MDCTextFieldCharacterCounterFoundation} from "@material/textfield";
import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-text-field-character-counter",

  data() {
    return {
      content: "",
      mdcFoundation: new MDCTextFieldCharacterCounterFoundation(
        MDCTextFieldCharacterCounterFoundation.defaultAdapter
      )
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

  render(c): VNode {
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

    genContentString(currentLength?: number, maxLength?: number) {
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
    setContent(content: string) {
      this.content = content;
    }
  }
});
