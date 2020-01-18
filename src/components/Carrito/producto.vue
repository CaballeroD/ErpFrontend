<template>
  <div class="producto">
    <div class="div-img">
      <img src="./producto.jpg" />
      <h1>{{producto.nombre}}</h1>
      <div class="precio">Bs {{producto.precio}}</div>
      <span class="qty" v-if="qtyCart>0">x {{qtyCart}}</span>
    </div>
    <button class="btn" v-if="qtyCart===0" @click="addToCart">Agregar Al carrito</button>
    <div class="botones" v-else>
      <button class="btns" @click="inc">+</button>
      <button class="btns" @click="dec">-</button>
    </div>
  </div>
</template>
<script>
import logica from "./logica";
export default {
  props: ["producto"],
  data() {
    return {
      shared: logica.data
    };
  },
  computed: {
    qtyCart() {
      var busqueda = _.find(this.shared.cart, ["id", this.producto.id]);
      if (typeof busqueda == "object") {
        return busqueda.qty;
      } else {
        return 0;
      }
    }
  },
  methods: {
    addToCart() {
      logica.add(this.producto);
    },
    inc() {
      logica.inc(this.producto);
    },
    dec() {
      logica.dec(this.producto);
    }
  }
};
</script>
<style>
.btn {
  background-color: #42b992;
  width: 100%;
  border: none;
  color: white;
  padding: 0.5em;
}
.botones {
  display: flex;
}
.btns {
  width: 50%;
}
.producto {
  background: white;
  margin: 0 0.5em;
  text-align: center;
  margin-bottom: 1em;
}
</style>