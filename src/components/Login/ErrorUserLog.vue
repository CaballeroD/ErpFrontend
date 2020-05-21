<template>
  <v-row v-if="this.error" align="center" justify="center">
    <v-overlay
      :absolute="absolute"
      :value="overlay"
      :opacity="opacity"
      :z-index="zIndex"
    >
      <v-card
        class="d-flex justify-center align-center flex-column"
        max-width="344"
      >
        <v-card-text class="d-flex justify-center align-center flex-column">
          <h1 class="red--text text--lighten-2">Error</h1>
          <p class="text-center mt-4">
            El usuario o contraseña ingresada no es correcta.Por favor,
            inténtelo de nuevo.
          </p>
        </v-card-text>
        <v-btn color="blue" class="mb-4" max-width="344" @click="changeError"
          >Cerrar</v-btn
        >
      </v-card>
    </v-overlay>
  </v-row>
</template>

<script>
import Vue from "vue";
import Vuex, { mapState } from "vuex";

Vue.use(Vuex);

export default {
  data: () => ({
    absolute: true,
    overlay: true,
    zIndex: 1
  }),
  methods: {
    ...Vuex.mapMutations("loginModule", ["SetError"]),
    changeError() {
      this.overlay = false;
      this.SetError(false);
      this.overlay = true;
    }
  },
  computed: {
    ...mapState("loginModule", ["error"])
  }
};
</script>
