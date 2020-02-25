
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            :items="items"
            outlined
            dense
            chips
            small-chips
            label="Outlined"
            multiple
          ></v-autocomplete>
          <v-btn small color="green" @click="sendArticulos">Enviar</v-btn>
          <v-btn small color="red" @click="deleteAllPedidos">Borrar Todo</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

class Pedido {
  constructor(articulosArray, fecha) {
    this.fecha = fecha;
    this.articulosArray = articulosArray;
  }
}

export default {
  data() {
    return {
      pedido: new Pedido(),
      name: "Combobox",
      items: [],
      values: [],
      value: null
    };
  },
  methods: {
    ...Vuex.mapMutations([
      "fillArticulos",
      "setComboBoxSelectedArticulos",
      "resetComboBoxSelectedArticulos"
    ]),
    ...Vuex.mapActions(["obtenerArticulos"]),
    //Rellena el menú de opciones del selector
    fillAllAticulos() {
      this.articulosArrayApi.forEach(element => {
        this.items.push(element.nombre);
      });
    },
    deleteAllPedidos() {
      fetch("http://localhost:3000/pedidos/deleteall", {
        method: "DELETE",
        body: JSON.stringify(this.pedido)
      });
    },
    sendArticulos() {
      this.setComboBoxSelectedArticulos(this.values);
      this.pedido.articulosArray = this.comboBoxSelectedArticulos;
      this.addDate();
      this.addPedido();
      this.resetComboBoxSelectedArticulos();
      this.values = [];
    },
    addDate() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        this.pedido.fecha = day + "-" + "0" + month + "-" + year;
      } else {
        this.pedido.fecha = day + "-" + month + "-" + year;
      }
    },
    addPedido() {
      fetch("http://localhost:3000/pedidos", {
        method: "POST",
        body: JSON.stringify(this.pedido),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      }).then(res => res.json());
    }
  },

  computed: {
    ...Vuex.mapState(["articulosArrayApi", "comboBoxSelectedArticulos"])
  },
  async created() {
    await this.obtenerArticulos();
    await this.fillAllAticulos();
  }
};
</script>