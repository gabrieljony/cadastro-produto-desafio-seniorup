<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Product from "../services/product";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      products: []
    };
  },
  mounted() {
    Product.get().then(response => {
      console.log(response, "aqui");
    });
  }
};
</script>

<style scoped>
</style>
