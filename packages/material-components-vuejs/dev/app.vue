<template>
  <div id="app">
    <mdc-linear-progress :open="mdcLinearProgressOpen"></mdc-linear-progress>

    <mdc-circular-progress :open="mdcCircularProgressOpen"></mdc-circular-progress>

    <mdc-list
      :listItems="[
        {
          text: 'Hello'
        }
      ]"
    ></mdc-list>

    <button v-on:click="mdcMenuOpen = !mdcMenuOpen">Open MDCMenu</button>
    <div class="mdc-menu-surface--anchor">
      <mdc-menu
        v-model="mdcMenuOpen"
        :menuItems="[{ text: 'Hello world!' }]"
        :twoLine="false"
      ></mdc-menu>
    </div>

    <!-- <mdc-select
      label="Label"
      :outlined="false"
      :menuItems="[
        { text: '' },
        { text: 'Hello world!' }
      ]"
    ></mdc-select> -->

    <mdc-tab-bar
      :indicatorSpanContent="mdcTabBarIndicatorSpanContent"
      automaticActivation
      focusOnActivate
    >
      <mdc-tab icon="star" indicatorIcon="star">Hello World!</mdc-tab>
      <mdc-tab icon="star" indicatorIcon="recommend">Hello World?</mdc-tab>
    </mdc-tab-bar>
    
    <mdc-text-field
      characterCounter
      fullWidth
      :outlined="true"
      label="Label"
      :rules="[ this.rules.isEmail ]"
      v-model="mdcTextFieldVModel"
    ></mdc-text-field>

    <mdc-image-list>
      <mdc-image-list-item
        src="https://freesvg.org/storage/zip/blog/Pizza_Pepperoni.svg"
        label="Hello world!"
        constrainAspectRatio
      >
      </mdc-image-list-item>
      <mdc-image-list-item
        src="https://freesvg.org/storage/zip/blog/Hello-World-In-Several-Languages.svg"
        label="Hello world!"
        constrainAspectRatio
      >
      </mdc-image-list-item>
      <mdc-image-list-item
        src="https://freesvg.org/storage/zip/blog/Hello-World-In-Several-Languages.svg"
        label="Hello world!"
        constrainAspectRatio
      >
      </mdc-image-list-item>
    </mdc-image-list>
    
    <mdc-button v-on:click="mdcSnackbarOpen = !mdcSnackbarOpen" unelevated>Open/close MDCSnackbar</mdc-button>

    <mdc-icon-button iconTheme="two-tone">alarm</mdc-icon-button>

    <mdc-snackbar label="Woah" v-model="mdcSnackbarOpen">
      <template v-slot:action="{ staticClass }">
        <mdc-button
          :class="staticClass"
          label="Label"
          v-on:click="mdcSnackbarOpen = false"
        ></mdc-button>
      </template>
    </mdc-snackbar>
  </div>
</template>

<script>
  import cryptoRandomString from "crypto-random-string";
    
  export default {
    data() {
      return {
        mdcMenuOpen: false,
        mdcCircularProgressOpen: true,
        mdcDataTableHeaders: [
          {
            text: "Email",
            value: "email"
          },
          {
            text: "Given name",
            value: "givenName"
          },
          {
            text: "Family name",
            value: "familyName"
          }
        ],
        mdcDataTableItems: [],
        mdcLinearProgressOpen: true,
        rules: {
          isEmail(value) {
            return /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(value) || "Please enter a valid email address.";
          }
        },
        mdcTabBarIndicatorSpanContent: false,
        mdcTextFieldVModel: "",
        mdcSnackbarOpen: true
      };
    },
    
    mounted() {
      this.mdcDataTableItems = this.genRandomDataTableItems(75);

      setTimeout(() => {
        this.mdcTabBarIndicatorSpanContent = false;
      }, 100);
    },
    
    methods: {
      genRandomDataTableItems(count = 10) {
        const items = [];
        
        for(let x = 0; x < count; x++) {
          items.push(
            {
              id: x,
              givenName: "Jared",
              familyName: "Crimmins",
              email: cryptoRandomString({length: 10, type: "url-safe"}) + "@example.com"
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
      }
    }
  }
</script>

<style lang="scss">
  @use "@material/button/_index.scss" as button;
  @use "@material/circular-progress/_index.scss" as circular-progress;
  @use "@material/floating-label/_index.scss" as floating-label;
  @use "@material/form-field/_index.scss" as form-field;
  @use "@material/icon-button/_index.scss" as icon-button;
  @use "@material/image-list/_index.scss" as image-list;
  @use "@material/list/_index.scss" as list;
  @use "@material/line-ripple/_index.scss" as line-ripple;
  @use "@material/notched-outline/_index.scss" as notched-outline;
  @use "@material/menu/_index.scss" as menu;
  @use "@material/menu-surface/_index.scss" as menu-surface;
  @use "@material/select/_index.scss" as select;
  @use "@material/snackbar/_index.scss" as snackbar;
  @use "@material/switch/_index.scss" as switch;
  @use "@material/tab/_index.scss" as tab;
  @use "@material/tab-bar/_index.scss" as tab-bar;
  @use "@material/tab-indicator/_index.scss" as tab-indicator;
  @use "@material/tab-scroller/_index.scss" as tab-scroller;
  @use "@material/textfield/_index.scss" as textfield;

  @import "https://fonts.googleapis.com/icon?family=Material+Icons";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons+Sharp";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone";

  @include button.core-styles;
  @include circular-progress.core-styles;
  @include floating-label.core-styles;
  @include form-field.core-styles;
  @include icon-button.core-styles;
  @include image-list.core-styles;
  @include list.core-styles;
  @include line-ripple.core-styles;
  @include notched-outline.core-styles;
  @include menu.core-styles;
  @include menu-surface.core-styles;
  @include select.core-styles;
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
</style>