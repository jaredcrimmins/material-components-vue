import Vue from 'vue';

export function emitCustomEvent(el: Element, evtType: any, evtData: any, shouldBubble = false) {
  const createCustomEvent = () => {
    const evt = document.createEvent('CustomEvent');

    return evt.initCustomEvent(evtType, shouldBubble, false, evtData);
  };

  const evt =
    typeof CustomEvent === "function"
      ? new CustomEvent(evtType, {
          detail: evtData,
          bubbles: shouldBubble,
        })
      : createCustomEvent();

  evt && el.dispatchEvent(evt);
}

/**
 * Returns:
 *  - 'normal' for old style slots - `<template slot="default">`
 *  - 'scoped' for old style scoped slots (`<template slot="default" slot-scope="data">`) or bound v-slot (`#default="data"`)
 *  - 'v-slot' for unbound v-slot (`#default`) - only if the third param is true, otherwise counts as scoped
 */
export function getSlotType<T extends boolean = false>(vm: Vue, name: string, split?: T): (T extends true ? 'v-slot' : never) | 'normal' | 'scoped' | void {
  if (vm.$slots[name] && vm.$scopedSlots[name] && (vm.$scopedSlots[name] as any).name) {
    return split ? 'v-slot' as any : 'scoped'
  }
  if (vm.$slots[name]) return 'normal'
  if (vm.$scopedSlots[name]) return 'scoped'
}

export function getSlot(vm: Vue, name = 'default', data?: object | (() => object), optional = false) {
  if (vm.$scopedSlots[name]) {
    return vm.$scopedSlots[name]!(data instanceof Function ? data() : data);
  } else if (vm.$slots[name] && (!data || optional)) {
    return vm.$slots[name];
  }

  return undefined;
}

export function hasSlot(vm: Vue, name = 'default') {
  return !!vm.$scopedSlots[name];
}
