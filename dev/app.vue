<template>
  <div id="app">
    <mdc-drawer
      :modal="mdcDrawerIsModal"
      :dismissible="!mdcDrawerIsModal"
      v-model="mdcDrawerOpen"
    >
      <mdc-drawer-list>
        <mdc-drawer-list-item
          tag="a"
          to="#"
        >
          Inbox
        </mdc-drawer-list-item>
        <mdc-drawer-list-item>Outgoing</mdc-drawer-list-item>
        <mdc-drawer-list-item>Drafts</mdc-drawer-list-item>
      </mdc-drawer-list>
    </mdc-drawer>

    <mdc-drawer-scrim v-if="mdcDrawerIsModal" />

    <div class="mdc-drawer-app-content">
      <mdc-top-app-bar
        class="app-bar"
        title="Page title"
        navigation-icon
        @navigation="mdcDrawerOpen = !mdcDrawerOpen"
      >
        <template #actions>
          <mdc-top-app-bar-action-item
            icon="favorite"
            aria-label="Favorite"
          />
          <mdc-top-app-bar-action-item
            icon="search"
            aria-label="Search"
          />
          <mdc-top-app-bar-action-item
            icon="more_vert"
            aria-label="Options"
          />
        </template>
      </mdc-top-app-bar>

      <main class="main-content">
        <div class="mdc-top-app-bar--fixed-adjust">
          <button @click="onSwitchDrawerButtonClick">
            {{ switchMdcDrawerButtonLabel }}
          </button>
          <button @click="onOpenDrawerButtonClick">
            Open {{ activeMdcDrawer }} Drawer
          </button>

          <the-debug-mdc-banner />

          <the-debug-mdc-button />

          <the-debug-mdc-card />

          <the-debug-mdc-checkbox />

          <the-debug-mdc-chips />

          <the-debug-mdc-circular-progress />

          <the-debug-mdc-dialog />

          <the-debug-mdc-drawer />

          <the-debug-mdc-fab />

          <the-debug-mdc-form-field />

          <the-debug-mdc-icon-button />

          <the-debug-mdc-image-list />

          <the-debug-mdc-layout-grid />

          <the-debug-mdc-linear-progress />

          <the-debug-mdc-list />

          <the-debug-mdc-material-icon />

          <the-debug-mdc-menu />

          <the-debug-mdc-radio />

          <the-debug-mdc-ripple />

          <the-debug-mdc-segmented-button />

          <the-debug-mdc-select />

          <the-debug-mdc-slider />

          <the-debug-mdc-snackbar />

          <the-debug-mdc-switch />

          <the-debug-mdc-tabs />

          <the-debug-mdc-text-field />

          <the-debug-mdc-tooltip />

          <the-debug-mdc-touch-target />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import * as components from './components';
  import cryptoRandomString from 'crypto-random-string';
    
  export default {
    components: {
      'the-debug-mdc-banner': components.TheDebugMDCBanner,
      'the-debug-mdc-button': components.TheDebugMDCButton,
      'the-debug-mdc-card': components.TheDebugMDCCard,
      'the-debug-mdc-checkbox': components.TheDebugMDCCheckbox,
      'the-debug-mdc-chips': components.TheDebugMDCChips,
      'the-debug-mdc-circular-progress': components.TheDebugMDCCircularProgress,
      'the-debug-mdc-dialog': components.TheDebugMDCDialog,
      'the-debug-mdc-drawer': components.TheDebugMDCDrawer,
      'the-debug-mdc-fab': components.TheDebugMDCFab,
      'the-debug-mdc-form-field': components.TheDebugMDCFormField,
      'the-debug-mdc-icon-button': components.TheDebugMDCIconButton,
      'the-debug-mdc-image-list': components.TheDebugMDCImageList,
      'the-debug-mdc-layout-grid': components.TheDebugMDCLayoutGrid,
      'the-debug-mdc-linear-progress': components.TheDebugMDCLinearProgress,
      'the-debug-mdc-list': components.TheDebugMDCList,
      'the-debug-mdc-material-icon': components.TheDebugMDCMaterialIcon,
      'the-debug-mdc-menu': components.TheDebugMDCMenu,
      'the-debug-mdc-radio': components.TheDebugMDCRadio,
      'the-debug-mdc-ripple': components.TheDebugMDCRipple,
      'the-debug-mdc-segmented-button': components.TheDebugMDCSegmentedButton,
      'the-debug-mdc-snackbar': components.TheDebugMDCSnackbar,
      'the-debug-mdc-select': components.TheDebugMDCSelect,
      'the-debug-mdc-slider': components.TheDebugMDCSlider,
      'the-debug-mdc-switch': components.TheDebugMDCSwitch,
      'the-debug-mdc-tabs': components.TheDebugMDCTabs,
      'the-debug-mdc-text-field': components.TheDebugMDCTextField,
      'the-debug-mdc-tooltip': components.TheDebugMDCTooltip,
      'the-debug-mdc-touch-target': components.TheDebugMDCTouchTarget
    },

    data() {
      return {
        mdcDataTableHeaders: [
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Given name',
            value: 'givenName'
          },
          {
            text: 'Family name',
            value: 'familyName'
          }
        ],
        mdcDataTableItems: [],
        mdcDrawerIsModal: true,
        mdcDrawerOpen: false,
        mdcDrawerDismissibleOpen: false,
        mdcSnackbarOpen: true
      };
    },

    computed: {
      activeMdcDrawer() {
        return this.mdcDrawerIsModal ?
          'Modal' :
          'Dismissible';
      },

      switchMdcDrawerButtonLabel() {
        const inactiveMdcDrawerType = this.mdcDrawerIsModal ?
          'Dismissible' :
          'Modal';

        return `Switch to ${inactiveMdcDrawerType} Drawer`;
      }
    },

    mounted() {
      this.mdcDataTableItems = this.genRandomDataTableItems(75);
    },

    methods: {
      genRandomDataTableItems(count = 10) {
        const items = [];
        
        for(let x = 0; x < count; x++) {
          items.push(
            {
              id: x,
              givenName: 'Jared',
              familyName: 'Crimmins',
              email: cryptoRandomString({length: 10, type: 'url-safe'}) + '@example.com'
            }
          );
        }

        return items;
      },

      feedMoreDataTableItems() {
        const items = this.genRandomDataTableItems(25);

        setTimeout(() => {
          for(let x = 0; x < items.length; x++) {
            this.mdcDataTableItems.push(items[x]);
          }
        }, 3000);
      },

      onSwitchDrawerButtonClick() {
        this.mdcDrawerIsModal = !this.mdcDrawerIsModal;
      },

      onOpenDrawerButtonClick() {
        this.mdcDrawerOpen = !this.mdcDrawerOpen;
      }
    }
  }
