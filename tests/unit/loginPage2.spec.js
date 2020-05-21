// Libraries
import Vuetify from "vuetify";

// Components
import BotonInicioSesion from "@/components/Login/BotonInicioSesion";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";
const localVue = createLocalVue();

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
      localVue,
      vuetify
    });

    // With jest we can create snapshot files of the HTML output
    //expect(wrapper.html()).toMatchSnapshot()
    const title = wrapper.find('[data-test="loginButtonTest"]');

    expect(title.text()).toBe("Login");
  });
});
