import {
  MDCChipInteractionEvent,
  MDCChipSetFoundation,
  MDCChipSelectionEvent,
  MDCChipRemovalEvent
} from '@material/chips';
import Vue, {CreateElement, PropOptions, VNode} from 'vue';
import {announce} from '@material/dom/announce';
import * as constants from '@material/chips/chip-set/constants';
import {chipStrings} from '@material/chips';

export const cssClasses = {
  ...constants.cssClasses,
  ...{
    ROOT: 'mdc-chip-set',
    INPUT: 'mdc-chip-set--input'
  }
};

export type ChipListType = {
  id: string;
  focus: () => void;
  focusPrimaryAction: () => void;
  focusTrailingAction: () => void;
  isSelected: () => boolean;
  refreshIndex: () => void;
  removeFocus: () => void;
  select: (selected: boolean, shouldNotifyClients: boolean) => void;
}[];

type ChipsPropType = {
  rippleDisabled?: boolean;
  leadingIcon?: string;
  hiddenLeadingIcon?: boolean;
  trailingAction?: boolean;
  trailingActionNavigable?: boolean;
  value?: boolean;
}[];

export default Vue.extend({
  name: 'mdc-chip-set',

  props: {
    chips: {
      default: () => [],
      validator(value: unknown) {
        if (!Array.isArray(value)) return false;

        for (const chip of value) {
          if (!chip || typeof chip !== 'object') return false;

          if (
            'rippleDisabled' in chip
            && typeof chip.rippleDisabled !== 'boolean'
          ) return false;

          if (
            'leadingIcon' in chip
            && typeof chip.leadingIcon !== 'string'
          ) return false;

          if (
            'hiddenLeadingIcon' in chip
            && typeof chip.hiddenLeadingIcon !== 'boolean'
          ) return false;

          if (
            'trailingAction' in chip
            && typeof chip.trailingAction !== 'boolean'
          ) return false;

          if (
            'trailingActionNavigable' in chip
            && typeof chip.trailingActionNavigable !== 'boolean'
          ) return false;

          if (
            'value' in chip
            && typeof chip.value !== 'boolean'
          ) return false;
        }

        return true;
      }
    } as PropOptions<ChipsPropType>,
    choice: Boolean,
    filter: Boolean,
    input: Boolean,
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
      chipList: [] as ChipListType,
      mdcFoundation: new MDCChipSetFoundation(
        MDCChipSetFoundation.defaultAdapter
      )
    };
  },

  provide(): object {
    return {
      mdcChipSetChipList__: this.chipList,
      mdcChipSetChoice__: this.choice,
      mdcChipSetFilter__: this.filter,
      mdcChipSetInput__: this.input
    };
  },

  render(c: CreateElement): VNode {
    return c(
      'div',
      {
        staticClass: cssClasses.ROOT,
        class: {
          [cssClasses.CHOICE]: this.choice,
          [cssClasses.FILTER]: this.filter,
          [cssClasses.INPUT]: this.input
        },
        attrs: {
          role: 'grid'
        },
        on: {
          [chipStrings.INTERACTION_EVENT]: this.onInteraction,
          [chipStrings.SELECTION_EVENT]: this.onSelection,
          [chipStrings.REMOVAL_EVENT]: this.onRemoval
        }
      },
      this.$slots.default
    )
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

  methods: {
    //
    // Private methods
    //

    init() {
      this.mdcFoundation = new MDCChipSetFoundation(this);
      this.mdcFoundation.init();
    },

    deinit() {
      this.mdcFoundation.destroy();
    },

    refreshSelected() {
      const value = this.value;

      // If a MDCChip is added or removed, the indexes of the remaining
      // MDCChips may be inaccurate, and these must be updated.
      this.chipList.forEach(segment => segment.refreshIndex());

      this.chipList.forEach((chip, index) => {
        if (value.includes(index)) {
          if (!chip.isSelected()) chip.select(true, false);
        } else {
          if (chip.isSelected()) chip.select(false, false);
        }
      });
    },

    onInteraction(event: MDCChipInteractionEvent) {
      this.mdcFoundation.handleChipInteraction(event.detail);
    },

    onSelection(event: MDCChipSelectionEvent) {
      const {detail} = event;

      this.mdcFoundation.handleChipSelection(detail);
      // this.$emit('input', detail.);
    },

    onRemoval(event: MDCChipRemovalEvent) {
      this.mdcFoundation.handleChipRemoval(event.detail);
    },

    //
    // Adapter methods
    //

    announceMessage(message: string) {
      announce(message);
    },

    focusChipPrimaryActionAtIndex(index: number) {
      this.chipList[index].focusPrimaryAction();
    },

    focusChipTrailingActionAtIndex(index: number) {
      this.chipList[index].focusTrailingAction();
    },

    getChipListCount() {
      return this.chipList.length;
    },

    getIndexOfChipById(chipId: string) {
      for (let x = 0; x < this.chipList.length; x++) {
        if (this.chipList[x].id === chipId) return x;
      }

      return -1;
    },

    hasClass(className: string) {
      return this.$el.classList.contains(className);
    },

    isRTL() {
      return window.getComputedStyle(this.$el)
        .getPropertyValue('direction') === 'rtl';
    },

    removeChipAtIndex(index: number) {
      this.$emit('remove-chip', index);
    },

    removeFocusFromChipAtIndex(index: number) {
      this.chipList[index].removeFocus();
    },

    selectChipAtIndex(
      index: number,
      selected: boolean,
      shouldNotifyClients: boolean
    ) {
      this.chipList[index].select(selected, shouldNotifyClients);
    }
  }
});
