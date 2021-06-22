<template>
  <div class="container">
    <div class="form-register">
      <div class="form-text-item">
        <input
          :class="['form-text', [errors.last_name ? 'form-text-error' : '']]"
          type="text"
          placeholder="Фамилия"
          v-model="form.last_name"
        />

        <div v-if="errors.last_name" class="error-field">Обязательное поле</div>
      </div>

      <div class="form-text-item">
        <input
          :class="['form-text', [errors.first_name ? 'form-text-error' : '']]"
          type="text"
          placeholder="Имя"
          v-model="form.first_name"
        />
        <div v-if="errors.first_name" class="error-field">
          Обязательное поле
        </div>
      </div>

      <div class="form-text-item">
        <input
          :class="['form-text', [errors.middle_name ? 'form-text-error' : '']]"
          type="text"
          placeholder="Отчество"
          v-model="form.middle_name"
        />
        <div v-if="errors.middle_name" class="error-field">
          Обязательное поле
        </div>
      </div>

      <div class="form-text-item">
        <input
          :class="['form-text', [errors.email ? 'form-text-error' : '']]"
          type="email"
          placeholder="Почта"
          v-model="form.email"
        />
        <div v-if="errors.email" class="error-field">Обязательное поле</div>
      </div>

      <input
        class="form-text"
        type="tel"
        placeholder="Номер телефона"
        v-mask="'+# (###) ###-##-##'"
        :value="form.phone"
        disabled
      />

      <div class="form-text-item">
        <input
          :class="['form-text', [errors.birth_date ? 'form-text-error' : '']]"
          type="text"
          placeholder="Дата рождения"
          v-mask="'##.##.####'"
          v-model="form.birth_date"
        />
        <div v-if="errors.birth_date" class="error-field">
          Обязательное поле
        </div>
      </div>

      <div class="select-wrapper">
        <span class="arrow"
          ><svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.69178 4.37128C3.89703 4.55602 4.21318 4.53939 4.39791 4.33415L7.40839 0.989448C7.59313 0.784201 7.57651 0.468056 7.37126 0.283317C7.16601 0.0985794 6.84987 0.115205 6.66513 0.320453L3.98914 3.29352L1.01608 0.617534C0.810833 0.432796 0.494687 0.449422 0.309949 0.65467C0.125211 0.859917 0.141837 1.17606 0.347084 1.3608L3.69178 4.37128ZM3.50069 3.52612L3.52697 4.02591L4.52559 3.97339L4.49931 3.4736L3.50069 3.52612Z"
              fill="#343434"
            />
          </svg>
        </span>
        <select class="form-text" v-model="form.passport_type">
          <option value="1">Паспорт РФ</option>
          <option value="2">Зарубежный паспорт</option>
        </select>
      </div>

      <div class="form-text-item">
        <div class="passport-data">
          <input
            :class="[
              'form-text passport-serial',
              [errors.passport_serial ? 'form-text-error' : ''],
            ]"
            type="text"
            placeholder="Серия"
            v-model="form.passport_serial"
          />
          <input
            :class="[
              'form-text passport-number',
              [errors.passport_number ? 'form-text-error' : ''],
            ]"
            type="text"
            placeholder="Номер"
            v-model="form.passport_number"
          />
        </div>
        <div
          v-if="errors.passport_serial || errors.passport_number"
          class="error-field"
        >
          Обязательные поля
        </div>
      </div>

      <label class="label-textarea">Комментарий</label>
      <textarea
        placeholder="Укажите номер вашего автомобиля для пропуска"
        v-model="form.description"
        class="form-text"
        cols="30"
        rows="5"
      ></textarea>

      <div class="checkbox">
        <input
          type="checkbox"
          id="personal_data"
          v-model="form.personal_data"
        />
        <label for="personal_data"
          >Я согласен на обработку персональных данных</label
        >

        <div v-if="errors.personal_data" class="error-field">
          Обязательное условие
        </div>
      </div>

      <div class="checkbox">
        <input type="checkbox" id="i_agree" v-model="form.i_agree" />
        <label for="i_agree"
          >Я согласен с
          <nuxt-link to="/terms-of-use">правилами</nuxt-link> сервиса</label
        >

        <div v-if="errors.i_agree" class="error-field">
          Обязательное условие
        </div>
      </div>

      <button v-if="!process.reg" class="form-button-go" @click="register">
        Зарегистрироваться
      </button>

      <button v-if="process.reg" disabled class="form-button-go">
        <div class="donut"></div>
      </button>
    </div>

    <!-- <div v-if="errors.phone" class="text-error">{{ errors.phone[0] }}</div> -->

    <!-- <div v-if="error" class="general-helper">{{ error }}</div> -->
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      process: {
        reg: false,
      },
      booking: {},
      form: {
        first_name: "",
        last_name: "",
        middle_name: "",
        phone: "",
        email: "",
        birth_date: "",
        passport_type: "",
        passport_serial: "",
        passport_number: "",
        description: "",
        personal_data: false,
        i_agree: false,

        // citizenship: "Russia",
      },

      errors: {
        personal_data: false,
        i_agree: false,
        first_name: false,
        last_name: false,
        middle_name: false,
        email: false,
        birth_date: false,
        passport_serial: false,
        passport_number: false,
      },
    };
  },

  mounted() {
    this.checkStatus();
    this.form.phone = this.$auth.user.phone;

    this.form.first_name = this.$auth.user.first_name
      ? this.$auth.user.first_name
      : "";
    this.form.last_name = this.$auth.user.last_name
      ? this.$auth.user.last_name
      : "";
    this.form.middle_name = this.$auth.user.middle_name
      ? this.$auth.user.middle_name
      : "";

    this.form.email = this.$auth.user.email ? this.$auth.user.email : "";
    this.form.birth_date = this.$auth.user.birth_date
      ? this.$auth.user.birth_date
      : "";

    this.form.passport_type = this.$auth.user.passport_type
      ? this.$auth.user.passport_type
      : "";

    this.form.passport_serial = this.$auth.user.passport_serial
      ? this.$auth.user.passport_serial
      : "";

    this.form.passport_number = this.$auth.user.passport_number
      ? this.$auth.user.passport_number
      : "";
  },

  watch: {
    // form: {
    //   handler: function (newVal, oldVal) {
    //     this.validate();
    //   },
    //   deep: true,
    // },
  },

  methods: {
    async register() {
      this.process.reg = true;
      // Валидация
      if (this.validate()) {
        try {
          let response = await this.$axios.$post(
            `/renter/bookings/${this.booking.id}/register`,
            this.form
          );
          if (response.status) {
            this.$router.push(`/bookings/${this.booking.id}`);
          }
          this.process.reg = false;
          console.log(response);
        } catch (error) {
          this.process.reg = false;
          console.log(error.response);
        }
      } else {
        this.process.reg = false;
      }
    },

    validate() {
      this.errors.personal_data = this.form.personal_data ? false : true;
      this.errors.i_agree = this.form.i_agree ? false : true;

      this.errors.first_name = this.form.first_name.length >= 2 ? false : true;
      this.errors.last_name = this.form.last_name.length >= 2 ? false : true;
      this.errors.middle_name =
        this.form.middle_name.length >= 4 ? false : true;

      this.errors.email = this.form.email.length >= 4 ? false : true;
      this.errors.birth_date = this.form.birth_date.length >= 4 ? false : true;
      this.errors.passport_serial =
        this.form.passport_serial.length == 4 ? false : true;
      this.errors.passport_number =
        this.form.passport_number.length >= 6 ? false : true;

      var result = true;
      if (
        this.errors.personal_data ||
        this.errors.i_agree ||
        this.errors.first_name ||
        this.errors.last_name ||
        this.errors.middle_name ||
        this.errors.email ||
        this.errors.birth_date ||
        this.errors.passport_serials ||
        this.errors.passport_number
      )
        return false;

      return true;
    },

    async checkStatus() {
      try {
        let response = await this.$axios.$get(
          `/renter/bookings/by-code/${this.$route.params.code}`
        );
        this.booking = response.data;

        if (this.booking.status < 3) {
          this.$router.push(`/voucher/${this.booking.code}`);
        }

        if (this.booking.status >= 4) {
          this.$router.push(`/bookings/${this.booking.id}`);
        }

        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    },

    // async payDeposit() {
    //   try {
    //     let response = await this.$axios.$post(
    //       `/renter/bookings/${this.booking.id}/pay-deposit`,
    //       {}
    //     );
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error.response);
    //   }
    // },
  },
};
</script>