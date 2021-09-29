import {MDCLineRippleFoundation} from "@material/line-ripple";
import {NativeEventListener} from "@/utils";
import Vue, {VNode} from 'vue';

export default Vue.extend({
  name: "MdcLineRipple",

  props: {
    active: Boolean,
    rippleCenter: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      mdcFoundation: new MDCLineRippleFoundation(
        MDCLineRippleFoundation.defaultAdapter
      ),
      style: <{[key: string]: string}>{}
    };
  },

  watch: {
    active(value) {
      value ? this.mdcFoundation.activate() : this.mdcFoundation.deactivate();
    },

    rippleCenter(value) {
      this.setRippleCenter(value);
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
      "span",
      {
        class: "mdc-line-ripple",
        style: this.style
      }
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCLineRippleFoundation(this);
      this.mdcFoundation.init();

      this.setRippleCenter(this.rippleCenter);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    setRippleCenter(rippleCenter: number) {
      if (rippleCenter !== null)
        this.mdcFoundation.setRippleCenter(rippleCenter);
    },

    //
    // Adapter methods
    //

    addClass(className: string) {
      this.$el.classList.add(className);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    setStyle(propertyName: string, value: string) {
      this.style[propertyName] = value;
    },

    registerEventHandler(evtType: string, handler: NativeEventListener) {
      this.$el.addEventListener(evtType, handler);
    },

    deregisterEventHandler(evtType: string, handler: NativeEventListener) {
      this.$el.removeEventListener(evtType, handler);
    }
  }
});
