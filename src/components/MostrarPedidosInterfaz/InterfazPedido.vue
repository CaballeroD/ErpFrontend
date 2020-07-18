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
        v-for="(item, i) in this.InfoPedidosList"
        :key="i"
        class="justify-space-between"
      >
        <div class="windowSizeHeader">
          <v-expansion-panel-header class="d-inline-flex justify-space-between">
            <p>Pedido nº: {{ i }}</p>
            <p>Fecha:{{ item.fecha }}</p>
            <p>
              <v-icon small class="mr-2" @click="editPedido(item)">mdi-lead-pencil</v-icon>
            </p>
            <p>
              <v-icon small @click="enviarPedido(item)">mdi-rocket-launch-outline</v-icon>
            </p>
          </v-expansion-panel-header>
        </div>
        <v-expansion-panel-content>
          <div
            class="ma-2 d-inline-flex flex-column flex-wrap"
            v-for="(aux, j) in item.articulosArray"
            :key="j"
          >
            <span>Nombre: {{ aux.nombre }}</span>
            <span>Precio: {{ aux.precio }}</span>
            <span>Unidades: {{ aux.cantidad }}</span>
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
  /*  components: {
    formEditPedido
  },*/
  data: () => ({
    accordion: false,
    popout: false,
    inset: false,
    multiple: false,
    disabled: false,
    readonly: false,
    focusable: true
  }),
  methods: {
    editPedido(item) {
      this.$router.push({
        name: "agregarPedido",
        params: { parametro: item }
      });
    },
    enviarPedido(item) {
      let url = process.env.VUE_APP_URL_LOCALHOST + "/pedidosRecibidos/";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      });
      url = process.env.VUE_APP_URL_LOCALHOST + "/pedidos/" + item._id;
      fetch(url, {
        method: "DELETE",
        body: JSON.stringify(this.pedido),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
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
  }
};
</script>
