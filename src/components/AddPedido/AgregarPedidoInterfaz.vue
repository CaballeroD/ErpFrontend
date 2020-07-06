<template>
  <div>
    <div v-if="!this.editar">
      <v-card>
        <v-card-title>
          Artículos sin Editar
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
          :items="articulos"
          :search="search"
          item-key="name"
          :sort-by="['proveedor', 'nombre', 'precio']"
          :sort-desc="[false, false, false]"
          multi-sort
        >
          <template v-slot:item.cantidad="props">
            <v-edit-dialog
              :return-value.sync="props.item.cantidad"
              large
              persistent
              @save="save()"
              @cancel="cancel()"
              @open="open(props.item)"
              @close="close(props.item)"
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
    <div v-else>
      <v-card>
        <v-card-title>
          Editando Pedido
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
          :items="articulos"
          :search="search"
          item-key="name"
          :sort-by="['proveedor', 'nombre', 'precio']"
          :sort-desc="[false, false, false]"
          multi-sort
        >
          <template v-slot:item.cantidad="props">
            <v-edit-dialog
              :return-value.sync="props.item.cantidad"
              large
              persistent
              @save="save()"
              @cancel="cancel()"
              @open="open(props.item)"
              @close="close(props.item)"
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
      <v-btn @click="sendPedido">Confirmar</v-btn>
      <v-btn @click="cancelPedido">Cancelar</v-btn>
    </div>
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
      editar: false,
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
      articulos: []
    };
  },
  methods: {
    ...Vuex.mapMutations([]),
    ...Vuex.mapActions(["obtenerArticulos"]),
    setArticulos() {
      this.articulosArrayApi.forEach(element => {
        this.articulos.push({
          _id: element._id,
          nombre: element.nombre,
          precio: element.precio,
          proveedor: element.proveedor,
          cantidad: 0
        });
      });
    },
    setArticulosEdit() {
      this.$route.params.parametro.articulosArray.forEach(element => {
        this.articulos.push({
          _id: element._id,
          nombre: element.nombre,
          precio: element.precio,
          proveedor: element.proveedor,
          cantidad: element.cantidad
        });
      });
      let aux = [];
      this.articulos.forEach(element => {
        aux.push(element._id);
      });
      this.articulosArrayApi.forEach(element => {
        if (!aux.includes(element._id)) {
          this.articulos.push({
            _id: element._id,
            nombre: element.nombre,
            precio: element.precio,
            proveedor: element.proveedor,
            cantidad: 0
          });
        }
      });
    },
    editarPedidoPendiente() {
      if (this.$route.params.parametro) {
        this.editar = true;
      }
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
      this.articulos.forEach(element => {
        if (element.cantidad != 0 && element.cantidad != "") {
          aux.push(element);
        }
        this.addDate();
        this.pedido.articulosArray = aux;
      });
      if (this.editar) {
        let url =
          process.env.VUE_APP_URL_LOCALHOST +
          "/pedidos/" +
          this.$route.params.parametro._id;
        fetch(url, {
          method: "DELETE",
          body: JSON.stringify(this.pedido),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(
            this.$router.push({
              name: "MostrarPedidos"
            })
          );
      }
      let url = process.env.VUE_APP_URL_LOCALHOST + "/pedidos/";
      fetch(url, {
        method: "POST",
        body: JSON.stringify(this.pedido),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(
          this.articulos.forEach(element => {
            element.cantidad = 0;
          })
        )
        .then(this.openSnack(true, "success", "Enviado con éxito"));
    },
    openSnack(abierto, color, mensaje) {
      this.snack = abierto;
      this.snackColor = color;
      this.snackText = mensaje;
    },
    save() {
      this.openSnack(true, "success", "Data saved");
    },
    cancel() {
      this.openSnack(true, "error", "Canceled");
    },
    open(item) {
      if (item.cantidad == 0) item.cantidad = "";
      this.openSnack(true, "info", "Dialog opened");
    },
    close(item) {
      if (item.cantidad == "") item.cantidad = 0;
    },
    cancelPedido() {
      this.$router.push({
        name: "MostrarPedidos"
      });
    }
  },
  computed: {
    ...Vuex.mapState(["articulosArrayApi", "comboBoxSelectedArticulos"])
  },
  async created() {
    await this.obtenerArticulos();
    await this.editarPedidoPendiente();
    if (!this.editar) await this.setArticulos();
    else await this.setArticulosEdit();
  }
};
</script>
