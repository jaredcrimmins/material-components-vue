<template>
  <v-demo-container>
    <mdc-select
      label="Pick a Food Group"
      :items="[
        {text: '', value: ''},
        {text: 'Bread, Cereal, Rice, and Pasta', value: 'grains'},
        {text: 'Vegetables', value: 'vegetables'},
        {text: 'Fruit', value: 'fruit'}
      ]"
      has-typeahead
      filled
    />
  </v-demo-container>
</template>