import {EventType, SpecificEventListener} from '@material/base';
import {MDCRipple} from '../mdc-ripple';
import {MDCSliderFoundation, Thumb, TickMark, cssClasses, events} from '@material/slider';
import Vue, {CreateElement, PropOptions, VNode} from 'vue';
import {emitCustomEvent} from '@/utils';


const _cssClasses = {
  ...{
    ROOT: 'mdc-slider'
  },
  ...cssClasses
};

type RippleRef<T = InstanceType<typeof MDCRipple>> = T | T[];
type ThumbElRef = HTMLElement | HTMLElement[];
type ThumbKnobElRef = HTMLElement | HTMLElement[];
type InputElRef = HTMLInputElement | HTMLInputElement[];
type ValueIndicatorTextElRef = HTMLElement | HTMLElement[];

export default Vue.extend({
  name: 'mdc-slider',

  components: {
    'mdc-ripple': MDCRipple
  },

  props: {
    disabled: Boolean,
    discrete: Boolean,
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: null,
      validator(value: number) {
        if (typeof value !== 'number') return false;

        if (value < 1) return false;

        return true;
      }
    },
    tickMarks: Boolean,
    value: {
      required: true,
      validator(value: unknown) {
        if (typeof value === 'number') return true;

        if (!Array.isArray(value)) return false;

        return !value.map(val => typeof val === 'number').includes(false);
      }
    } as PropOptions<number | number[]>
  },

  data() {
    return {
      mdcFoundation: new MDCSliderFoundation(
        MDCSliderFoundation.defaultAdapter
      ),
      trackActiveStyle: {} as {[propertyName: string]: string},
      thumbStartClasses: {} as {[className: string]: boolean},
      thumbEndClasses: {} as {[className: string]: boolean},
      thumbStartStyle: {} as {[propertyName: string]: string},
      thumbEndStyle: {} as {[propertyName: string]: string},
      valueToAriaValueTextFn: null as ((value: number) => string) | null
    };
  },

  computed: {
    isRange() {
      return Array.isArray(this.value);
    }
  },

  mounted() {
    this.init();
  },

  destroyed() {
    this.deinit();
  },

  render(c: CreateElement): VNode {
    const children: VNode[] = [];

    if (this.isRange) {
      children.push(this.genInput(c, Thumb.START));
      children.push(this.genInput(c, Thumb.END));
      children.push(this.genTrack(c));

      if (this.tickMarks) children.push(this.genTickMarks(c));

      children.push(this.genThumb(c, Thumb.START));
      children.push(this.genThumb(c, Thumb.END));
    } else {
      children.push(this.genInput(c, Thumb.END));

      children.push(this.genTrack(c));

      if (this.tickMarks) children.push(this.genTickMarks(c));

      children.push(this.genThumb(c, Thumb.END));
    }

    return c(
      'div',
      {
        staticClass: _cssClasses.ROOT,
        class: {
          [_cssClasses.DISABLED]: this.disabled,
          [cssClasses.DISCRETE]: this.discrete,
          [cssClasses.TICK_MARKS]: this.tickMarks,
          [cssClasses.RANGE]: this.isRange
        }
      },
      children
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCSliderFoundation(this);
      this.mdcFoundation.init();
      this.mdcFoundation.layout();
      this.mdcFoundation.setDisabled(this.disabled);
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    genInput(c: CreateElement, thumb: Thumb) {
      return c(
        'input',
        {
          ref: 'inputEl',
          refInFor: this.isRange,
          staticClass: cssClasses.INPUT,
          attrs: this.getInputAttrs(thumb)
        }
      );
    },

    genTrack(c: CreateElement) {
      return c(
        'div',
        {
          staticClass: cssClasses.TRACK
        },
        [
          c(
            'div',
            {
              staticClass: 'mdc-slider__track--inactive'
            }
          ),
          c(
            'div',
            {
              staticClass: 'mdc-slider__track--active'
            },
            [
              c(
                'div',
                {
                  staticClass: cssClasses.TRACK_ACTIVE,
                  style: this.trackActiveStyle
                }
              )
            ]
          )
        ]
      );
    },

    genTickMarks(c: CreateElement) {
      const children: VNode[] = [];
      const numTickMarks = (this.max / this.step) + 1;
      const isActive = (tickValue: number) => {
        // Deep copy this.value to avoid an infinite loop in the render
        // function.
        const value = <number[]>JSON.parse(JSON.stringify(this.value));

        if (typeof value === 'number') return tickValue <= value;
        else {
          const sortedRange = value.sort((a, b) => a - b);

          return sortedRange[0] <= tickValue && sortedRange[1] >= tickValue;
        }
      };

      for (let x = 0; x < numTickMarks; x++) {
        const tickValue = this.step * x;

        children.push(
          c(
            'div',
            {
              staticClass: isActive(tickValue)
                ? cssClasses.TICK_MARK_ACTIVE
                : cssClasses.TICK_MARK_INACTIVE
            }
          )
        );
      }

      return c(
        'div',
        {
          staticClass: cssClasses.TICK_MARKS_CONTAINER
        },
        children
      );
    },

    genThumb(c: CreateElement, thumb: Thumb) {
      const children: VNode[] = [];

      if (this.discrete) children.push(this.genValueIndicator(c, thumb));

      children.push(
        c(
          'div',
          {
            ref: 'thumbKnobEl',
            refInFor: this.isRange,
            staticClass: cssClasses.THUMB_KNOB
          }
        )
      );

      return c(
        'mdc-ripple',
        {
          ref: 'ripple',
          refInFor: this.isRange,
          props: {
            unbounded: true
          },
          scopedSlots: {
            root: ({cssClass, on, style}) => {
              return c(
                'div',
                {
                  ref: 'thumbEl',
                  refInFor: this.isRange,
                  staticClass: cssClasses.THUMB,
                  class: {
                    ...cssClass,
                    ...(
                      thumb === Thumb.START
                        ? this.thumbStartClasses
                        : this.thumbEndClasses
                      )
                  },
                  on,
                  style: {
                    ...style,
                    ...(
                      thumb === Thumb.START
                        ? this.thumbStartStyle
                        : this.thumbEndStyle
                      )
                  }
                },
                children
              );
            }
          }
        }
      );
    },

    genValueIndicator(c: CreateElement, thumb: Thumb) {
      return c(
        'div',
        {
          staticClass: 'mdc-slider__value-indicator-container',
          attrs: {
            'aria-hidden': true
          }
        },
        [
          c(
            'div',
            {
              staticClass: 'mdc-slider__value-indicator'
            },
            [
              c(
                'span',
                {
                  ref: 'valueIndicatorTextEl',
                  refInFor: this.isRange,
                  staticClass: cssClasses.VALUE_INDICATOR_TEXT
                },
                `${this.getValue(thumb)}`
              )
            ]
          )
        ]
      );
    },

    getInputAttrs(thumb: Thumb) {
      const baseAttrs = {
        ...this.$attrs,
        ...{
          step: this.step,
          type: 'range',
          min: this.min,
          max: this.max,
          value: this.getValue(thumb)
        }
      };

      return {
        ...{name: thumb === Thumb.START ? 'rangeStart' : 'rangeEnd'},
        ...baseAttrs
      };
    },

    getValue(thumb: Thumb) {
      if (this.isRange) {
        const value = <number[]>this.value;

        return thumb === Thumb.START ? value[0] : value[1];
      } else return <number>this.value;
    },

    getInputEl(thumb: Thumb) {
      const inputElRef = <InputElRef>this.$refs.inputEl;
      const inputEls = Array.isArray(inputElRef) ? inputElRef : [inputElRef];

      return thumb === Thumb.END ? inputEls[inputEls.length - 1] : inputEls[0];
    },

    getRipple(thumb: Thumb) {
      const rippleRef = <RippleRef>this.$refs.ripple;
      const rippleVNodes = Array.isArray(rippleRef) ? rippleRef : [rippleRef];

      return thumb === Thumb.END ? rippleVNodes[rippleVNodes.length - 1] : rippleVNodes[0];
    },

    getThumbEl(thumb: Thumb) {
      const thumbElRef = <ThumbElRef>this.$refs.thumbEl;
      const thumbEls = Array.isArray(thumbElRef) ? thumbElRef : [thumbElRef];

      return thumb === Thumb.END ? thumbEls[thumbEls.length - 1] : thumbEls[0];
    },

    getThumbKnobEl(thumb: Thumb) {
      const thumbKnobElRef = <ThumbKnobElRef>this.$refs.thumbKnobEl;
      const thumbKnobEls = Array.isArray(thumbKnobElRef) ? thumbKnobElRef : [thumbKnobElRef];

      return thumb === Thumb.END
        ? thumbKnobEls[thumbKnobEls.length - 1]
        : thumbKnobEls[0];
    },

    getValueIndicatorTextEl(thumb: Thumb) {
      const valueIndicatorTextElRef
        = <ValueIndicatorTextElRef>this.$refs.valueIndicatorTextEl;
      const valueIndicatorTextEls = Array.isArray(valueIndicatorTextElRef)
        ? valueIndicatorTextElRef
        : [valueIndicatorTextElRef];

      return thumb === Thumb.END
        ? valueIndicatorTextEls[valueIndicatorTextEls.length - 1]
        : valueIndicatorTextEls[0];
    },

    //
    // Adapter methods
    //

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    addClass(className: string) {
      this.$el.classList.add(className);
    },

    removeClass(className: string) {
      this.$el.classList.remove(className);
    },

    addThumbClass(className: string, thumb: Thumb) {
      if (thumb === Thumb.START)
        this.thumbStartClasses = {
          ...this.thumbStartClasses,
          [className]: true
        };
      else
        this.thumbEndClasses = {...this.thumbEndClasses, [className]: true};
    },

    removeThumbClass(className: string, thumb: Thumb) {
      if (thumb === Thumb.START)
        this.thumbStartClasses = {
          ...this.thumbStartClasses,
          [className]: false
        };
      else
        this.thumbEndClasses = {...this.thumbEndClasses, [className]: false};
    },

    getAttribute(attribute: string) {
      return this.$el.getAttribute(attribute);
    },

    getInputValue(thumb: Thumb) {
      return this.getInputEl(thumb).value;
    },

    setInputValue(value: string, thumb: Thumb) {
      this.getInputEl(thumb).value = value;
    },

    getInputAttribute(attribute: string, thumb: Thumb) {
      return this.getInputEl(thumb).getAttribute(attribute);
    },

    setInputAttribute(attribute: string, value: string, thumb: Thumb) {
      this.getInputEl(thumb).setAttribute(attribute, value);
    },

    removeInputAttribute(attribute: string, thumb: Thumb) {
      this.getInputEl(thumb).removeAttribute(attribute);
    },

    focusInput(thumb: Thumb) {
      this.getInputEl(thumb).focus();
    },

    isInputFocused(thumb: Thumb) {
      return this.getInputEl(thumb) === document.activeElement;
    },

    getThumbKnobWidth(thumb: Thumb) {
      return this.getThumbKnobEl(thumb).getBoundingClientRect().width;
    },

    getThumbBoundingClientRect(thumb: Thumb) {
      return this.getThumbEl(thumb).getBoundingClientRect();
    },

    getBoundingClientRect() {
      return this.$el.getBoundingClientRect();
    },

    isRTL() {
      return getComputedStyle(this.$el).direction === 'rtl';
    },

    setThumbStyleProperty(propertyName: string, value: string, thumb: Thumb) {
      if (thumb === Thumb.START)
        this.thumbStartStyle = {
          ...this.thumbStartStyle,
          [propertyName]: value
        };
      else
        this.thumbEndStyle = {
          ...this.thumbEndStyle,
          [propertyName]: value
        };
    },

    removeThumbStyleProperty(propertyName: string, thumb: Thumb) {
      if (thumb === Thumb.START) {
        const copy = {...this.thumbStartStyle};

        delete copy[propertyName];

        this.thumbStartStyle = copy;
      } else {
        const copy = {...this.thumbEndStyle};

        delete copy[propertyName];

        this.thumbEndStyle = copy;
      }
    },

    setTrackActiveStyleProperty(propertyName: string, value: string) {
      this.trackActiveStyle = {
        ...this.trackActiveStyle,
        [propertyName]: value,
      };
    },

    removeTrackActiveStyleProperty(propertyName: string) {
      const copy = {...this.trackActiveStyle};

      delete this.trackActiveStyle[propertyName];

      this.trackActiveStyle = copy;
    },

    setValueIndicatorText(value: number, thumb: Thumb) {
      const valueIndicatorTextEl = this.getValueIndicatorTextEl(thumb);

      valueIndicatorTextEl.textContent = String(value);
    },

    getValueToAriaValueTextFn() {
      return this.valueToAriaValueTextFn;
    },

    updateTickMarks(tickMarks: TickMark[]) {
      // The render function handles adding/removing tick marks. This adapter
      // method does not require an implementation, but it must be defined.
    },

    setPointerCapture(pointerId: number) {
      this.$el.setPointerCapture(pointerId);
    },

    emitChangeEvent(value: number, thumb: Thumb) {
      emitCustomEvent(this.$el, events.CHANGE, {value, thumb});
    },

    emitInputEvent(value: number, thumb: Thumb) {
      emitCustomEvent(this.$el, events.INPUT, {value, thumb});

      if (!this.isRange) this.$emit('input', value);
      else {
        const newValue = <number[]>this.value;

        if (thumb === Thumb.START) newValue[0] = value;
        else newValue[1] = value;

        this.$emit('input', newValue);
      }
    },

    emitDragStartEvent(value: number, thumb: Thumb) {
      this.getRipple(thumb).activate();
    },

    emitDragEndEvent(value: number, thumb: Thumb) {
      this.getRipple(thumb).deactivate();
    },

    registerEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>) {
      (<HTMLElement>this.$el).addEventListener(evtType, handler);
    },

    deregisterEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>) {
      (<HTMLElement>this.$el).removeEventListener(evtType, handler);
    },

    registerThumbEventHandler<K extends EventType>(thumb: Thumb, evtType: K, handler: SpecificEventListener<K>) {
      this.getThumbEl(thumb).addEventListener(evtType, handler);
    },

    deregisterThumbEventHandler<K extends EventType>(thumb: Thumb, evtType: K, handler: SpecificEventListener<K>) {
      this.getThumbEl(thumb).removeEventListener(evtType, handler);
    },

    registerInputEventHandler<K extends EventType>(thumb: Thumb, evtType: K, handler: SpecificEventListener<K>) {
      this.getInputEl(thumb).addEventListener(evtType, handler);
    },

    deregisterInputEventHandler<K extends EventType>(thumb: Thumb, evtType: K, handler: SpecificEventListener<K>) {
      this.getInputEl(thumb).removeEventListener(evtType, handler);
    },

    registerBodyEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>) {
      document.body.addEventListener(evtType, handler);
    },

    deregisterBodyEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>) {
      document.body.removeEventListener(evtType, handler);
    },

    registerWindowEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>) {
      window.addEventListener(evtType, handler);
    },

    deregisterWindowEventHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>) {
      window.removeEventListener(evtType, handler);
    }
  }
});
