<template>
    <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
            <div class="mdc-switch__thumb"></div>
            <input
                type="checkbox"
                class="mdc-switch__native-control"
                role="switch"
                v-model="checked"
            >
        </div>
    </div>
</template>

<script>
    "use-strict"

    import { MDCSwitch } from "@material/switch";

    export default {
        name: "ToggleSwitch",
        data: function() {
            return {
                checked: false
            }
        },
        mounted: function() {
            this.mdcTextField = new MDCSwitch(this.$el);
        }
    }
</script>

<style lang="scss" scoped>
    @use "@material/switch/mdc-switch";
</style>