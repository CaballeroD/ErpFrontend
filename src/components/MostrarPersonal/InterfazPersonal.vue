<template>
  <div>
    <v-form @submit.prevent="login">
      <v-text-field v-model="nombre" label="Nombre" name="nombre" type="text" />
    </v-form>
    <v-btn type="submit" color="primary" @click="Send">Enviar</v-btn>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return { nombre: "" };
  },
  methods: {
    Send() {
      const user = firebase.auth().currentUser.email;
      console.log(user);
      const envio = { nombre: this.nombre, usuario: user };
      console.log("enviado");
      fetch("http://localhost:3000/empleados/", {
        method: "POST",
        body: JSON.stringify(envio),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      });
    }
  }
};
</script>

<style>
</style>