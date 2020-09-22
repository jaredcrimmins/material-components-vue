<template>
  <div id="app">
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
        :menuItems="[
          {
            text: 'Hello world!'
          }
        ]"
        :twoLine="false"
      ></mdc-menu>
    </div>

    <mdc-select
      label="Label"
      :outlined="false"
    ></mdc-select>
  </div>
</template>

<script>
  "use-strict"

  import MDCList from "./../../packages/mdc-list";
  import MDCMenu from "./../../packages/mdc-menu";
  import MDCSelect from "./../../packages/mdc-select";

  export default {
    components: {
      "mdc-list": MDCList,
      "mdc-menu": MDCMenu,
      "mdc-select": MDCSelect
    },

    data() {
      return {
        mdcMenuOpen: false
      }
    }
  }
</script>

<style></style>