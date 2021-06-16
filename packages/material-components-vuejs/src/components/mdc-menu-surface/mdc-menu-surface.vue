<template>
  <div
    class="mdc-menu-surface"
    :class="{
      'mdc-menu-surface--fullwidth': fullWidth
    }"
    v-on:keydown="onKeydown"
    v-on:MDCMenuSurface:closed="onClosed"
    v-on:MDCMenuSurface:opened="onOpened"
  >
    <slot></slot>
  </div>
</template>

<script>
  import {MDCMenuSurfaceFoundation, util} from "@material/menu-surface";
  import {emitCustomEvent} from "./../../utils";

  const {cssClasses, strings} = MDCMenuSurfaceFoundation;

  export default {
    name: "mdc-menu-surface",

    props: {
      absolutePosition: {
        type: Object,
        validator: value => {
          if(typeof value.x === "number" && typeof value.y === "number") return true;

          return false;
        }
      },
      anchorCorner: Number,
      anchorElement: {
        validator: value => {
          return ["string", "object"].includes(typeof value);
        }
      },
      fixed: {
        default: false,
        type: Boolean
      },
      fullWidth: Boolean,
      hoisted: Boolean,
      quickOpen: Boolean,
      value: {
        default() {
          return false;
        },
        type: Boolean
      }
    },

    data() {
      return {
        anchorElement_: null,
        mdcFoundation: new MDCMenuSurfaceFoundation(MDCMenuSurfaceFoundation.defaultAdapter),
        open: false,
        previousFocus: null
      };
    },

    mounted() {
      this.init();
    },

    beforeDestory() {
      this.deinit();
    },

    watch: {
      absolutePosition() {
        this.setAbsolutePosition(this.absolutePosition.x, this.absolutePosition.y);
      },

      anchorCorner() {
        this.mdcFoundation.setAnchorCorner(this.anchorCorner);
      },

      anchorElement() {
        if(this.$el) {
          this.getAnchorElement();
        }
      },

      fixed(value) {
        this.setFixedPosition(value);
      },

      hoisted() {
        this.setIsHoisted();
      },

      quickOpen(value) {
        this.mdcFoundation.setQuickOpen(value);
      },

      open() {
        this.open ? this.mdcFoundation.open() : this.mdcFoundation.close();

        if(this.value !== this.open) {
          this.$emit("input", this.open);
        }
      },

      value() {
        this.open = this.value;
      }
    },

    methods: {
      //
      // Private methods
      //

      init() {
        this.getAnchorElement();
        this.mdcFoundation = new MDCMenuSurfaceFoundation(this);
        this.mdcFoundation.init();
        this.setFixedPosition(this.fixed);
        this.setIsHoisted();
        this.mdcFoundation.setQuickOpen(this.quickOpen);
        this.initListeners();
      },

      deinit() {
        this.deinitListeners();
        this.mdcFoundation.destroy();
      },

      initListeners() {
        document.body.addEventListener("click", this.onBodyClick, { capture: true });
      },

      deinitListeners() {
        document.body.removeEventListener("click", this.onBodyClick);
      },

      getAnchorElement() {
        let anchorElement = null;

        if(typeof this.anchorElement === "string") {
          anchorElement = this.$root.$el.querySelector(anchorElement);
        }
        else if(this.anchorElement && (this.anchorElement instanceof HTMLElement || this.anchorElement.nodeType)) {
          anchorElement = this.anchorElement;
        }
        else {
          let parentElement = this.$el.parentElement;

          anchorElement = parentElement && parentElement.querySelector(cssClasses.ANCHOR) ? parentElement : null;
        }

        this.anchorElement_ = anchorElement;

        return anchorElement;
      },

      toggle() {
        this.open ? this.mdcFoundation.open() : this.mdcFoundation.close();
      },

      setAnchorCorner(Corner) {
        this.mdcFoundation.setAnchorCorner(Corner);
      },

      setFixedPosition(isFixed) {
        this.mdcFoundation.setFixedPosition(isFixed);
      },

      setAbsolutePosition(x, y) {
        this.mdcFoundation.setAbsolutePosition(x, y);
      },

      setIsHoisted() {
        this.mdcFoundation.setIsHoisted(this.hoisted);
      },

      onBodyClick(event) {
        this.mdcFoundation.handleBodyClick(event);
      },

      onKeydown(event) {
        this.mdcFoundation.handleKeydown(event);
      },

      onClosed() {
        this.open = false;
      },

      onOpened() {
        this.open = true;
      },

      //
      // Public methods
      //

      isOpen() {
        return this.mdcFoundation.isOpen();
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

      hasClass(className) {
        return this.$el.classList.contains(className);
      },

      hasAnchor() {
        return this.anchorElement_ ? true : false;
      },

      notifyClose() {
        emitCustomEvent(this.$el, strings.CLOSED_EVENT, {}, true);
        this.onClosed();
      },

      notifyOpen() {
        emitCustomEvent(this.$el, strings.OPENED_EVENT, {}, true);
        this.onOpened();
      },

      isElementInContainer(el) {
        return this.$el.contains(el);
      },

      isRTL() {
        return getComputedStyle(this.$el).getPropertyValue("direction") === "rtl";
      },

      setTransformOrigin(value) {
        let propertyName = `${util.getTransformPropertyName(window)}-origin`;

        this.$el.style.setProperty(propertyName, value);
      },

      isFocused() {
        return this.$el === document.activeElement;
      },

      saveFocus() {
        this.previousFocus = document.activeElement;
      },

      restoreFocus() {
        if(this.$el.contains(document.activeElement)) {
          if(this.previousFocus && this.previousFocus.focus) {
            this.previousFocus.focus();
          }
        }
      },

      getInnerDimensions() {
        return {
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight
        };
      },

      getAnchorDimensions() {
        return this.anchorElement_ ? this.anchorElement_.getBoundingClientRect() : null;
      },

      getWindowDimensions() {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },

      getBodyDimensions() {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },

      getWindowScroll() {
        return {x: window.pageXOffset, y: window.pageYOffset};
      },

      setPosition(position) {
        let rootHTML = this.$el;

        rootHTML.style.left = "left" in position ? `${ position.left }px` : "";
        rootHTML.style.right = "right" in position ? `${ position.right }px` : "";
        rootHTML.style.top = "top" in position ? `${ position.top }px` : "";
        rootHTML.style.bottom = "bottom" in position ? `${ position.bottom }px` : "";
      },

      setMaxHeight(height) {
        this.$el.style.maxHeight = height;
      }
    }
  }
</script>