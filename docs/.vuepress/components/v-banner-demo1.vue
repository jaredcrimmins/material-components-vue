<template>
  <v-demo-container>
    <mdc-banner
      text="There was a problem processing a transaction on your credit card."
      :value="true"
    >
      <template v-slot:actions="{primaryStaticClass}">
        <mdc-button
          :class="primaryStaticClass"
          @click.native="$event.stopPropagation()"
        >
          Fix it
        </mdc-button>
      </template>
    </mdc-banner>
  </v-demo-container>
</template>
