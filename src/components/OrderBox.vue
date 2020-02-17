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
      class="windowSize"
    >
      <v-expansion-panel
        v-for="(item,i) in this.varibleDelGetDeLaApi"
        :key="i"
        class="d-inline-flex justify-space-between"
      >
        <div class="windowSizeHeader">
          <v-expansion-panel-header class="d-inline-flex justify-space-between">
            <p>Pedido número: {{ i }}</p>
            <p>Fecha:{{ item.fecha }}</p>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="pt-4">
              <p>Precio del artículo: {{ item.precio }}</p>
              <p>Nombre del artículo: {{ item.articulo }}</p>
              <p>Id del pedido: {{ item._id }}</p>
            </div>
          </v-expansion-panel-content>
        </div>
        <div class="d-flex pt-4">
          <v-btn class="mx-2" fab dark x-small color="blue">
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <v-btn class="mx-2" fab dark x-small color="green">
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <v-btn class="mx-2" fab dark x-small color="red">
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
        </div>
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
<style scoped>
.windowSize {
  width: 70%;
}
.windowSizeHeader {
  width: 100%;
}
</style>