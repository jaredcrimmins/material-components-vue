import {MDCIconButton} from "../mdc-icon-button";
import {MDCSnackbarFoundation, strings, util} from "@material/snackbar";
import Vue, {CreateElement, VNode} from 'vue';
import {emitCustomEvent} from "../../utils";

type LabelElRef = Element;

export default Vue.extend({
  name: "mdc-snackbar",

  components: {
    "mdc-icon-button": MDCIconButton
  },

  props: {
    closeOnEscape: Boolean,
    dismissButton: Boolean,
    label: {
      type: String,
      default: ''
    },
    leading: Boolean,
    stacked: Boolean,
    timeoutMs: {
      type: Number,
      default: 0
    },
    value: Boolean
  },

  data() {
    return {
      cssClasses: <{[className: string]: boolean}>{
        "mdc-snackbar--leading": this.leading,
        "mdc-snackbar--stacked": this.stacked
      },
      mdcFoundation: new MDCSnackbarFoundation(
        MDCSnackbarFoundation.defaultAdapter
      ),
      open: false
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

  render(c): VNode {
    return c(
      "div",
      {
        staticClass: "mdc-snackbar",
        class: this.cssClasses,
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
      this.open = this.value;
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    setCloseOnEscape(closeOnEscape: boolean) {
      this.mdcFoundation.setCloseOnEscape(closeOnEscape);
    },

    setTimeoutMs(timeoutMs: number) {
      if (timeoutMs) this.mdcFoundation.setTimeoutMs(timeoutMs);
    },

    onKeyDown(event: KeyboardEvent) {
      this.mdcFoundation.handleKeyDown(event);
    },

    onActionButtonClick(event: MouseEvent) {
      this.mdcFoundation.handleActionButtonClick(event);
    },

    onDismissButtonClick(event: MouseEvent) {
      this.mdcFoundation.handleActionIconClick(event);
    },

    genSurface(c: CreateElement) {
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

    genLabel(c: CreateElement) {
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

    genActions(c: CreateElement) {
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

    genDismissButton(c: CreateElement) {
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

    addClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: true};
    },

    removeClass(className: string) {
      this.cssClasses = {...this.cssClasses, [className]: false};
    },

    announce() {
      util.announce(<LabelElRef>this.$refs.labelEl);
    },

    notifyOpening() {
      emitCustomEvent(this.$el, strings.OPENING_EVENT, {});
      this.open = true;
    },

    notifyOpened() {
      emitCustomEvent(this.$el, strings.OPENED_EVENT, {});
    },

    notifyClosing(reason: string) {
      emitCustomEvent(this.$el, strings.CLOSING_EVENT, reason ? {reason} : {});

      this.open = false;
    },

    notifyClosed(reason: string) {
      emitCustomEvent(this.$el, strings.CLOSED_EVENT, reason ? {reason} : {});
    }
  }
});
