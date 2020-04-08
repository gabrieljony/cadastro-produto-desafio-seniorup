<template>
  <div>
    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="450"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide img-src="https://picsum.photos/1024/450/?image=54">
          <h1>Oferta do Dia!</h1>
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/450/?image=54">
          <h1>Promoção da Semana!</h1>
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div>
      <b-container fluid="lg">
        <b-row>
          <b-col sm="6" md="4" v-for="product in products" :key="product.id">
            <b-card
              :title="product.title"
              img-src="https://picsum.photos/600/300/?image=25"
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
    Product.get().then(response => {
      this.products = response.data;
    });
  },
  methods: {
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
