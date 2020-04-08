<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Store Computer</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/">Home</b-nav-item>
          <b-nav-item href="/about">Sobre</b-nav-item>
          <b-nav-item href="/product">Produtos</b-nav-item>
          <b-nav-item href="/category">Categorias</b-nav-item>
          <b-nav-item href="/contact">Contato</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "header"
};
</script>

<style scoped>
</style>
