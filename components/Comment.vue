<template>
  <div>
    <div class="bb mb4">
      <div class="mb1">
        <span class="i">{{ item.id }} </span>
        <nuxt-link :to="'/user/' + item.by">{{ item.by }}</nuxt-link> {{ item.time | timeSince }} ago
      </div>
      <div
        class="f6"
        v-html="item.text"
      >
        <!--  -->
      </div>
      <div class="i f6 gray">
        kids: {{ item.kids }}
      </div>

    </div>
    <ul class="ml3">
      <!-- Компонент рендерится рекурсивно, Comment внутри Comment  -->
      <Comment
        v-for="idKid in item.kids"
        :id="idKid"
        :key="idKid"
      />
    </ul>
  </div>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  name: "Comment",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      item: {},
      kids: []
    };
  },
  // так как в простых компонентах(не страницах(pages)) недоступна asyncData, используем beforeMount
  async beforeMount() {
    const response = await axios.get(`item/${this.id}.json`);
    this.item = response.data;
  },
  async mounted() {
    if (this.item.kids) {
      const idToPromise = id => axios.get(`item/${id}.json`);
      const kidPromises = this.item.kids.map(idToPromise);
      const kidResponses = await Promise.all(kidPromises);
      this.kids = kidResponses.map(res => res.data);
    }
  }
};
</script>

<style scoped>
</style>
