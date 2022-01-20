import Vue, {PropType, VueConstructor} from 'vue';

export type NativeEventListener = (ev: any) => any;

export function domPropDefFactory(defaultValue: boolean): {type: typeof Boolean};
export function domPropDefFactory(defaultValue?: string | number | null): {
  type: PropType<string | number | null>,
  default: string | number | null
};
export function domPropDefFactory(defaultValue: string): {type: PropType<string | null>, default: string | null};
export function domPropDefFactory(defaultValue: number): {type: PropType<number | null>, default: number | null};
export function domPropDefFactory(defaultValue: string | number | boolean | null = null) {
  if (typeof defaultValue === 'boolean') return {type: Boolean};

  return {
    type: <PropType<string | number | null>>[String, Number],
    default: defaultValue
  };
}

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

export function mixins<T extends VueConstructor[]> (...args: T): ExtractVue<T> extends infer V ? V extends Vue ? VueConstructor<V> : never : never
export function mixins<T extends Vue> (...args: VueConstructor[]): VueConstructor<T>
export function mixins (...args: VueConstructor[]): VueConstructor {
  return Vue.extend({ mixins: args })
}

/**
 * Returns the instance type from a VueConstructor
 * Useful for adding types when using mixins().extend()
 */
export type ExtractVue<T extends VueConstructor | VueConstructor[]> = T extends (infer U)[]
  ? UnionToIntersection<
    U extends VueConstructor<infer V> ? V : never
  >
  : T extends VueConstructor<infer V> ? V : never

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
