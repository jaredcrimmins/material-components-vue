import * as components from "./components";

class MaterialComponentsVuejs {}

MaterialComponentsVuejs.install = function(Vue) {
  if(this.install.installed) return;
  this.install.installed = true;

  Vue.component("material-icon", components.MaterialIcon);
  Vue.component("mdc-material-icon", components.MaterialIcon);
  Vue.component("mdc-button", components.MDCButton);
  Vue.component("mdc-checkbox", components.MDCCheckbox);
  Vue.component("mdc-circular-progress", components.MDCCircularProgress);
  Vue.component("mdc-floating-label", components.MDCFloatingLabel);
  Vue.component("mdc-icon-button", components.MDCIconButton);
  Vue.component("mdc-image-list", components.MDCImageList);
  Vue.component("mdc-image-list-item", components.MDCImageListItem);
  Vue.component("mdc-linear-progress", components.MDCLinearProgress);
  Vue.component("mdc-line-ripple", components.MDCLineRipple);
  Vue.component("mdc-list", components.MDCList);
  Vue.component("mdc-list-item", components.MDCListItem);
  Vue.component("mdc-menu", components.MDCMenu);
  Vue.component("mdc-menu-surface", components.MDCMenuSurface);
  Vue.component("mdc-notched-outline", components.MDCNotchedOutline);
  Vue.component("mdc-select", components.MDCSelect);
  Vue.component("mdc-snackbar", components.MDCSnackbar);
  Vue.component("mdc-switch", components.MDCSwitch);
  Vue.component("mdc-tab", components.MDCTab);
  Vue.component("mdc-tab-bar", components.MDCTabBar);
  Vue.component("mdc-text-field", components.MDCTextField);
  Vue.component("mdc-textfield", components.MDCTextField);
}

MaterialComponentsVuejs.version = "__VERSION__";

export default MaterialComponentsVuejs;