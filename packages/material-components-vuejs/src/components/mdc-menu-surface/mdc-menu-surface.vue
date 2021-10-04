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
  import {MDCMenuSurfaceFoundation} from "@material/menu-surface";
  import {emitCustomEvent} from "./../../utils";
  import {absolutelyPositionable} from "../../mixins";
  import {getCorrectPropertyName} from "@material/animation/util";

  const {cssClasses, strings} = MDCMenuSurfaceFoundation;

  export default {
    name: "mdc-menu-surface",

    mixins: [absolutelyPositionable],

    props: {
      anchorCorner: Number,
      anchorElement: {
        validator: value => {
          return ["string", "object"].includes(typeof value);
        }
      },
      fixedPosition: Boolean,
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

    beforeDestroy() {
      this.deinit();
    },

    watch: {
      absolutePosition(value) {
        this.setAbsolutePosition(value.x, value.y);
      },

      anchorCorner(value) {
        this.setAnchorCorner(value);
      },

      anchorElement() {
        if(this.$el) {
          this.getAnchorElement();
        }
      },

      fixedPosition(value) {
        this.setFixedPosition(value);
      },

      hoisted(value) {
        this.setIsHoisted(value);
      },

      quickOpen(value) {
        this.setQuickOpen(value);
      },

      open(value) {
        value ? this.mdcFoundation.open() : this.mdcFoundation.close();

        if(this.value !== value) {
          this.$emit("input", value);
        }
      },

      value(value) {
        this.open = value;
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
        this.setFixedPosition(this.fixedPosition);
        this.setIsHoisted(this.hoisted);
        this.setQuickOpen(this.quickOpen);
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

      setAbsolutePosition(x, y) {
        this.mdcFoundation.setAbsolutePosition(x, y);
      },

      setAnchorCorner(corner) {
        this.mdcFoundation.setAnchorCorner(corner);
      },

      setFixedPosition(isFixed) {
        this.mdcFoundation.setFixedPosition(isFixed);
      },

      setIsHoisted(isHoisted) {
        this.mdcFoundation.setIsHoisted(isHoisted);
      },

      setQuickOpen(quickOpen) {
        this.mdcFoundation.setQuickOpen(quickOpen);
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
        let propertyName = `${getCorrectPropertyName(window, "transform")}-origin`;

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

      getBodyDimensions() {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },

      getWindowDimensions() {
        return {
          width: window.innerWidth,
          height: window.innerHeight
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