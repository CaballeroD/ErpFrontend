import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articulosArrayApi: [],
    comboBoxSelectedArticulos: [],
    InfoPedidosList: []
  },
  mutations: {
    setComboBoxSelectedArticulos(state, articulos) {
      const aux = articulos;
      state.articulosArrayApi.forEach(element => {
        if (aux.includes(element.nombre)) {
          state.comboBoxSelectedArticulos.push(element);
        }
      });
    },
    resetComboBoxSelectedArticulos(state) {
      state.comboBoxSelectedArticulos = [];
    },
    fillArticulos(state, articulos) {
      state.articulosArrayApi = articulos;
    },
    fillInfoPedidosList(state, pedidos) {
      state.InfoPedidosList = pedidos;
    }
  },
  actions: {
    obtenerArticulos: async function ({ commit }) {
      const data = await fetch("http://localhost:3000/articulos", {
        method: "GET",
        body: JSON.stringify(this.articulo)
      })
      const articulos = await data.json();
      commit('fillArticulos', articulos)
    },
    obtenerInfoPedidosList: async function ({ commit }) {
      const data = await fetch("http://localhost:3000/pedidos", {
        method: "GET",
        body: JSON.stringify(this.pedido)
      })
      const pedidos = await data.json();
      commit('fillInfoPedidosList', pedidos)
    }
  },
  modules: {}
});
