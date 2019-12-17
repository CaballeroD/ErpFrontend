<template>
  <v-content>
    <v-container>
      <OrderBox />
    </v-container>
  </v-content>
</template>

<script>
import OrderBox from "@/components/OrderBox.vue";

export default {
  name: "Pedidos",
  components: {
    OrderBox
  }
};
</script>
