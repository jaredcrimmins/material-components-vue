<template>
  <div>
    <h2 id="mdc-list">MDCList</h2>

    <h3>Variants</h3>

    <h4>Single-line list</h4>

    <mdc-list>
      <mdc-list-item
        v-for="num in 4"
        :key="num"
      >
        Single-line list item {{num}}
      </mdc-list-item>
    </mdc-list>

    <h4>Two-line list</h4>

    <mdc-list twoLine>
      <mdc-list-item
        v-for="num in 4"
        :key="num"
        :primary-text="getTwoLinePrimaryText(num)"
        secondary-text="Secondary text"
      >
      </mdc-list-item>
    </mdc-list>

    <h3>Other variants</h3>

    <h4>List Groups</h4>

    <mdc-list-group>
      <mdc-list
        v-for="listNum in 2"
        :key="listNum"
      >
        <mdc-list-item
          v-for="itemNum in 3"
          :key="itemNum"
        >
          Item {{itemNum}} - List {{listNum}}
        </mdc-list-item>
      </mdc-list>
    </mdc-list-group>

    <h4>List Dividers</h4>

    <mdc-list>
      <mdc-list-item
        v-for="itemNum in 2"
        :key="itemNum"
      >
        Item {{itemNum}} - Division 1
      </mdc-list-item>
      <mdc-list-divider></mdc-list-divider>
      <mdc-list-item
        v-for="itemNum in 2"
        :key="itemNum"
      >
        Item {{itemNum}} - Division 2
      </mdc-list-item>
    </mdc-list>

    <h4>Single Selection List</h4>

    <mdc-list single-selection>
      <mdc-list-item
        v-for="num in 4"
        :key="num"
      >Single-line item {{num}}</mdc-list-item>
    </mdc-list>

    <h4>List with radio group</h4>

    <form>
      <mdc-list radio-group>
        <mdc-list-item
          v-for="num in 3"
          :key="num"
        >
          Option {{num}}
          <template v-slot:radio={id}>
            <mdc-radio
              :id="id"
              name="radio-group-demo"
              :value="num"
            >
            </mdc-radio>
          </template>
        </mdc-list-item>
      </mdc-list>
    </form>

    <form>
      <mdc-list radio-group>
        <mdc-list-item
          v-for="num in 3"
          :key="num"
        >
          Option {{num}}
          <template v-slot:checkbox="{id}">
            <mdc-checkbox
              :id="id"
              name="checkbox-items-demo"
              :value="num"
            ></mdc-checkbox>
          </template>
        </mdc-list-item>
      </mdc-list>
    </form>
  </div>
</template>

<script>
  export default {
    name: "the-debug-mdc-list",

    methods: {
      getTwoLinePrimaryText(num) {
        return `Two-line list item ${num} primary text`;
      }
    }
  }
</script>

<style lang="scss">
  @use "@material/list/_index.scss" as list;

  @include list.core-styles;
</style>