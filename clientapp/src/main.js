import Vue from 'vue'
import App from './App'
import router from './router'
import './config/bootstrap'

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import pt_BR from "vee-validate/dist/locale/pt_BR.json";
import * as rules from "vee-validate/dist/rules";


// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("pt_BR", pt_BR);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
