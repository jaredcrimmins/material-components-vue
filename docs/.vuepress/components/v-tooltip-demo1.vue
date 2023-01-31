<template>
  <v-demo-container>
    <div class="v-tooltip-demo1__wrapper">
      <button data-tooltip-id="tooltip1">
        Tooltip anchor
      </button>

      <mdc-tooltip id="tooltip1">
        lorem ipsum dolor
      </mdc-tooltip>

      <mdc-tooltip-wrapper #default="defaultProps">
        <button
          data-tooltip-id="tooltip2"
          v-bind="defaultProps.attrs"
        >
          Rich tooltip anchor
        </button>
        <mdc-tooltip id="tooltip2">
          <template>
            <mdc-tooltip-title>Lorem Ipsum</mdc-tooltip-title>
            <mdc-tooltip-content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
              aliquam sit amet sit amet eros.
            </mdc-tooltip-content>
          </template>
        </mdc-tooltip>
      </mdc-tooltip-wrapper>

      <mdc-tooltip-wrapper #default="defaultProps">
        <button
          data-tooltip-id="tooltip3"
          v-bind="defaultProps.attrs"
        >
          Rich tooltip with interactive content anchor
        </button>
        <mdc-tooltip id="tooltip3">
          <template>
            <mdc-tooltip-title>Lorem Ipsum</mdc-tooltip-title>
            <mdc-tooltip-content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
              aliquam sit amet sit amet eros.

              <mdc-tooltip-content-link to="google.com">
                link
              </mdc-tooltip-content-link>
            </mdc-tooltip-content>
            <mdc-tooltip-action>
              <template #root="rootProps">
                <button
                  :class="rootProps.cssClass"
                  v-bind="rootProps.attrs"
                >
                  action
                </button>
              </template>
            </mdc-tooltip-action>
          </template>
        </mdc-tooltip>
      </mdc-tooltip-wrapper>

      <mdc-tooltip-wrapper #default="defaultProps">
        <button
          data-tooltip-id="tooltip4"
          v-bind="defaultProps.attrs"
        >
          Persistent rich tooltip with interactive content anchor
        </button>
        <mdc-tooltip
          id="tooltip4"
          persistent
        >
          <template>
            <mdc-tooltip-title>Lorem Ipsum</mdc-tooltip-title>
            <mdc-tooltip-content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
              aliquam sit amet sit amet eros.

              <mdc-tooltip-content-link to="google.com">
                link
              </mdc-tooltip-content-link>
            </mdc-tooltip-content>
            <mdc-tooltip-rich-actions>
              <mdc-tooltip-action>
                <template #root="rootProps">
                  <button
                    :class="rootProps.cssClass"
                    v-bind="rootProps.attrs"
                  >
                    action
                  </button>
                </template>
              </mdc-tooltip-action>
            </mdc-tooltip-rich-actions>
          </template>
        </mdc-tooltip>
      </mdc-tooltip-wrapper>
    </div>
  </v-demo-container>
</template>

<style lang="scss">
  .v-tooltip-demo1 {
    &__wrapper {
      align-content: center;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }
  }
</style>