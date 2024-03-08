import {MDCButton} from '@/components/mdc-button';
import {mount} from '@vue/test-utils';

// The MDCButton component needs to use the mount test utility, instead of
// shallowMount, to be tested properly, since its functionality and rendering
// are deeply dependent on the MDCRipple component.

describe('MDCButton', () => {
  it('renders default slot content', () => {
    const defaultSlot = 'Press Me';
    const wrapper = mount(MDCButton, {
      slots: {
        default: defaultSlot
      }
    });

    expect(wrapper.text()).toMatch(defaultSlot);
  });

  it('styles correctly when props.outlined is passed', () => {
    const outlinedClass = 'mdc-button--outlined';
    const wrapper = mount(MDCButton, {
      propsData: {
        outlined: true
      }
    });

    expect(wrapper.classes()).toContain(outlinedClass);
  });

  it('styles correctly when props.raised is passed', () => {
    const raisedClass = 'mdc-button--raised';
    const wrapper = mount(MDCButton, {
      propsData: {
        raised: true
      }
    });

    expect(wrapper.classes()).toContain(raisedClass);
  });

  it('styles correctly when props.unelevated is passed', () => {
    const unelevatedClass = 'mdc-button--unelevated';
    const wrapper = mount(MDCButton, {
      propsData: {
        unelevated: true
      }
    });

    expect(wrapper.classes()).toContain(unelevatedClass);
  });

  it('is disabled when props.disabled is passed', () => {
    const wrapper = mount(MDCButton, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.attributes()).toHaveProperty('disabled', 'disabled');
  });

  it('styles correctly when provide.mdcTouchTargetWrapperParent__ is passed', () => {
    const touchClass = 'mdc-button--touch';
    const wrapper = mount(MDCButton, {
      provide: {
        mdcTouchTargetWrapperParent__: true
      }
    });

    expect(wrapper.classes()).toContain(touchClass);
  });

  it('is <a> element when props.tag is \'a\' and props.to is passed', () => {
    const wrapper = mount(MDCButton, {
      propsData: {
        tag: 'a',
        to: '#'
      }
    });

    expect(wrapper.element.tagName.toLowerCase()).toEqual('a');
  });

  it('has href attribute set when props.tag is \'a\' and props.to is passed', () => {
    const to = '#';
    const wrapper = mount(MDCButton, {
      propsData: {
        tag: 'a',
        to
      }
    });

    expect(wrapper.attributes()).toHaveProperty('href', to);
  });

  it('renders append scoped slot content', () => {
    const appendSlotContent = 'append icon';
    const appendSlot = () => appendSlotContent;
    const wrapper = mount(MDCButton, {
      scopedSlots: {
        append: appendSlot
      }
    });

    expect(wrapper.html()).toContain(appendSlotContent);
  });

  it('renders trailing scoped slot content', () => {
    const trailingSlotContent = 'trailing icon';
    const trailingSlot = () => trailingSlotContent;
    const wrapper = mount(MDCButton, {
      scopedSlots: {
        trailing: trailingSlot
      }
    });

    expect(wrapper.html()).toContain(trailingSlotContent);
  });
});