</script>

<style lang='scss'>
  @use '@material/button/mdc-button';
  @use '@material/checkbox/_index.scss' as checkbox;
  @use '@material/chips/mdc-chips';
  @use "@material/circular-progress/mdc-circular-progress";
  @use '@material/dialog/_index.scss' as dialog;
  @use '@material/fab';
  @use '@material/floating-label/_index.scss' as floating-label;
  @use '@material/form-field/_index.scss' as form-field;
  @use '@material/icon-button/_index.scss' as icon-button;
  @use '@material/image-list/_index.scss' as image-list;
  @use '@material/layout-grid/mdc-layout-grid';
  @use '@material/list/_index.scss' as list;
  @use '@material/line-ripple/_index.scss' as line-ripple;
  @use '@material/linear-progress/_index.scss' as linear-progress;
  @use '@material/notched-outline/_index.scss' as notched-outline;
  @use '@material/menu/_index.scss' as menu;
  @use '@material/menu-surface/_index.scss' as menu-surface;
  @use '@material/radio/mdc-radio';
  @use '@material/ripple/styles';
  @use '@material/segmented-button/styles' as segmented-button-styles;
  @use '@material/select/mdc-select';
  @use '@material/slider/styles' as slider-styles;
  @use '@material/snackbar/_index.scss' as snackbar;
  @use '@material/switch/_index.scss' as switch;
  @use '@material/tab/_index.scss' as tab;
  @use '@material/tab-bar/_index.scss' as tab-bar;
  @use '@material/tab-indicator/_index.scss' as tab-indicator;
  @use '@material/tab-scroller/_index.scss' as tab-scroller;
  @use '@material/textfield/_index.scss' as textfield;
  @use '@material/top-app-bar/mdc-top-app-bar';
  @use '@material/touch-target/mdc-touch-target';

  @import 'https://fonts.googleapis.com/icon?family=Material+Icons';
  @import 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined';
  @import 'https://fonts.googleapis.com/icon?family=Material+Icons+Round';
  @import 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp';
  @import 'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone';

  @include checkbox.core-styles;
  @include dialog.core-styles();
  @include fab.core-styles;
  @include floating-label.core-styles;
  @include form-field.core-styles;
  @include icon-button.core-styles;
  @include image-list.core-styles;
  @include list.core-styles;
  @include line-ripple.core-styles;
  @include linear-progress.core-styles;
  @include notched-outline.core-styles;
  @include menu.core-styles;
  @include menu-surface.core-styles;
  @include snackbar.core-styles;
  @include switch.core-styles;
  @include tab.core-styles;
  @include tab-bar.core-styles;
  @include tab-indicator.core-styles;
  @include tab-scroller.core-styles;
  @include textfield.core-styles;

  .mdc-image-list:not(--mdc-image-list--masonry) {
    @include image-list.standard-columns(2);
  }

  .mdc-image-list.mdc-image-list--masonry {
    @include image-list.masonry-columns(2);
  }

  #app {
    min-height: 100vh;
  }

  .the-debug-mdc-ripple {
    &__demo-box {
      align-items: center;
      background-color: #fff;
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
      cursor: pointer;
      display: flex;
      height: 100px;
      justify-content: center;
      overflow: hidden;
      padding: 1rem;
      user-select: none;
      width: 200px;
    }
  }

  // MDCDrawer-MDCTopAppBar styles

  body {
    display: flex;
    height: 100vh;
  }

  .mdc-drawer-app-content {
    flex: auto;
    overflow: auto;
    position: relative;
  }

  .main-content {
    overflow: auto;
    height: 100%;
  }

  .app-bar {
    position: absolute;
  }
</style>