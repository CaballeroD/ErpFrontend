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
      const envio = { nombre: this.nombre, usuario: user };
      fetch("http://178.62.8.6:3000/empleados/", {
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

<style></style>
