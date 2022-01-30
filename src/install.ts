import {VueConstructor} from 'vue';
import * as components from './components';

export class MaterialComponentsVuejs {
  static installed = false;
  static version = '__VERSION__';

  static install(Vue: VueConstructor) {
    if(this.installed) return;
    this.installed = true;

    Vue.component('material-icon', components.MDCMaterialIcon);
    Vue.component('mdc-material-icon', components.MDCMaterialIcon);
    Vue.component('mdc-button', components.MDCButton);
    Vue.component('mdc-checkbox', components.MDCCheckbox);
    Vue.component('mdc-circular-progress', components.MDCCircularProgress);
    Vue.component('mdc-dialog', components.MDCDialog);
    Vue.component('mdc-dialog-actions', components.MDCDialogActions);
    Vue.component('mdc-dialog-button', components.MDCDialogButton);
    Vue.component('mdc-dialog-content', components.MDCDialogContent);
    Vue.component('mdc-dialog-title', components.MDCDialogTitle);
    Vue.component('mdc-floating-label', components.MDCFloatingLabel);
    Vue.component('mdc-icon-button', components.MDCIconButton);
    Vue.component('mdc-image-list', components.MDCImageList);
    Vue.component('mdc-image-list-item', components.MDCImageListItem);
    Vue.component('mdc-linear-progress', components.MDCLinearProgress);
    Vue.component('mdc-line-ripple', components.MDCLineRipple);
    Vue.component('mdc-list', components.MDCList);
    Vue.component('mdc-list-divider', components.MDCListDivider);
    Vue.component('mdc-list-group', components.MDCListGroup);
    Vue.component('mdc-list-item', components.MDCListItem);
    Vue.component('mdc-menu', components.MDCMenu);
    Vue.component('mdc-menu-anchor', components.MDCMenuAnchor);
    Vue.component('mdc-menu-divider', components.MDCMenuDivider);
    Vue.component('mdc-menu-item', components.MDCMenuItem);
    Vue.component('mdc-menu-selection-group', components.MDCMenuSelectionGroup);
    Vue.component('mdc-menu-surface', components.MDCMenuSurface);
    Vue.component('mdc-notched-outline', components.MDCNotchedOutline);
    Vue.component('mdc-radio', components.MDCRadio);
    Vue.component('mdc-ripple', components.MDCRipple);
    Vue.component('mdc-select', components.MDCSelect);
    Vue.component('mdc-snackbar', components.MDCSnackbar);
    Vue.component('mdc-switch', components.MDCSwitch);
    Vue.component('mdc-tab', components.MDCTab);
    Vue.component('mdc-tab-bar', components.MDCTabBar);
    Vue.component('mdc-text-field', components.MDCTextField);
    Vue.component('mdc-textfield', components.MDCTextField);
  }
}
