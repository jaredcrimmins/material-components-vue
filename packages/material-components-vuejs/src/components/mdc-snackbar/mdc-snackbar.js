import {MDCIconButton} from "./../mdc-icon-button";
import {MDCSnackbarFoundation, util} from "@material/snackbar";

export default {
  name: "mdc-snackbar",

  components: {
    "mdc-icon-button": MDCIconButton
  },

  props: {
    label: String,
    value: {}
  },

  data() {
    return {
      mdcFoundation: null,
      open: this.value
    };
  },

  watch: {
    open(value) {
      value ? this.mdcFoundation.open() : this.mdcFoundation.close();

      if(value !== this.value) {
        this.$emit("input", value);
      }
    },

    value(value) {
      this.open = value;
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
        staticClass: "mdc-snackbar",
        on: {
          keydown: this.onKeyDown
        }
      },
      [
        this.genSurface(c)
      ]
    );
  },

  methods: {
    init() {
      this.mdcFoundation = new MDCSnackbarFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    onKeyDown(event) {
      this.mdcFoundation.handleKeyDown(event);
    },

    onActionButtonClick(event) {
      this.mdcFoundation.handleActionButtonClick(event);
    },

    onDismissButtonClick(event) {
      this.mdcFoundation.handleActionIconClick(event);
    },

    genSurface(c) {
      return c(
        "div",
        {
          staticClass: "mdc-snackbar__surface"
        },
        [
          this.genLabel(c),
          this.genActions(c)
        ]
      );
    },

    genLabel(c) {
      return c(
        "div",
        {
          ref: "labelEl",
          staticClass: "mdc-snackbar__label",
          attrs: {
            role: "status",
            "aria-live": "polite"
          }
        },
        this.label
      );
    },

    genActions(c) {
      return c(
        "div",
        {
          staticClass: "mdc-snackbar__actions"
        },
        [
          this.genActionSlot(),
          this.genDismissButton(c)
        ]
      );
    },

    genActionSlot() {
      let actionSlot = this.$scopedSlots.action;
      let data = {};

      if(actionSlot) {
        data = {
          staticClass: "mdc-snackbar__action"
        };

        return actionSlot(data);
      }
    },

    genDismissButton(c) {
      return c(
        "mdc-icon-button",
        {
          staticClass: "mdc-snackbar__dismiss",
          nativeOn: {
            click: this.onDismissButtonClick
          }
        },
        "close"
      );
    },

    // Adapter methods
    addClass(className) {
      this.$el.classList.add(className);
    },

    removeClass(className) {
      this.$el.classList.remove(className);
    },

    announce() {
      util.announce(this.$refs.labelEl);
    },

    notifyOpening() {
      this.$emit("MDCSnackbar:opening", { detail: {}});
      this.open = true;
    },

    notifyOpened() {
      this.$emit("MDCSnackbar:opened", { detail: {}});
    },

    notifyClosing(reason) {
      let event = { detail: {}};

      if(reason) {
        event.detail.reason = reason;
      }

      this.$emit("MDCSnackbar:closing", event);
      this.open = false;
    },

    notifyClosed(reason) {
      let event = { detail: {}};

      if(reason) {
        event.detail.reason = reason;
      }

      this.$emit("MDCSnackbar:closed", event);
    }
  }
}