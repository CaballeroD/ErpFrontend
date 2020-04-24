import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articulosArrayApi: [],
    //creo que esto sobra
    comboBoxSelectedArticulos: [],
    InfoPedidosList: [],
    NoRecibidosList: [],
    logued: false
  },

  mutations: {
    fillArticulos(state, articulos) {
      state.articulosArrayApi = articulos;
    },
    changeLogued(state) {
      state.logued = !state.logued;
      console.log("Me ejecuto")
    },
    fillInfoPedidosList(state, pedidos) {
      state.InfoPedidosList = pedidos;
    },
    fillPedidosNoRecibidosList(state, pedidos) {
      state.NoRecibidosList = pedidos;
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
    },
    obtenerPedidosNoRecibidosList: async function ({ commit }) {
      const data = await fetch("http://localhost:3000/pedidosRecibidos", {
        method: "GET",
        body: JSON.stringify(this.pedido)
      })
      const pedidos = await data.json();
      commit('fillPedidosNoRecibidosList', pedidos)
    }
  },
  modules: {}
});
