<template>
  <div id="app">
    <Header title="Store Computer" />
    <Content />
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from "@/components/template/Header";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";

export default {
  name: "app",

  components: {
    Header,
    Footer,
    Content
  }
};
</script>

<style>
* {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
}

.footer {
  bottom: 0;
  width: 100%;
}
</style>
