// Libraries
import Vuetify from "vuetify";
import Vue from "vue";
// Components
import BotonInicioSesion from "@/components/Login/BotonInicioSesion";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";
const localVue = createLocalVue();

Vue.use(Vuetify);

describe("CustomCard.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify({
      mocks: {
        $vuetify: {
          lang: {
            t: val => val
          }
        }
      }
    });
  });

  it("should have a custom title and match snapshot", () => {
    const wrapper = shallowMount(BotonInicioSesion, {
      localVue
    });
    const title = wrapper.find('[data-test="loginButtonTest"]');
    expect(title.text()).toBe("Login");
  });
  it("should be firebase login function", () => {
    const wrapper = shallowMount(BotonInicioSesion, {
      localVue
    });
    expect(typeof BotonInicioSesion.methods.login).toBe('function')
  });

});
