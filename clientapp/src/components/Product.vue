<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h1>Cadastro de Produto</h1>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
              <b-form-input id="input-1" v-model="form.title" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Descrição:" label-for="input-2">
              <b-form-input id="input-2" v-model="form.description" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Preço:" label-for="input-3">
              <b-form-input
                type="number"
                id="input-3"
                v-model="form.price"
                required
                placeholder="0.00"
                min="0.00"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Categoria:" label-for="input-4">
              <b-form-select id="input-4" v-model="form.categoryId" required>
                <b-form-select-option :value="null">Selecione uma categoria</b-form-select-option>
                <b-form-select-option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <div class="mt-2">
              Selected:
              <strong>{{ form.categoryId }}</strong>
            </div>

            <div>
              <b-button type="reset" variant="danger">Cancelar</b-button>
              <b-button type="submit" variant="primary">Cadastrar</b-button>
            </div>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Category from "../services/category";

export default {
  name: "product",
  data() {
    return {
      categories: [],
      form: {
        title: "",
        description: "",
        price: null,
        categoryId: null
      },
      selected: null,
      show: true
    };
  },
  mounted() {
    Category.get().then(response => {
      this.categories = response.data;
      console.log(this.categories);
    });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>
</style>
