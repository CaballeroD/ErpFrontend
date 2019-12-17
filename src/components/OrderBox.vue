<template>
  <v-row justify="center" align="alignment">
    <v-expansion-panels
      :accordion="accordion"
      :popout="popout"
      :inset="inset"
      :multiple="multiple"
      :focusable="focusable"
      :disabled="disabled"
      :readonly="readonly"
    >
      <v-expansion-panel v-for="(item,i) in 5" :key="i">
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script>
export default {
  name: "orderbox",
  data: () => ({
    accordion: false,
    popout: false,
    inset: false,
    multiple: false,
    disabled: false,
    readonly: false,
    focusable: true
  })
};
</script>