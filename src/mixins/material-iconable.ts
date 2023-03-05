import Vue, {PropOptions} from 'vue';

export enum MaterialIconVariant {
  Filled = "filled",
  Outlined = "outlined",
  Rounded = "rounded",
  Sharp = "sharp",
  TwoTone = "two-tone"
}

export default Vue.extend({
  name: 'material-iconable',

  props: {
    iconVariant: {
      default: MaterialIconVariant.Filled,
      validator(value: string) {
        if (typeof value !== 'string') return false;

        return Object.values<string>(MaterialIconVariant).includes(value);
      }
    } as PropOptions<`${MaterialIconVariant}`>
  }
});
