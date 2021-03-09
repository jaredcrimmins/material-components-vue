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
    <mdc-select
      label="Label"
      :outlined="false"
      :menuItems="[
        { text: '' },
        { text: 'Hello world!' }
      ]"
    ></mdc-select>
    
    <mdc-text-field
      characterCounter
      fullWidth
      :outlined="true"
      label="Label"
      :rules="[ this.rules.isEmail ]"
      v-model="mdcTextFieldVModel"
    ></mdc-text-field>
    
    <mdc-button label="Open/close MDCSnackbar" v-on:click="mdcSnackbarOpen = !mdcSnackbarOpen" unelevated></mdc-button>
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
        mdcTextFieldVModel: "",
        mdcSnackbarOpen: true
      };
    },
    
    mounted() {
      this.mdcDataTableItems = this.genRandomDataTableItems(75);
    },
    
    methods: {
      genRandomDataTableItems(count = 10) {
        let items = [];
        
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
        let items = this.genRandomDataTableItems(25);
        
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
  @use "@material/button";
  @use "@material/circular-progress/mdc-circular-progress";
  @use "@material/floating-label/mdc-floating-label";
  @use "@material/form-field/mdc-form-field";
  @use "@material/icon-button/mdc-icon-button";
  @use "@material/list/mdc-list";
  @use "@material/line-ripple/mdc-line-ripple";
  @use "@material/notched-outline/mdc-notched-outline";
  @use "@material/menu/mdc-menu";
  @use "@material/menu-surface/mdc-menu-surface";
  @use "@material/select/mdc-select";
  @use "@material/switch/mdc-switch";
  @use "@material/tab/mdc-tab";
  @use "@material/tab-bar/mdc-tab-bar";
  @use "@material/tab-indicator/mdc-tab-indicator";
  @use "@material/tab-scroller/mdc-tab-scroller";
  @use "@material/textfield/mdc-text-field";
  @use "@material/typography/mdc-typography";
  @use "@material/theme/mdc-theme";

  // @include button.core-styles;
  // @include floating-label.core-styles;
  // @include form-field.core-styles;
  // @include icon-button.core-styles;
  // @include notched-outline.core-styles;
  // @include menu.core-styles;
  // @include menu-surface.core-styles;
  // @include switch.core-styles;
  // @include tab.core-styles;
  // @include tab-bar.core-styles;
  // @include tab-indicator.core-styles;
  // @include tab-scroller.core-styles;
  // @include textfield.core-styles;

  @import "https://fonts.googleapis.com/icon?family=Material+Icons";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons+Sharp";
  @import "https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone";

  #app {
    min-height: 100vh;
  }
</style>