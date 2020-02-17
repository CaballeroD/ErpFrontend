<template>
  <v-row justify="center">
    <v-expansion-panels
      :accordion="accordion"
      :popout="popout"
      :inset="inset"
      :multiple="multiple"
      :focusable="focusable"
      :disabled="disabled"
      :readonly="readonly"
    >
      <v-expansion-panel v-for="(item,i) in this.varibleDelGetDeLaApi" :key="i">
        <v-expansion-panel-header>{{ item.articulo }}</v-expansion-panel-header>
        <v-expansion-panel-content></v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script>
export default {
  name: "orderbox",
  data: () => ({
    varibleDelGetDeLaApi: 0,
    accordion: false,
    popout: false,
    inset: false,
    multiple: false,
    disabled: false,
    readonly: false,
    focusable: true
  }),
  methods: {
    obtainNumberPedidos() {
      fetch("http://localhost:3000/pedidos", {
        method: "GET",
        body: JSON.stringify(this.pedido)
      })
        .then(res => res.json())
        .then(data => {
          this.varibleDelGetDeLaApi = data;
          console.log(data);
          console.log(data.length);
        });
    }
  },
  mounted() {
    this.obtainNumberPedidos();
  }
};
</script>