<template>
  <div>
    <v-row justify="center">
      <v-expansion-panels
        :accordion="accordion"
        :popout="popout"
        :inset="inset"
        :multiple="multiple"
        :focusable="focusable"
        :disabled="disabled"
        :readonly="readonly"
        class="tam"
      >
        <v-expansion-panel v-for="(item, i) in this.pedidosRecibidos" :key="i">
          <v-expansion-panel-header class="d-flex tam">
            <p>Pedido número: {{ i }}</p>
            <p>Fecha:{{ item.fecha }}</p>
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
    <v-dialog v-model="dialog" persistent max-width="290" v-if="dialog">
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogCancel">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="dialogConfirm">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default {
  name: "orderbox",
  data: () => ({
    pedidoSeleccionado: {},
    snack: false,
    snackColor: "",
    snackText: "",
    dialog: false,
    pedidosRecibidos: [],
    accordion: false,
    popout: false,
    inset: false,
    multiple: false,
    disabled: false,
    readonly: false,
    focusable: true
  }),
  methods: {
    openSnack(abierto, color, mensaje) {
      this.snack = abierto;
      this.snackColor = color;
      this.snackText = mensaje;
    },
    dialogConfirm() {
      this.dialog = false;
      this.openSnack(true, "success", "Se ha confirmado la selección");
      let url =
        "process.env.VUE_APP_URL_LOCALHOST/pedidosRecibidos/" +
        this.pedidoSeleccionado._id;
      fetch(url, {
        method: "DELETE",
        body: JSON.stringify(this.pedidoSeleccionado),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      }).then(res => res.json());
      fetch("process.env.VUE_APP_URL_LOCALHOST/pedidosArchivados/", {
        method: "POST",
        body: JSON.stringify(this.pedidoSeleccionado),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(this.openSnack(true, "success", "Enviado con éxito"));
    },
    dialogCancel() {
      this.dialog = false;
      this.pedidoSeleccionado.recibido = false;
      this.openSnack(true, "error", "Se ha cancelado la selección");
    },
    comprobarPedidos(item) {
      if (item.recibido == true) this.dialog = true;
      this.pedidoSeleccionado = item;
    },

    //añade a los pedidos la variable recibido.
    setComprobarPedidos() {
      this.NoRecibidosList.forEach(element => {
        this.pedidosRecibidos.push({
          _id: element._id,
          fecha: element.fecha,
          articulosArray: element.articulosArray,
          recibido: false
        });
      });
    },

    ...Vuex.mapMutations(["fillPedidosNoRecibidosList"]),
    ...Vuex.mapActions(["obtenerPedidosNoRecibidosList"])
  },
  computed: {
    ...Vuex.mapState(["NoRecibidosList"])
  },
  async created() {
    await this.obtenerPedidosNoRecibidosList();
    await this.setComprobarPedidos();
  }
};
</script>
<style scoped>
.tam {
  height: 63px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
}
</style>
