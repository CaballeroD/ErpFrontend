import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import VueAxios from 'vue-axios'
import firebase from 'firebase'

Vue.use(VueAxios, axios)
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCo_S2oz8WXE2VG9wucsSXBbzpQMPbYvKw",
  authDomain: "erp-tfg.firebaseapp.com",
  databaseURL: "https://erp-tfg.firebaseio.com",
  projectId: "erp-tfg",
  storageBucket: "erp-tfg.appspot.com",
  messagingSenderId: "474992932343",
  appId: "1:474992932343:web:c3d97140bac6d2168d6af2",
  measurementId: "G-NHDV86V1WX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().onAuthStateChanged(function (user) {
  console.log(user)
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");


})

Vue.config.productionTip = false;

