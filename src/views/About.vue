<template>
  <div class="container">
    <v-row align="center">
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="pedido.articulo" required></v-text-field>
        <v-text-field v-model="pedido.precio" required></v-text-field>
        <v-btn color="success" class="mr-4" @click="addPedido">Agregar Pedido</v-btn>
        <v-btn color="success" class="mr-4" @click="deleteAllPedidos">Borrar Todos</v-btn>
      </v-form>
    </v-row>
  </div>
</template>

<script>
class Pedido {
  constructor(articulo, fecha, precio) {
    this.articulo = articulo;
    this.fecha = fecha;
    this.precio = precio;
  }
}
export default {
  data: () => ({
    pedido: new Pedido(),
    valid: true,
    name: ""
  }),

  methods: {
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
      this.addDate();
      console.log(this.pedido);
      fetch("http://localhost:3000/pedidos", {
        method: "POST",
        body: JSON.stringify(this.pedido),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => console.log(data));
      this.resetFields();
    },
    resetFields() {
      this.pedido.precio = null;
      this.pedido.fecha = null;
      this.pedido.articulo = null;
    },
    deleteAllPedidos() {
      fetch("http://localhost:3000/pedidos/deleteall", {
        method: "DELETE",
        body: JSON.stringify(this.pedido)
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
<style>
</style>
