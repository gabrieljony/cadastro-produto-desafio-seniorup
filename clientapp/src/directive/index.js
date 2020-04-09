import FormMask from './v-form-mask'

const directives = {
  'form-mask': FormMask,
};

export default {
  register(Vue) {
    for (let key in directives) {
      if (directives.hasOwnProperty(key)) {
        Vue.directive(key, directives[key])
      }
    }
  }
}


