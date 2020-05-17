import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex'
import Vue from 'vue'
import errorUserLog from "@/components/Login/ErrorUserLog.vue";
import loginModule from "../../src/store/module/loginModule"
import Vuetify from "vuetify"

Vue.use(Vuetify)


const localVue = createLocalVue()




describe("ErrorUserLog.vue", () => {
  it('establece los datos correctos por defecto', () => {
    expect(typeof errorUserLog.data).toBe('function')
    const defaultData = errorUserLog.data()
    expect(defaultData.absolute).toBe(true)
    expect(defaultData.overlay).toBe(true)
    expect(defaultData.zIndex).toBe(1)
  })
});

describe("ErrorUserLog.vue render", () => {
  let actions
  let state
  let store
  let vuetify

  beforeEach(() => {
    localVue.use(Vuex)
    localVue.use(Vuetify)
    store = new Vuex.Store({
      modules: {
        loginModule: {
          namespaced: loginModule.namespaced,
          state: {
            usuario: "",
            contrasena: "",
            error: true
          },
          actions,
          getters: loginModule.getters
        }
      }
    })
  })
  it('se ha montado correctamente', () => {
    const wrapper = shallowMount(errorUserLog, { store, localVue })
    //expect(wrapper.html()).toMatchSnapshot()
    const texto = wrapper.find('p')
    expect(texto.text()).toBe("El usuario o contraseña ingresada no es correcta.Por favor, inténtelo de nuevo.")
  })
});