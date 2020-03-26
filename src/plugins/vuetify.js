import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);
const opts = {
  dark: true,
  theme: {
    themes: {
      light: {
        //- blue
        primary: '#183275',
        //- red
        secondary: '#6d1212',
        //- tellow
        warning: '#d1b414',
        //- green
        success: "#114213"
      }, dark: {
        primary: '#124084',
        secondary: '#ea5b5b', warning: '#e2c106',
        success: "#0e6011"

      }
    }
  }
}
export default new Vuetify(opts);
