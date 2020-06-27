<template>
  <div>
    <v-data-table :headers="headers" :items="articulos" sort-by="proveedor" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <div class="d-flex justify-end align-center tam">
                <v-btn color="primary" dark class="ma-2" v-on="on">Nuevo Articulo</v-btn>
                <v-btn color="primary" dark class="ma-2" @click="refreshArticulos">Refrescar</v-btn>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre" label="Nombre "></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.precio" label="Precio"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.proveedor" label="Proveedor"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="green darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-lead-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-trash-can-outline</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Artículos cambiados",
        align: "start",
        sortable: false,
        value: "nombre"
      },
      { text: "Precio", value: "precio" },
      { text: "Proveedor", value: "proveedor" },
      { text: "Actions", value: "action", sortable: false }
    ],
    articulos: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      precio: 0,
      proveedor: ""
    },
    defaultItem: {
      nombre: "",
      precio: 0,
      proveedor: ""
    }
  }),

  computed: {
    //Computa a tiempo real si se está haciendo una edición o se está añadiendo un artículo nuevo y modifica el título de la tarjeta.
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Artículo" : "Editar Artículo";
    },
    ...Vuex.mapState(["articulosArrayApi"])
  },

  async created() {
    await this.obtenerArticulos();
    await this.Setter();
  },

  methods: {
    ...Vuex.mapActions(["obtenerArticulos"]),
    Setter() {
      this.articulos = this.articulosArrayApi;
    },
    editItem(item) {
      this.editedIndex = this.articulos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.articulos.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.articulos.splice(index, 1);

      let url = process.env.VUE_APP_URL_LOCALHOST + "/articulos/" + item._id;
      fetch(url, {
        method: "DELETE",
        body: JSON.stringify(this.item),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      });
    },
    async refreshArticulos() {
      await this.obtenerArticulos();
      await this.Setter();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.articulos[this.editedIndex], this.editedItem);
        let url =
          process.env.VUE_APP_URL_LOCALHOST +
          "/articulos/" +
          this.editedItem._id;

        fetch(url, {
          method: "PUT",
          body: JSON.stringify(this.editedItem),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        });
      } else {
        let url = process.env.VUE_APP_URL_LOCALHOST + "/articulos/";
        fetch(url, {
          method: "POST",
          body: JSON.stringify(this.editedItem),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        });
      }
      this.close();
    }
  }
};
</script>
<style scoped>
.tam {
  width: 100%;
}
</style>
