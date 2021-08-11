export function emitCustomEvent(el, evtType, evtData, shouldBubble = false) {
  // evtType = evtType.toLowerCase();

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

  el.dispatchEvent(evt);
}

export function getSlot (vm, name = 'default', data, optional = false) {
  if (vm.$scopedSlots[name]) {
    return vm.$scopedSlots[name](data instanceof Function ? data() : data);
  } else if (vm.$slots[name] && (!data || optional)) {
    return vm.$slots[name];
  }

  return undefined;
}

export function hasSlot (vm, name = 'default') {
  return !!vm.$scopedSlots[name];
}
