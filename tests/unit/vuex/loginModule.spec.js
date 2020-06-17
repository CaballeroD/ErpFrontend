// Libraries
import Vuetify from "vuetify";
// Components
import loginModule from "@/store/module/loginModule.js";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";
const localVue = createLocalVue();

describe("loginModule.js", () => {

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
