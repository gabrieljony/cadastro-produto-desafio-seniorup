<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <PageTitle icon="app-indicator" title="Categoria" subtitle="Cadastro" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <validation-observer ref="observer" v-slot="{ passes }">
            <b-form @submit.stop.prevent="passes(onSubmit)" @reset="onReset">
              <validation-provider
                name="Nome"
                :rules="{ required: true, min: 3, max:60 }"
                v-slot="validationContext"
              >
                <b-form-group label="Nome:" label-for="title">
                  <b-form-input
                    :state="getValidationState(validationContext)"
                    aria-describedby="input-1-live-feedback"
                    id="title"
                    v-model="form.title"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback
                    id="input-1-live-feedback"
                  >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <div>
                <b-button type="reset" variant="danger" class="mr-2">Cancelar</b-button>
                <b-button type="submit" variant="primary" v-if="mode === 'save'">Cadastrar</b-button>
                <b-button type="submit" variant="primary" v-if="mode === 'update'">Atualizar</b-button>
              </div>
            </b-form>
          </validation-observer>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-table hover striped :items="categories" :fields="fields">
          <template v-slot:cell(actions)="data">
            <b-icon
              icon="pencil"
              variant="info"
              font-scale="1.5"
              v-b-tooltip.hover.left
              title="Editar"
              class="mr-1"
              @click="loadCategory(data.item, 'update')"
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
      </b-row>
    </b-container>
    <!-- Modal -->
    <b-modal id="myModal" hide-footer>
      <template v-slot:modal-title>Excluir</template>
      <div class="d-block text-center">
        <h3>
          Deseja excluir a Categoria:
          <span style="color: #dc3545;">{{ selectedCategories.title }}</span>?
        </h3>
      </div>
      <b-button class="mt-3" @click="$bvModal.hide('myModal')" variant="danger">Cancelar</b-button>
      <b-button class="mt-3" @click="removeCategory(selectedCategories)" variant="primary">Excluir</b-button>
    </b-modal>
  </div>
</template>

<script>
import PageTitle from "./template/PageTitle";
import Category from "../services/category";

export default {
  name: "category",
  components: { PageTitle },
  data() {
    return {
      selectedCategories: "",
      mode: "save",
      categories: [],
      form: {
        title: ""
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
          label: "Nome",
          sortable: true
        },
        {
          key: "actions",
          label: "Ações",
          class: "text-center"
        }
      ]
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    getCategory() {
      Category.get().then(response => {
        this.categories = response.data;
      });
    },
    onSubmit() {
      if (this.form.id) {
        console.log(this.form.id);
      } else {
        Category.post(this.form)
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
      this.form.title = "";
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
      this.getCategory();
    },
    makeToast(variant = null) {
      // console.log(variant);
      this.$bvToast.toast(
        `Categoria ${
          variant == "success"
            ? "cadastrada com sucesso."
            : "com Error, tente novamente."
        }`,
        {
          title: `${variant == "success" ? "Sucesso" : "Error"}`,
          variant: variant,
          solid: true
        }
      );
    },
    loadCategory(categories, mode = "update") {
      this.mode = mode;
      this.form = { ...categories };
    },
    removeCategory(categories) {
      // console.log(categories);
      this.$bvModal.hide("myModal");
    },
    showModal(categories) {
      this.selectedCategories = categories;
    }
  }
};
</script>

<style scoped>
</style>
