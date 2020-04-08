<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <PageTitle icon="app-indicator" title="Categoria"
            subtitle="Cadastro" />
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
              <b-form-input id="input-1" v-model="form.title" required></b-form-input>
            </b-form-group>

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
      <b-row>
        <b-container fluid>
          <b-table
            show-empty
            small
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
          >

            <template v-slot:cell(actions)="row">
              <b-icon-pencil
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              ></b-icon-pencil>
              <b-icon-trash
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
              ></b-icon-trash>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <pre>{{ infoModal.content }}</pre>
          </b-modal>
        </b-container>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PageTitle from './template/PageTitle'

export default {
  name: "category",
  components: { PageTitle },
  data() {
    return {
      form: {
        title: ""
      },
      show: true,
      items: [
        {
          title: "Categoria 1"
        },
        {
          title: "Categoria 2"
        },
        {
          title: "Categoria 3"
        },
        {
          title: "Categoria 4"
        },
        {
          title: "Categoria 5"
        },
        {
          title: "Categoria 6"
        }
      ],
      fields: [
        {
          key: "title",
          label: "Categorias",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "actions", label: "Ações" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    this.totalRows = this.items.length;
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
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
</style>
