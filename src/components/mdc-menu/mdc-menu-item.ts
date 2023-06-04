import {MDCListItem} from "./../mdc-list";
import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "mdc-menu-item",

  components: {
    "mdc-list-item": MDCListItem
  },

  props: {
    rippleDisabled: Boolean,
    value: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      cssClasses: {} as {[className: string]: boolean}
    };
  },

  render(c): VNode {
    return c(
      "mdc-list-item",
      {
        class: this.cssClasses,
        attrs: {
          role: "menuitem"
        },
        props: {
          rippleDisabled: this.rippleDisabled,
          value: this.value
        }
      },
      this.$slots.default
    );
  },

  methods: {
    //
    // Private
    //

    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    }
  }
});
