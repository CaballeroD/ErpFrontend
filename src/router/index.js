import Vue from "vue";
import VueRouter from "vue-router";
import MostrarPedidos from "../views/MostrarPedidos.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login"
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/mostrarPedidos",
    name: "MostrarPedidos",
    component: MostrarPedidos,
    meta: {
      autentificado: true
    }
  },
  {
    path: "/articuloInterfaz",
    name: "articuloInterfaz",
    meta: {
      autentificado: true
    },
    component: () =>
      import("../views/ArticuloInterfaz.vue")
  },
  {
    path: "/mostrarPedidosRecibidos",
    name: "MostrarPedidosRecibidos",
    meta: {
      autentificado: true
    },

    component: () =>
      import("../views/MostrarPedidosRecibidos.vue")
  },
  {
    path: "/mostarPersonal",
    name: "MostrarPersonal",
    meta: {
      autentificado: true
    },

    component: () =>
      import("../views/MostrarPersonal.vue")
  },
  {
    path: "/agregarPedido",
    name: "agregarPedido",
    meta: {
      autentificado: true
    },
    component: () =>
      import("../views/AgregarPedido.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  let autorizacion = to.matched.some(record => record.meta.autentificado);
  if (autorizacion && !usuario) {
    next("login");
  } else if (!autorizacion && usuario) {
    next();
  } else {
    next();
  }
});

export default router;
