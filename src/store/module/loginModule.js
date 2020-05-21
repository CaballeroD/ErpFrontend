export default {
  namespaced: true,
  state: {
    usuario: "",
    contrasena: "",
    logued: false,
    error: false
  },
  mutations: {
    SetLogued(state, val) {
      state.logued = val;
    },
    SetUsuario(state, val) {
      state.usuario = val;
    },
    SetContrasena(state, val) {
      state.contrasena = val;
    },
    SetError(state, val) {
      state.error = val;
    }
  },
  actions: {},
  getters: {}
};
