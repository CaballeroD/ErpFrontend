<template>
  <Combobox></Combobox>
</template>

<script>
import Combobox from "@/components/AddPedido/Combobox.vue";

export default {
  components: {
    Combobox
  },
  data: () => ({
    valid: true,
    name: ""
  }),

  methods: {
    deleteAllPedidos() {
      fetch("http://localhost:3000/pedidos/deleteall", {
        method: "DELETE",
        body: JSON.stringify(this.pedido)
      });
    }
  }
};

/**/
</script>
<style>
</style>
