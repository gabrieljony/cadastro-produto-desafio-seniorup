<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <h1 class="title">
        <router-link to="/">{{ title }}</router-link>
      </h1>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/about">Sobre</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/product">Produtos</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/category">Categorias</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/contact">Contato</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String
  }
};
</script>

<style scoped>
.title {
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  color: #efefef;
  text-decoration: none;
}
</style>
