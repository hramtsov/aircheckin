<template>
  <div>
    <div class="container">
      <template v-if="status == 'phone'">
        <div class="title-welcome">УРА!</div>
        <div class="text-welcome">
          <p>
            Для продолжения необходимо подтвердить ваш номер телефона, мы
            пришлём SMS с проверочными кодом
          </p>
        </div>

        <input
          class="form-text"
          type="tel"
          placeholder="Номер телефона"
          v-mask="'+# (###) ###-##-##'"
          v-model="phone"
        />

        <div v-if="errors.phone" class="text-error">{{ errors.phone[0] }}</div>
        <button class="form-button-go" @click="sendPhone()">
          Прислать код
        </button>
        <div v-if="error" class="general-helper">{{ error }}</div>
      </template>

      <template v-if="status == 'code'">
        <div class="top-bar">
          <!-- Кнопка назад -->
          <div class="link-back" @click="back()">
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
          </div>
        </div>
        <div class="text-enter-sms">Введите код из СМС</div>
        <div class="auth-phone">
          {{ phone }}
          <!-- | phone_number -->
        </div>

        <div class="form-code-text">
          <vie-otp-input
            inputClasses="otp-input"
            :numInputs="4"
            separator=""
            :shouldAutoFocus="true"
            @on-complete="auth"
          />
        </div>

        <div v-if="errors.code" class="text-code-error">
          {{ errors.code[0] }}
        </div>

        <button class="form-button-go" @click="auth()">Войти</button>
        <div v-if="error" class="general-helper">{{ error }}</div>
      </template>
    </div>
  </div>
</template>

<script>
import VieOtpInput from "@bachdgvn/vue-otp-input";
export default {
  data() {
    return {
      phone: "", //
      code: "",
      status: "phone",
      error: "",
      errors: {},

      timer: {
        time: 60,
        started: false,
        interval: null,
      },
    };
  },
  auth: "guest",
  components: {
    VieOtpInput,
  },
  methods: {
    back() {
      this.status = "phone";
      this.phone = "";
    },
    startTimer() {
      this.timer.interval = setInterval(this.countDown, 1000);
    },
    countDown() {
      var n = this.timer.time;
      if (!this.timer.started) {
        this.timer.started = true;
      } else if (n > 0) {
        n = n - 1;
        this.timer.time = n;
        this.error = "Отправить новый код через " + n + " сек.";
      } else {
        clearInterval(this.timer.interval);
        this.timer.started = false;
        this.error = "";
      }
    },

    async auth(code) {
      console.log(code);
      try {
        var phone_ = this.phone.replace(/\D+/g, "");

        let response = await this.$auth
          .loginWith("local", {
            data: {
              phone: "+" + phone_,
              code: code,
            },
          })
          .then(() => {
            if (this.$store.state.voucher_code) {
              this.$router.push(`/voucher/${this.$store.state.voucher_code}`);
            } else {
              this.$router.push(`/bookings`);
            }
            // console.log();
          });
        // console.log(response.data);
      } catch (error) {
        console.log(error);
        // if (error.response.status == 422) {
        //   this.errors = error.response.data.errors;
        // }
      }
    },

    async sendPhone() {
      try {
        var phone_ = this.phone.replace(/\D+/g, "");
        //
        let response = await this.$axios.$post(
          "/renter/send-sms-code",
          {
            phone: "+" + phone_,
          },
          {
            progress: false,
          }
        );
        // console.log(response);
        this.status = "code";
      } catch (error) {
        // this.error = error.response.data.message;
        // this.error = this.timer.message;
        if (error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.startTimer();
        }

        // console.log(error.response.data);
      }
    },
  },
};
</script>