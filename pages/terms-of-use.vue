<template>
  <div class="container">
    <div class="top-bar">
      <!-- Кнопка назад -->
      <nuxt-link class="link-back" :to="$nuxt.context.from">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.78438 11.543C6.58912 11.7383 6.58912 12.0548 6.78438 12.2501L9.96636 15.4321C10.1616 15.6273 10.4782 15.6273 10.6735 15.4321C10.8687 15.2368 10.8687 14.9202 10.6735 14.725L7.84504 11.8965L10.6735 9.06812C10.8687 8.87286 10.8687 8.55627 10.6735 8.36101C10.4782 8.16575 10.1616 8.16575 9.96636 8.36101L6.78438 11.543ZM23 11.3965L7.13793 11.3965V12.3965L23 12.3965V11.3965Z"
            fill="#343434"
          />
          <circle cx="11.5" cy="11.5" r="11" stroke="#343434" />
        </svg>
        <span>Назад</span>
      </nuxt-link>
    </div>

    <div class="page-title">Пользовательское соглашение</div>
    <div v-html="text" class="page-text"></div>
  </div>
</template>


<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      text: {},
    };
  },
  async asyncData({ $axios, error, params }) {
    let response = await $axios.$get(`/renter/texts`, {
      params: {
        name: "service_rules",
      },
    });
    return { text: response.service_rules };
  },
};
</script>
