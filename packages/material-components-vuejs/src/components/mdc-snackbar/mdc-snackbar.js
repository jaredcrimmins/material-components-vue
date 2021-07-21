import {MDCIconButton} from "../mdc-icon-button";
import {MDCSnackbarFoundation, strings, util} from "@material/snackbar";
import {emitCustomEvent} from "../../utils";

export default {
  name: "mdc-snackbar",

  components: {
    "mdc-icon-button": MDCIconButton
  },

  props: {
    closeOnEscape: Boolean,
    dismissButton: Boolean,
    label: String,
    leading: Boolean,
    stacked: Boolean,
    timeoutMs: Number,
    value: {}
  },

  data() {
    return {
      mdcFoundation: new MDCSnackbarFoundation(
        MDCSnackbarFoundation.defaultAdapter
      ),
      open: this.value
    };
  },

  watch: {
    open(value) {
      value ? this.mdcFoundation.open() : this.mdcFoundation.close();

      if (value !== this.value) {
        this.$emit("input", value);
      }
    },

    timeoutMs(value) {
      this.setTimeoutMs(value);
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
        class: {
          "mdc-snackbar--leading": this.leading,
          "mdc-snackbar--stacked": this.stacked
        },
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
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCSnackbarFoundation(this);
      this.mdcFoundation.init();

      this.setCloseOnEscape(this.closeOnEscape);
      this.setTimeoutMs(this.timeoutMs);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    setCloseOnEscape(closeOnEscape) {
      this.mdcFoundation.setCloseOnEscape(closeOnEscape);
    },

    setTimeoutMs(timeoutMs) {
      if (timeoutMs) this.mdcFoundation.setTimeoutMs(timeoutMs);
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
          staticClass: "mdc-snackbar__surface",
          attrs: {
            role: "status",
            "aria-relevant": "additions"
          }
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
            "aria-atomic": "false"
          }
        },
        this.label
      );
    },

    genActions(c) {
      return c(
        "div",
        {
          staticClass: "mdc-snackbar__actions",
          attrs: {
            "aria-atomic": "true"
          }
        },
        [
          this.genActionSlot(),
          this.genDismissButton(c)
        ]
      );
    },

    genActionSlot() {
      const actionSlot = this.$scopedSlots.action;

      if (actionSlot) {
        return actionSlot({
          staticClass: "mdc-snackbar__action",
          onClick: this.onActionButtonClick
        });
      }
    },

    genDismissButton(c) {
      if (!this.dismissButton) return;

      return c(
        "mdc-icon-button",
        {
          staticClass: "mdc-snackbar__dismiss",
          props: {
            icon: "close",
            rippleDisabled: true
          },
          nativeOn: {
            click: this.onDismissButtonClick
          }
        }
      );
    },

    //
    // Adapter methods
    //

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
      emitCustomEvent(this.$el, strings.OPENING_EVENT, {});
      this.open = true;
    },

    notifyOpened() {
      emitCustomEvent(this.$el, strings.OPENED_EVENT, {});
    },

    notifyClosing(reason) {
      const eventData = {};

      if (reason) {
        eventData.reason = reason;
      }

      emitCustomEvent(this.$el, strings.CLOSING_EVENT, eventData);

      this.open = false;
    },

    notifyClosed(reason) {
      const eventData = {};

      if (reason) {
        eventData.reason = reason;
      }

      emitCustomEvent(this.$el, strings.CLOSED_EVENT, eventData);
    }
  }
}