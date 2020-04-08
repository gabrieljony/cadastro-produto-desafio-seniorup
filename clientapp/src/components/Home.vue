<template>
  <div>
    <b-container fluid="lg">
      <b-row>
        <b-col sm="6" md="4" v-for="product in products" :key="product.id">
          <b-card
            :title="product.title"
            :img-src="require('../assets/photo.png')"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="my-3 mx-auto"
          >
            <b-badge variant="info">{{product.category.title}}</b-badge>
            <b-card-text>{{ product.description }}</b-card-text>
            <template v-slot:footer>
              <em>{{ product.price }}</em>
            </template>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Product from "../services/product";

export default {
  name: "home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      products: [],
      slide: 0,
      sliding: null
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      Product.get().then(response => {
        this.products = response.data;
      });
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style scoped>
</style>
