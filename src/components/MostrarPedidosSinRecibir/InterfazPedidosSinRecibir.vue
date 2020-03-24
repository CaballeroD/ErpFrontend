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
      <v-expansion-panel v-for="(item,i) in this.pedidosRecibidos" :key="i">
        <v-expansion-panel-header class="d-flex align-self-center">
          <p class="mb-1">Pedido número: {{ i }}</p>
          <p class="mb-1">Fecha:{{ item.fecha }}</p>
          <v-checkbox
            @change="comprobarPedidos(item)"
            v-model="item.recibido"
            class="mr-10"
            :label="`Recibido`"
            color="#ffffff"
          ></v-checkbox>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <div
            class="ma-2 d-inline-flex flex-column flex-wrap"
            v-for="(aux,j) in item.articulosArray"
            :key="j"
          >
            <span>Nombre: {{aux.nombre}}</span>
            <span>Precio: {{aux.precio}}</span>
            <span>Unidades: {{aux.cantidad}}</span>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default {
  name: "orderbox",
  data: () => ({
    pedidosRecibidos: [],
    snackbar: false,
    accordion: false,
    popout: false,
    inset: false,
    multiple: false,
    disabled: false,
    readonly: false,
    focusable: true
  }),
  methods: {
    comprobarPedidos(item) {
      console.log(item.recibido);
    },
    //añade a los pedidos la variable recibido.
    setComprobarPedidos() {
      this.InfoPedidosList.forEach(element => {
        this.pedidosRecibidos.push({
          _id: element._id,
          fecha: element.fecha,
          articulosArray: element.articulosArray,
          recibido: false
        });
      });
    },

    ...Vuex.mapMutations(["fillInfoPedidosList"]),
    ...Vuex.mapActions(["obtenerInfoPedidosList"])
  },
  computed: {
    ...Vuex.mapState(["InfoPedidosList"])
  },
  async created() {
    await this.obtenerInfoPedidosList();
    await this.setComprobarPedidos();
  }
};
</script>
