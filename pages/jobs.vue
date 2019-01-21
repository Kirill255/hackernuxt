<template>
  <section class="container">
    <div class="ph3">
      <Items />

    </div>
  </section>
</template>

<script>
// import axios from "~/plugins/axios";
import Items from "~/components/Items.vue";

export default {
  name: "Jobs",
  components: {
    Items
  },
  // делаем запрос напрямую из компонента, без всяких сторов с nuxtServerInit или другими экшенами
  // asyncData() {
  //   return axios.get("users").then(res => ({ users: res.data }));
  // },
  async fetch({ store }) {
    await store.dispatch("LOAD_ITEMS", "jobstories.json");
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
