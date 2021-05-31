<template>
  <div>
    <!-- <nuxt-link class="link-back" to="/register">
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
      <span>Регистрация</span>
    </nuxt-link> -->

    <div class="container">
      <div v-if="status == 'phone'" class="title-welcome">УРА!</div>
      <div v-if="status == 'phone'" class="text-welcome">
        <p>
          Здравствуйте, пройдите регистрацию.<br />На основании внесенных данных
          сформируется личный кабинет с договором и кнопкой оплаты.
        </p>
        <p>
          Ключи можно будет получить на основании паспорта в день заезда по
          адресу: {{ address }}
        </p>
      </div>

      <div v-if="status == 'code'" class="text-welcome">Введите код из СМС</div>
      <div v-if="status == 'code'" class="auth-phone">
        {{ phone }}
        <!-- | phone_number -->
      </div>

      <form v-on:submit.prevent="sendPhone()">
        <input
          v-if="status == 'phone'"
          class="form-text"
          type="tel"
          placeholder="Номер телефона"
          v-mask="'+# (###) ###-##-##'"
          v-model="phone"
        />
        <button class="form-button-go" type="submit">Прислать код</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "", // +79991899777
      code: "",
      address: "",
      status: "phone",
    };
  },
  methods: {
    async sendPhone() {
      try {
        this.status = "code";

        let response = await this.$axios.$post("/renter/send-sms-code", {
          progress: false,
        });
        console.log(response.data);
        // this.fines = response.data;
      } catch (error) {
        console.log(error);
        // this.$Notice.error({
        //    title: "Ошибка обновления"
        // });
      }
    },
  },
};
</script>