<template>
  <v-content>
    <v-container>
      <InterfazPedido />
    </v-container>
  </v-content>
</template>

<script>
import InterfazPedido from "@/components/InterfazPedido.vue";

export default {
  name: "Pedidos",
  components: {
    InterfazPedido
  }
};
</script>
