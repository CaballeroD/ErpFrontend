// Libraries
import Vuetify from "vuetify";
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuetify);
// Components
import loginModule from "@/store/module/loginModule.js";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";
const localVue = createLocalVue();

describe("loginModule.js", () => {
    let actions;
    let store;
    beforeEach(() => {
        localVue.use(Vuex);
        localVue.use(Vuetify);
        store = new Vuex.Store({
            modules: {
                loginModule: {
                    namespaced: loginModule.namespaced,
                    state: {
                        usuario: "",
                        contrasena: "",
                        error: false
                    },
                    actions,
                    mutations: loginModule.mutations,
                    getters: loginModule.getters
                }
            }
        });
    });

    it("SetLogued", () => {
        expect(typeof loginModule.mutations.SetLogued).toBe('function')
    });
    it("SetUsuario", () => {
        expect(typeof loginModule.mutations.SetUsuario).toBe('function')
    });
    it("SetContrasena", () => {
        expect(typeof loginModule.mutations.SetContrasena).toBe('function')
    });
    it("SetError", () => {
        expect(typeof loginModule.mutations.SetError).toBe('function')
    });
});
