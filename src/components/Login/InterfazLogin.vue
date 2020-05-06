<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="start" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <errorUserLog />
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-on:input="updateUser"
                    v-model="usuarioAux"
                    label="Login"
                    name="login"
                    type="text"
                  />

                  <v-text-field
                    v-on:input="updatePassword"
                    v-model="contrasenaAux"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <botonInicioSesion />
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
import Vuex, { mapState } from "vuex";
import errorUserLog from "./ErrorUserLog.vue";
import botonInicioSesion from "./BotonInicioSesion.vue";
Vue.use(Vuex);

export default {
  components: {
    errorUserLog,
    botonInicioSesion
  },
  data() {
    return {
      usuarioAux: "",
      contrasenaAux: ""
    };
  },
  methods: {
    ...Vuex.mapMutations("loginModule", ["SetUsuario", "SetContrasena"]),
    updateUser() {
      this.SetUsuario(this.usuarioAux);
    },
    updatePassword() {
      this.SetContrasena(this.contrasenaAux);
    }
  },
  computed: {
    ...mapState("loginModule", ["usuario", "contrasena"])
  }
};
</script>

