<template>
  <v-btn data-test="loginButtonTest" type="submit" color="primary" @click="login">Login</v-btn>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import Vuex, { mapState } from "vuex";

Vue.use(Vuex);

export default {
  data: () => ({
    absolute: true,
    overlay: false
  }),
  methods: {
    ...Vuex.mapMutations("loginModule", ["SetLogued", "SetError"]),
    login() {
      console.log(this.logued);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(() => this.SetLogued(true))
        .then(() => this.$router.replace("MostrarPedidos"))
        .catch(function(error) {
          console.log("estoy dentro del catch"), console.log(error);
        })
        .then(() => this.SetError(true));
    }
  },
  computed: {
    ...mapState("loginModule", ["logued", "usuario", "contrasena"])
  }
};
</script>
