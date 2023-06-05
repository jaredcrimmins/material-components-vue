<template>
  <div>
    <h2 id="mdc-banner">
      MDCBanner
    </h2>

    <mdc-banner
      text="There was a problem processing a transaction on your credit card."
      v-model="basicOpen"
    >
      <template v-slot:actions="{primaryStaticClass}">
        <mdc-button :class="primaryStaticClass">
          Fix it
        </mdc-button>
      </template>
    </mdc-banner>

    <button @click="onButtonClick('basic')">
      Open/close basic MDCBanner
    </button>

    <h3>Variants</h3>

    <h4>Centered</h4>

    <mdc-banner
      class="the-debug-mdc-banner__centered-variant"
      text="There was a problem processing a transaction on your credit card."
      fixed
      v-model="centeredOpen"
    >
      <template v-slot:actions="{primaryStaticClass}">
        <mdc-button :class="primaryStaticClass">
          Fix it
        </mdc-button>
      </template>
    </mdc-banner>

    <button @click="onButtonClick('centered')">
      Open/close centered MDCBanner
    </button>

    <h4>Fixed Banner</h4>

    <mdc-banner
      text="There was a problem processing a transaction on your credit card."
      fixed
      v-model="fixedOpen"
    >
      <template v-slot:actions="{primaryStaticClass}">
        <mdc-button :class="primaryStaticClass">
          Fix it
        </mdc-button>
      </template>
    </mdc-banner>

    <button @click="onButtonClick('fixed')">
      Open/close fixed MDCBanner
    </button>

    <h4>Banner with graphic</h4>

    <mdc-banner
      text="There was a problem processing a transaction on your credit card."
      v-model="graphicOpen"
    >
      <template v-slot:graphic>
        <mdc-material-icon class="mdc-banner__icon">
          error_outline
        </mdc-material-icon>
      </template>
      <template v-slot:actions="{primaryStaticClass}">
        <mdc-button :class="primaryStaticClass">
          Fix it
        </mdc-button>
      </template>
    </mdc-banner>

    <button @click="onButtonClick('graphic')">
      Open/close graphic MDCBanner
    </button>

    <h4>Banner with two actions</h4>

    <mdc-banner
      text="There was a problem processing a transaction on your credit card."
      v-model="twoActionsOpen"
    >
      <template v-slot:actions="{primaryStaticClass, secondaryStaticClass}">
        <mdc-button :class="secondaryStaticClass">
          Learn more
        </mdc-button>
        <mdc-button :class="primaryStaticClass">
          Fix it
        </mdc-button>
      </template>
    </mdc-banner>

    <button @click="onButtonClick('twoActions')">
      Open/close mobile stacked MDCBanner
    </button>

    <h4>Mobile Stacked</h4>

    <mdc-banner
      text="There was a problem processing a transaction on your credit card."
      v-model="mobileStackedOpen"
    >
      <template v-slot:actions="{primaryStaticClass}">
        <mdc-button :class="primaryStaticClass">
          Fix it
        </mdc-button>
      </template>
    </mdc-banner>

    <button @click="onButtonClick('mobileStacked')">
      Open/close mobile stacked MDCBanner
    </button>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-banner",

    data() {
      return {
        basicOpen: false,
        centeredOpen: false,
        fixedOpen: false,
        graphicOpen: false,
        twoActionsOpen: false,
        mobileStackedOpen: false
      };
    },

    methods: {
      onButtonClick(variant) {
        const variantOpenKey = `${variant}Open`;
        const variantOpen = this[variantOpenKey];

        this[variantOpenKey] = !variantOpen;
      }
    }
  }
</script>

<style lang="scss">
  @use "@material/banner/_index.scss" as banner;
  @use "@material/banner/styles";

  .the-debug-mdc-banner__centered-variant {
    @include banner.position-centered;
  }
</style>