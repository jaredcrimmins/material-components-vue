import {MDCSegmentedButtonFoundation, SegmentDetail} from '@material/segmented-button';
import Vue, {CreateElement, PropOptions, VNode} from 'vue';
import * as constants from '@material/segmented-button/segmented-button/constants';
import {emitCustomEvent} from '@/utils';

export type SegmentListType = {
  select: () => void;
  unselect: () => void;
  isSelected: () => boolean;
  getSegmentId: () => string | undefined;
  refreshIndex: () => void;
}[];

export const cssClasses = {
  ...constants.cssClasses,
  ...{
    ROOT: 'mdc-segmented-button'
  }
};

export default Vue.extend({
  name: 'mdc-segmented-button',

  provide(): object {
    return {
      mdcSegmentedButtonSegmentList__: this.segmentList,
      mdcSegmentedButtonSingleSelect__: this.singleSelect
    };
  },

  props: {
    singleSelect: Boolean,
    value: {
      default: () => [],
      validator(value: unknown) {
        if (typeof value === 'number') return true;

        if (!Array.isArray(value)) return false;

        return !value.map(val => typeof val === 'number').includes(false);
      }
    } as PropOptions<number[]>
  },

  data() {
    return {
      mdcFoundation: new MDCSegmentedButtonFoundation(
        MDCSegmentedButtonFoundation.defaultAdapter
      ),
      segmentList: <SegmentListType>[]
    };
  },

  mounted() {
    this.init();
  },

  updated() {
    this.refreshSelected();
  },

  beforeDestroy() {
    this.deinit();
  },

  render(c: CreateElement): VNode {
    return c(
      'div',
      {
        staticClass: 'mdc-segmented-button',
        class: {
          [cssClasses.SINGLE_SELECT]: this.singleSelect
        },
        on: {
          [constants.events.SELECTED]: this.onSelected
        }
      },
      this.$slots.default
    );
  },

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCSegmentedButtonFoundation(this);
      this.mdcFoundation.init();
      this.refreshSelected();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    refreshSelected() {
      const value = this.value;
      const selectedSegments = this.mdcFoundation.getSelectedSegments();

      // If a MDCSegmentedButtonSegment is added or removed, the indexes of the
      // remaining MDCSegmentedButtonSegments may be inaccurate, and these must
      // be updated.
      this.segmentList.forEach(segment => segment.refreshIndex());

      // If a MDCSegmentedButtonSegment is added or removed, which
      // MDCSegmentedButtonSegments that are selected needs to be revaluated,
      // and before that happens, each must be unselected.
      selectedSegments.forEach(selectedSegment => {
        const selectedSegmentIndex = selectedSegment.index;

        if (this.segmentList[selectedSegmentIndex].isSelected()) {
          this.segmentList[selectedSegmentIndex].unselect();
        }
      });

      // Select MDCSegmentedButtonSegments based on the value prop.
      if (this.singleSelect) {
        const selectedIndex = value[0];

        if (typeof selectedIndex === 'number')
          this.segmentList[selectedIndex].select();
      } else value.forEach(selectedIndex =>
          this.segmentList[selectedIndex].select()
        );
    },

    onSelected(event: CustomEvent<SegmentDetail>) {
      this.mdcFoundation.handleSelected(event.detail);
    },

    mappedSegments() {
      return this.segmentList.map((segment, index) => {
        return {
          index,
          selected: segment.isSelected(),
          segmentId: segment.getSegmentId()
        };
      });
    },

    //
    // Adapter methods
    //

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    getSegments() {
      return this.mappedSegments();
    },

    selectSegment(indexOrSegmentId: number | string) {
      const segmentDetail = this.mappedSegments().find(
        (_segmentDetail) => _segmentDetail.index === indexOrSegmentId ||
          _segmentDetail.segmentId === indexOrSegmentId);

      if (segmentDetail) this.segmentList[segmentDetail.index].select();
    },

    unselectSegment(indexOrSegmentId: number | string) {
      const segmentDetail = this.mappedSegments().find(
        (_segmentDetail) => _segmentDetail.index === indexOrSegmentId ||
          _segmentDetail.segmentId === indexOrSegmentId);

          if (segmentDetail) this.segmentList[segmentDetail.index].unselect();
    },

    notifySelectedChange(detail: SegmentDetail) {
      const {index, selected} = detail;
      const newValue = <number[]>[...this.value];

      if (this.singleSelect) newValue.splice(0, 1, index);
      else {
        if (selected) newValue.push(index);
        else newValue.splice(index, 1);
      }

      emitCustomEvent(this.$el, constants.events.CHANGE, detail, true);
      this.$emit('input', newValue);
    }
  }
});
