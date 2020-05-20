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
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(
          () => this.$router.replace("MostrarPedidos"),
          () => this.SetError(true)
        )
        .then(() => this.SetLogued(true));
    }
  },
  computed: {
    ...mapState("loginModule", ["logued", "usuario", "contrasena"])
  }
};
</script>
