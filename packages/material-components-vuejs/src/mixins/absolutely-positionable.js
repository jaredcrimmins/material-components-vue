export default {
  name: 'absolutely-positionable',

  props: {
    absolutePosition: {
      type: Object,
      validator: value => {
        return Number.isFinite(value.x) && Number.isFinite(value.y);
      }
    }
  }
}