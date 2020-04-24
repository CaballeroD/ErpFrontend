<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="start" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field v-model="usuario" label="Login" name="login" type="text" />

                  <v-text-field
                    v-model="contrasena"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn type="submit" color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);
export default {
  props: {
    source: String
  },
  data() {
    return {
      usuario: "",
      contrasena: ""
    };
  },
  methods: {
    ...Vuex.mapMutations(["changeLogued"]),
    login() {
      console.log("hola");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(
          () => this.$router.replace("MostrarPedidos"),
          error => console.log(error)
        )
        .then(() => this.changeLogued());
    }
  }
};
</script>

<style>
</style>