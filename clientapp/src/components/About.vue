<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <PageTitle icon="info-square" title="Sobre" subtitle="Informações do Desafio proposto" />
          <p>Desenvolvedor(a) Web Full Stack na POS CONTROLE</p>
          <p>
            1) Desenvolva um Web App (responsivo) para cadastro de produtos, evidenciando a utilização dos seguintes conceitos:
            <ul>
              <li>Front End: Vue.js</li>
              <li>Back end: .NET</li>
            </ul>
            Prazo de entrega: até 72h horas após a hora de envio deste desafio por e-mail.
          </p>
          <p>Stack utilizadas:</p>
          <ul>
            <li>ASP.NET Core Web API</li>
            <li>EF Core</li>
            <li>VueJs</li>
            <li>Bootstrap</li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PageTitle from "./template/PageTitle";

export default {
  name: "about",
  components: { PageTitle }
};
</script>

<style scoped>
</style>
