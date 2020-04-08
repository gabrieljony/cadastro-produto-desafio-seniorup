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
        <b-container fluid>
          <b-table hover striped :items="categories" :fields="fields"></b-table>
        </b-container>
      </b-row>
    </b-container>
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
          sortDirection: 'desc'
        },
        {
          key: "title",
          label: "Nome",
          sortable: true,
        },
        {
          key: "actions",
          label: "Ações",
          class: 'text-center'
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
      if (this.categories.id) {
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
      console.log(variant);
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
    }
  }
};
</script>

<style scoped>
</style>
