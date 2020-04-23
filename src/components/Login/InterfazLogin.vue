<template>
  <div>
    <h1>Hola Soy El Login</h1>
    <form @submit.prevent="login">
      <input v-model="usuario" type="text" placeholder="Usuario" />
      <input v-model="contrasena" type="password" placeholder="Contraseña" />
      <input type="submit" value="Acceder" />
    </form>
    <a href="#" @click="logout">LogOut</a>
    <pre>
      {{ $data }}
    </pre>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      usuario: "",
      contrasena: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(
          () => this.$router.replace("MostrarPedidos"),
          error => console.log(error)
        );
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.replace("login"));
    }
  }
};
</script>

<style>
</style>