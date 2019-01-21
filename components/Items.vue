<template>
  <!--
    <ul>
      <li
        v-for="user in users"
        :key="user.id"
      >{{ user.login }}</li>
    </ul>
    -->
  <!--
    <ul>
      <li
        v-for="id in ids"
        :key="id"
      >{{ id }}</li>
    </ul>
     -->
  <div v-if="items">
    <div class="code">
      <ul class="list pa2">
        <li
          v-for="item in items"
          :key="item.id"
          class="item f6"
        >
          <div class="score">{{ item.score }}</div>
          <div class="title">
            {{ item.title }}
            <template v-if="item.url">
              <a
                class="f7"
                :href="item.url"
              >{{ item.url | hostname }}</a>
            </template>
          </div>
          <div class="details">
            by
            <nuxt-link :to="'/user/' + item.by">{{ item.by }}</nuxt-link>
            <p class="ma0 i f7">{{ item.time | timeSince }} ago</p>
          </div>

          <template v-if="item.descendants">
            <div class="comments">
              <nuxt-link :to="'/item/' + item.id">{{ item.descendants }} comments</nuxt-link>

            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Items",
  computed: {
    // ...mapState(["users"])
    // ...mapState(["ids"])
    ...mapState(["items"])
  }
};
</script>

<style scoped>
.item {
  display: grid;
  grid: repeat(4, 1.5em) / repeat(10, 1fr);
  grid-row-gap: 1em;
}

.score {
  grid-row: 1 / -1;
  grid-column: span 1;
  align-self: center;
  justify-self: center;
}

.title {
  grid-row: 1 / 3;
  grid-column: 2 / -2;
  align-self: end;
}

.comments {
  grid-row: 3 / -1;
  grid-column: 2 / 6;
}

.details {
  grid-row: 3 / -1;
  grid-column: 6 / -2;
  justify-self: end;
}
</style>
