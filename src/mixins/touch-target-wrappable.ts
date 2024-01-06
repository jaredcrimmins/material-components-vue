import Vue, {VueConstructor} from 'vue';

interface Injections {
  hasTouchTargetWrapperParent: boolean;
}

export default (<VueConstructor<Vue & Injections>>Vue).extend({
  name: 'touch-target-wrappable',

  inject: {
    hasTouchTargetWrapperParent: {
      from: 'mdcTouchTargetWrapperParent__',
      default: false
    }
  }
});
