<template>
  <div>
    <v-card>
      <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        item-key="name"
        :sort-by="['proveedor','nombre','precio']"
        :sort-desc="[false, false, false]"
        multi-sort
      >
        <template v-slot:item.cantidad="props">
          <v-edit-dialog
            :return-value.sync="props.item.cantidad"
            large
            persistent
            @save="save(props.item)"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.cantidad }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update cantidad</div>
            </template>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.cantidad"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
    <v-btn @click="sendPedido">Enviar</v-btn>
  </div>
</template>

<script>
class Pedido {
  constructor(articulosArray, fecha) {
    this.fecha = fecha;
    this.articulosArray = articulosArray;
  }
}
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  data() {
    return {
      pedido: new Pedido(),
      search: "",
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      headers: [
        {
          text: "Artículos",
          align: "start",
          value: "nombre"
        },
        { text: "Proveedor", value: "proveedor" },
        { text: "Precio", value: "precio" },
        { text: "Cantidad", value: "cantidad" }
      ],
      desserts: []
    };
  },
  methods: {
    ...Vuex.mapMutations([]),
    ...Vuex.mapActions(["obtenerArticulos"]),
    setArticulos() {
      this.articulosArrayApi.forEach(element => {
        this.desserts.push({
          _id: element._id,
          nombre: element.nombre,
          precio: element.precio,
          proveedor: element.proveedor,
          cantidad: 0
        });
      });
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
    sendPedido() {
      let aux = [];
      this.desserts.forEach(element => {
        if (element.cantidad != 0) {
          aux.push(element);
        }
        this.addDate();
        this.pedido.articulosArray = aux;
      });
      console.log(this.pedido);
      fetch("http://localhost:3000/pedidos", {
        method: "POST",
        body: JSON.stringify(this.pedido),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      }).then(res => res.json());
    },
    save(item) {
      console.log(item);
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    }
  },
  computed: {
    ...Vuex.mapState(["articulosArrayApi", "comboBoxSelectedArticulos"])
  },
  async created() {
    await this.obtenerArticulos();
    await this.setArticulos();
  }
};
</script>