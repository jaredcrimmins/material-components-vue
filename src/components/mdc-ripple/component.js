"use-strict"

import { applyPassive } from "@material/dom/events";
import { matches } from "@material/dom/ponyfill";
import { MDCRipple } from "@material/ripple";
import { supportsCssVariables } from "@material/ripple/util";

export default {
    name: "MDCButton",

    props: {
        unbounded: Boolean
    },

    render(createElement) {
        return createElement(
            "div",
            {
                class: "mdc-ripple-surface"
            }
        );
    },

    methods: {
        addClass(className) {
            this.$el.classList.add(className);
        },
        browserSupportsCssVars() {
            return supportsCssVariables(window);
        },
        computeBoundingRect() {
            return this.$el.getBoundingClientRect();
        },
        containsEventTarget(target) {
            return this.$el.contains(target);
        },
        deregisterDocumentInteractionHandler(evtType, handler) {
            document.documentElement.removeEventListener(evtType, handler, applyPassive());
        },
        deregisterInteractionHandler(evtType, handler) {
            this.$el.removeEventListener(evtType, handler, applyPassive());
        },
        deregisterResizeHandler(handler) {
            window.removeEventListener("resize", handler);
        },
        getWindowPageOffset() {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            };
        },
        isSurfaceActive() {
            return matches(this.$el, ":active");
        },
        isSurfaceDsiabled() {
            return !this.isSurfaceActive();
        },
        isUnbounded() {
            return this.unbounded;
        },
        registerDocumentInteractionHandler(evtType, handler) {
            document.documentElement.addEventListener(evtType, handler, applyPassive());
        },
        registerInteractionHandler(evtType, handler) {
            this.$el.addEventListener(evtType, handler, applyPassive());
        },
        registerResizeHandler(handler) {
            window.addEventListener("resize", handler);
        },
        removeClass(className) {
            this.$el.classList.remove(className);
        },
        updateCssVariables(varName, value) {
            return this.$el.style.setProperty(varName, value);
        }
    }
}