<template>
  <div class="container text-center">
    <h2 v-if="error.title" class="error-title">{{ error.title }}</h2>
    <h2 v-else class="error-title">Ошибка {{ error.statusCode }}</h2>

    <div v-if="error.description" class="error-description">
      {{ error.description }}
    </div>
    <div v-else class="error-description">Что-то пошло не так</div>

    <div>
      <nuxt-link class="form-button-go" to="/">На главную</nuxt-link>
    </div>
  </div>
</template>


<script>
export default {
  props: ["error"],
  layout: "errors",
  // layout: this.$auth.loggedIn ? 'default' : 'errors'
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.error-title {
  font-size: 24px;
  line-height: 18px;
  text-align: center;
  margin-bottom: 30px;
}
.error-description {
  font-weight: 400;
  font-size: 14px;
}
</style>