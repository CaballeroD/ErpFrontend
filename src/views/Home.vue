<template>
  <div class="home">
    <Pedidos />
  </div>
</template>

<script>
// @ is an alias to /src
import Pedidos from "@/components/Pedidos.vue";

export default {
  name: "home",
  components: {
    Pedidos
  }
};
</script>
