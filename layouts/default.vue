<template>
  <div>
    <header>
      <nav class="flex w-75 justify-around f4 code pa1">
        <nuxt-link
          to="/"
          exact
          class="link underline-hover"
        >Home</nuxt-link>
        <nuxt-link
          class="link underline-hover"
          to="/new"
        >New</nuxt-link>
        <nuxt-link
          class="link underline-hover"
          to="/show"
        >Show</nuxt-link>
        <nuxt-link
          class="link underline-hover"
          to="/ask"
        >Ask</nuxt-link>
        <nuxt-link
          class="link underline-hover"
          to="/jobs"
        >Jobs</nuxt-link>
      </nav>
    </header>
    <nuxt />
  </div>
</template>

<style>
/* этот класс и атрибут exact у "/" ссылки */
.nuxt-link-active {
  font-weight: bold;
  text-decoration: underline;
}

/* или можно убрать у "/" ссылки атрибут exact и добавить вот этот класс, а nuxt-link-active удалить */
/* .nuxt-link-exact-active {
  text-decoration: underline;
} */
</style>
