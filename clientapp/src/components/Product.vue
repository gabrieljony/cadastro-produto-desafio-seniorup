<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <PageTitle icon="file-plus" title="Produto" subtitle="Cadastro" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <validation-observer ref="observer" v-slot="{ passes }">
            <b-form @submit.stop.prevent="passes(onSubmit)" @reset="onReset">
              <!-- Nome -->
              <validation-provider
                name="Nome do Produto"
                :rules="{ required: true, min: 3, max:60 }"
                v-slot="validationContext"
              >
                <b-form-group label="Nome:" label-for="title">
                  <b-form-input
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-title"
                    id="title"
                    v-model="form.title"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-title">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <!-- Descrição -->
              <validation-provider
                name="Descrição"
                :rules="{ required: true, max:1024 }"
                v-slot="validationDescription"
              >
                <b-form-group id="input-group-2" label="Descrição:" label-for="input-2">
                  <b-form-input
                    :state="getValidationState(validationDescription)"
                    aria-describedby="input-description"
                    id="input-2"
                    v-model="form.description"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback
                    id="input-description"
                  >{{ validationDescription.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <!-- Preço -->
              <validation-provider
                name="Preço"
                :rules="{ required: true }"
                v-slot="validationPrice"
              >
                <b-form-group id="input-group-3" label="Preço:" label-for="input-3">
                  <b-form-input
                    :state="getValidationState(validationPrice)"
                    aria-describedby="input-description"
                    type="text"
                    id="input-3"
                    v-model="form.price"
                    required
                    placeholder="R$"
                    :formatter="formatterMoney"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-description">{{ validationPrice.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <!-- Categoria -->
              <validation-provider
                name="Categoria"
                :rules="{ required: true }"
                v-slot="validationCategoria"
              >
                <b-form-group id="input-group-4" label="Categoria:" label-for="input-4">
                  <b-form-select
                    :state="getValidationState(validationCategoria)"
                    aria-describedby="input-4-live-feedback"
                    id="input-4"
                    v-model="form.categoryId"
                    required
                  >
                    <b-form-select-option :value="null">Selecione uma categoria</b-form-select-option>
                    <b-form-select-option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                    >{{ category.title }}</b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback
                    id="input-4-live-feedback"
                  >{{ validationCategoria.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <div>
                <b-button type="reset" variant="danger" class="mr-2">Cancelar</b-button>
                <b-button type="submit" variant="primary" v-if="mode === 'save'">Cadastrar</b-button>
                <b-button type="submit" variant="success" v-if="mode === 'update'">Atualizar</b-button>
              </div>
            </b-form>
          </validation-observer>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-container fluid>
          <b-table hover striped :items="products" :fields="fields">
            <template v-slot:cell(price)="data">
              <em>R$ {{ formatPrice(data.item.price) }}</em>
            </template>
            <template v-slot:cell(actions)="data">
              <b-icon
                icon="pencil"
                variant="info"
                font-scale="1.5"
                v-b-tooltip.hover.left
                title="Editar"
                class="mr-1"
                @click="loadProduct(data.item, 'update')"
              ></b-icon>
              <b-icon
                icon="trash"
                variant="danger"
                font-scale="1.5"
                v-b-tooltip.hover.right
                title="Excluir"
                v-b-modal="'myModal'"
                @click="showModal(data.item)"
              ></b-icon>
            </template>
          </b-table>
        </b-container>
      </b-row>
    </b-container>
    <!-- Modal -->
    <b-modal id="myModal" hide-footer>
      <template v-slot:modal-title>Excluir</template>
      <div class="d-block text-center">
        <h3>
          Deseja excluir o Produto:
          <span style="color: #dc3545;">{{ selectedProduct.title }}</span>?
        </h3>
      </div>
      <b-button class="mt-3" @click="$bvModal.hide('myModal')" variant="danger">Cancelar</b-button>
      <b-button class="mt-3" @click="removeProduct(selectedProduct)" variant="primary">Excluir</b-button>
    </b-modal>
  </div>
</template>

<script>
import Category from "../services/category";
import Product from "../services/product";
import PageTitle from "./template/PageTitle";
import VMasker from "vanilla-masker";
import { mascaraMoeda } from "../masks";

export default {
  name: "product",
  components: { PageTitle },
  data() {
    return {
      selectedProduct: "",
      mode: "save",
      categories: [],
      form: {
        title: "",
        description: "",
        price: 0,
        categoryId: null
      },
      fields: [
        {
          key: "id",
          label: "Código",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "title",
          label: "Nome do Produto",
          sortable: true
        },
        {
          key: "description",
          label: "Descrição",
          sortable: true
        },
        {
          key: "price",
          label: "Preço",
          sortable: true
        },
        {
          key: "category.title",
          label: "Categoria",
          sortable: true
        },
        {
          key: "actions",
          label: "Ações",
          class: "text-center"
        }
      ],
      selected: null,
      products: []
    };
  },
  mounted() {
    this.getCategory();
    this.getProducts();
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    getProducts() {
      Product.get().then(response => {
        this.products = response.data;
      });
    },
    getCategory() {
      Category.get().then(response => {
        this.categories = response.data;
      });
    },
    onSubmit() {
      if (this.form.id) {
        Product.put(this.form.id, this.form)
          .then(() => {
            this.onReset();
            this.makeToast("success");
          })
          .catch(() => {
            this.makeToast("danger");
          });
      } else {
        this.form.price = parseFloat(this.form.price.replace(",", ""));
        console.log(this.form.price);
        Product.post(this.form)
          .then(() => {
            this.onReset();
            this.makeToast("success");
          })
          .catch(() => {
            this.makeToast("danger");
          });
      }
    },
    onReset() {
      this.mode = "save";
      this.form = {};
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
      this.getProducts();
    },
    makeToast(variant = null) {
      this.$bvToast.toast(
        `Produto ${
          variant == "success"
            ? "cadastrado com sucesso."
            : "com Error, tente novamente."
        }`,
        {
          title: `${variant == "success" ? "Sucesso" : "Error"}`,
          variant: variant,
          solid: true
        }
      );
    },
    loadProduct(product, mode = "update") {
      this.mode = mode;
      this.form = { ...product };
    },
    removeProduct(product) {
      Product.delete(product.id)
        .then(() => {
          this.onReset();
          this.makeToast("success");
        })
        .catch(() => {
          this.makeToast("danger");
        });

      this.$bvModal.hide("myModal");
    },
    showModal(product) {
      this.onReset();
      this.selectedProduct = product;
    },
    formatPrice(value) {
      return VMasker.toMoney(value);
    },
    formatterMoney(value) {
      if (value) return mascaraMoeda(value, ".", ",");
    }
  }
};
</script>

<style scoped>
</style>
