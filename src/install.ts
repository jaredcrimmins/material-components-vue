import {VueConstructor} from 'vue';
import * as components from './components';

export class MaterialComponentsVue {
  static installed = false;

  static install(Vue: VueConstructor) {
    if(this.installed) return;
    this.installed = true;

    Vue.component('material-icon', components.MDCMaterialIcon);
    Vue.component('mdc-banner', components.MDCBanner);
    Vue.component('mdc-material-icon', components.MDCMaterialIcon);
    Vue.component('mdc-button', components.MDCButton);
    Vue.component('mdc-card', components.MDCCard);
    Vue.component('mdc-card-action-buttons', components.MDCCardActionButtons);
    Vue.component('mdc-card-action-icons', components.MDCCardActionIcons);
    Vue.component('mdc-card-actions', components.MDCCardActions);
    Vue.component('mdc-card-button', components.MDCCardButton);
    Vue.component('mdc-card-icon-button', components.MDCCardIconButton);
    Vue.component('mdc-card-media', components.MDCCardMedia);
    Vue.component('mdc-card-primary-action', components.MDCCardPrimaryAction);
    Vue.component('mdc-checkbox', components.MDCCheckbox);
    Vue.component('mdc-circular-progress', components.MDCCircularProgress);
    Vue.component('mdc-dialog', components.MDCDialog);
    Vue.component('mdc-dialog-actions', components.MDCDialogActions);
    Vue.component('mdc-dialog-button', components.MDCDialogButton);
    Vue.component('mdc-dialog-content', components.MDCDialogContent);
    Vue.component('mdc-dialog-title', components.MDCDialogTitle);
    Vue.component('mdc-form-field', components.MDCFormField);
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
    Vue.component('mdc-slider', components.MDCSlider);
    Vue.component('mdc-snackbar', components.MDCSnackbar);
    Vue.component('mdc-switch', components.MDCSwitch);
    Vue.component('mdc-tab', components.MDCTab);
    Vue.component('mdc-tab-bar', components.MDCTabBar);
    Vue.component('mdc-text-field', components.MDCTextField);
    Vue.component('mdc-textfield', components.MDCTextField);
    Vue.component('mdc-tooltip', components.MDCTooltip);
    Vue.component('mdc-tooltip-action', components.MDCTooltipAction);
    Vue.component('mdc-tooltip-content', components.MDCTooltipContent);
    Vue.component('mdc-tooltip-content-link', components.MDCTooltipContentLink);
    Vue.component('mdc-tooltip-rich-actions', components.MDCTooltipRichActions);
    Vue.component('mdc-tooltip-title', components.MDCTooltipTitle);
    Vue.component('mdc-tooltip-wrapper', components.MDCTooltipWrapper);
  }
}
