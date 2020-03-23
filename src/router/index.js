import Vue from "vue";
import VueRouter from "vue-router";
import MostrarPedidos from "../views/MostrarPedidos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MostrarPedidos",
    component: MostrarPedidos
  },

  {
    path: "/articuloInterfaz",
    name: "articuloInterfaz",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ArticuloInterfaz.vue")
  },
  {
    path: "/mostrarPedidosRecibidos",
    name: "MostrarPedidosRecibidos",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MostrarPedidosRecibidos.vue")
  },
  {
    path: "/mostarPersonal",
    name: "MostrarPersonal",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MostrarPersonal.vue")
  },
  {
    path: "/agregarPedido",
    name: "agregarPedido",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AgregarPedido.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
