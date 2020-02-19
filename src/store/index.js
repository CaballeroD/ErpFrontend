import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articulosArrayApi: [],
    comboBoxSelectedArticulos: []
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
    }
  },
  modules: {}
});
