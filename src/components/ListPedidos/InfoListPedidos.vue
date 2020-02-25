<template>
  <v-expansion-panel-content>
    <div class="pt-4" v-for="(item,i) in this.InfoPedidosList" :key="i">
      <div v-for="(aux,j) in item.articulosArray" :key="j">
        <span>{{ aux.nombre }}</span>
        <span>{{ aux.precio }}</span>
      </div>
    </div>
  </v-expansion-panel-content>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default {
  data: () => ({}),
  methods: {},
  computed: {
    ...Vuex.mapState(["InfoPedidosList"])
  }
};
</script>


<style>
</style>