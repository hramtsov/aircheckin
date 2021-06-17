<template>
  <!-- <div>Ваучер - {{ $route.params.code }}</div> -->

  <div class="page-inner">
    <!-- <div @click="process.payment_deposit = !process.payment_deposit">123</div> -->

    <template v-if="booking && booking.apartment">
      <div class="container">
        <Notify
          v-model="payment_success"
          type="success"
          title="Спасибо!"
          text="После поступления оплаты на наш счёт станет доступна регистрация на этой странице"
          time="10"
        >
        </Notify>

        <Notify v-model="payment_failed" type="error" title="Оплата не прошла">
          <template slot="text"
            >Платёжная система не смогла произвести оплату, попробуйте ещё раз
            или обратитесь к администратору</template
          >
        </Notify>

        <!-- Если депозит не внесен -->
        <template v-if="booking.status == 2 && booking.deposit > 0">
          <div class="title-welcome">УРА!</div>
          <div class="text-welcome">
            <p>
              Мы забронировали для вас апартамент, для подтверждения пожалуйста
              оплатите депозит до {{ booking.confirm_timeout | date_t }} Мск
            </p>
            <p>
              Ключи можно будет получить на основании паспорта в день заезда по
              адресу
              <span class="address-booking">{{
                booking.apartment.address
              }}</span>
            </p>
          </div>

          <div>
            <a
              :disabled="process.payment_deposit"
              @click="payDeposit()"
              class="form-button-go"
              v-if="this.$auth.user && this.$auth.user.binded_card"
            >
              <template v-if="process.payment_deposit"
                ><div class="donut"></div></template
              ><template v-else>Оплатить депозит</template></a
            >

            <a
              :disabled="process.payment_deposit"
              :href="deposit_link"
              class="form-button-go"
              v-if="!this.$auth.user || !this.$auth.user.binded_card"
              ><template v-if="process.payment_deposit"
                ><div class="donut"></div></template
              ><template v-else>Оплатить депозит</template></a
            >

            <div v-if="booking.status < 3" class="waiting-deposit">
              Ожидаем поступление оплаты депозита
            </div>
          </div>

          <div class="guarantee-deposit">
            Для гарантированного бронирования необходимо оплатить депозит до
            21:00 по Мск
          </div>
        </template>

        <!-- Бронь подтверждена -->
        <template
          v-if="
            booking.status == 3 || (booking.status == 2 && booking.deposit == 0)
          "
        >
          <div class="title-welcome">УРА!</div>
          <div class="text-welcome">
            <p>
              Мы готовы принять вас, до заселения необходимо пройти регистрацию
              и оплатить стоимость проживания
            </p>
          </div>

          <div>
            <nuxt-link
              :to="`/voucher/${$route.params.code}/register`"
              class="form-button-go"
              >Пройти регистрацию</nuxt-link
            >
          </div>
        </template>
      </div>

      <div class="apartment-swiper">
        <CoolLightBox
          :items="booking.apartment.images"
          :index="index"
          srcName="url"
          :effect="'fade'"
          @close="index = null"
        >
        </CoolLightBox>

        <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
          <template v-for="(image, imageIndex) in booking.apartment.images">
            <swiper-slide
              class="swiper-slide"
              :style="`background-image: url('${image.thumb}');`"
            >
              <div @click="index = imageIndex" class="slider-icon-fullimage">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <rect
                      x="0.862305"
                      y="0.862305"
                      width="24.1379"
                      height="24.1379"
                      fill="white"
                      fill-opacity="0.42"
                    />
                    <path
                      d="M21.8054 0H3.19458C1.43306 0 0 1.43311 0 3.19463V21.8054C0 23.5669 1.43306 25 3.19458 25H21.8054C23.5669 25 25 23.5669 25 21.8054V3.19463C25 1.43311 23.5669 0 21.8054 0ZM23.5274 21.8054C23.5274 22.755 22.7549 23.5274 21.8054 23.5274H3.19458C2.24502 23.5274 1.47251 22.7549 1.47251 21.8054V19.1195L6.31895 14.9959C6.4958 14.8455 6.75381 14.844 6.93232 14.9923L9.96816 17.5132C10.2609 17.7562 10.6906 17.7363 10.9596 17.467L18.1729 10.2427C18.3033 10.1121 18.4553 10.0994 18.5346 10.1034C18.6137 10.1075 18.7639 10.1357 18.8802 10.279L23.5275 16.0012V21.8054H23.5274ZM23.5274 13.6653L20.0232 9.35054C19.6757 8.92261 19.1606 8.66099 18.6101 8.63272C18.0599 8.60488 17.5204 8.81201 17.1309 9.20215L10.3922 15.9512L7.87314 13.8595C7.14272 13.2529 6.08784 13.2592 5.3647 13.8745L1.47251 17.1861V3.19463C1.47251 2.24507 2.24502 1.47256 3.19458 1.47256H21.8054C22.755 1.47256 23.5274 2.24507 23.5274 3.19463V13.6653Z"
                      fill="white"
                    />
                    <path
                      d="M7.86978 3.07617C5.91201 3.07617 4.31934 4.66895 4.31934 6.62661C4.31934 8.58433 5.91206 10.1771 7.86978 10.1771C9.82749 10.1771 11.4202 8.58433 11.4202 6.62661C11.4202 4.6689 9.82754 3.07617 7.86978 3.07617ZM7.86978 8.70454C6.72397 8.70454 5.79185 7.77236 5.79185 6.62661C5.79185 5.48081 6.72397 4.54868 7.86978 4.54868C9.01558 4.54868 9.94771 5.48086 9.94771 6.62661C9.94771 7.77236 9.01558 8.70454 7.86978 8.70454Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="25" height="25" rx="2" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </swiper-slide>
          </template>

          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

      <div class="type-apartment">{{ booking.apartment.name }}</div>

      <div class="container">
        <div class="about-booking">
          <div class="booking-header">
            <div class="booking-header-title">Расчётный час</div>
            <div class="booking-header-value">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6351 9.41282L8.44862 7.73972V4.33159C8.44862 3.98891 8.17713 3.71191 7.84125 3.71191C7.50538 3.71191 7.23389 3.98891 7.23389 4.33159V8.04959C7.23389 8.24477 7.32378 8.42883 7.47683 8.54533L9.90623 10.4043C10.0155 10.488 10.1431 10.5283 10.27 10.5283C10.4553 10.5283 10.6375 10.4434 10.7565 10.2798C10.9582 10.0065 10.9036 9.61794 10.6351 9.41282Z"
                  fill="#343434"
                />
                <path
                  d="M7.84091 0C3.51717 0 0 3.58853 0 8C0 12.4115 3.51717 16 7.84091 16C12.1647 16 15.6818 12.4115 15.6818 8C15.6818 3.58853 12.1647 0 7.84091 0ZM7.84091 14.7607C4.18769 14.7607 1.2147 11.7273 1.2147 8C1.2147 4.27266 4.18769 1.23934 7.84091 1.23934C11.4947 1.23934 14.4671 4.27266 14.4671 8C14.4671 11.7273 11.4941 14.7607 7.84091 14.7607Z"
                  fill="#343434"
                />
              </svg>
              <span>12:00</span>
            </div>
          </div>

          <div class="booking-row">
            <div class="booking-row-title">Заезд</div>
            <div class="booking-row-value">
              {{ booking.date_from | date_d }} с
              {{ booking.date_from | date_t }} по Москве
            </div>
          </div>

          <div class="booking-row">
            <div class="booking-row-title">Выезд</div>
            <div class="booking-row-value">
              {{ booking.date_to | date_d }} до
              {{ booking.date_to | date_t }}
              <span class="count-nights"
                >({{
                  booking.date_to
                    | count_nights(booking.date_from)
                    | declOfNum(["ночь", "ночи", "ночей"], true)
                }})</span
              >
            </div>
          </div>

          <div class="booking-row">
            <div class="booking-row-title">Адрес</div>
            <div class="booking-row-value">
              {{ booking.apartment.address }}
            </div>
          </div>

          <div class="booking-header">
            <div class="booking-header-title">Данные депозита</div>
          </div>

          <div
            v-if="booking.status <= 3 && booking.deposit > 0"
            class="booking-row"
          >
            <div class="booking-row-title">Ваш депозит</div>
            <div class="booking-row-value">
              {{ booking.deposit | number }}<span class="suf-rub">₽</span>
            </div>
          </div>

          <div class="booking-row">
            <div class="booking-row-title">Привязанная карта</div>
            <div class="booking-row-value">
              {{ $auth.user.binded_card }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="error">{{ error }}</template>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  // middleware: ["auth"],
  data() {
    return {
      interval_check_time: 5000,
      booking: {},
      payment_success: false,
      payment_failed: false,

      process: {
        payment_deposit: false,
      },

      error: "",
      deposit_link: "",
      index: null,
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  components: {
    CoolLightBox,
  },

  async mounted() {
    var code = this.$route.params.code;
    var payment = this.$route.query.payment;

    if (payment == "failed") {
      this.payment_success = false;
      this.payment_failed = true;
    }
    if (payment == "success") {
      this.payment_failed = false;
      this.payment_success = true;
    }

    if (this.$auth.loggedIn === false) {
      if (typeof code !== "undefined" && code != null) {
        // console.log(code);
        this.$store.commit("set_voucher_code", code); // set_voucher_code
        this.$router.push("/auth");
      }
    } else {
      this.updateBooking();
    }
  },

  created() {
    console.log(this.booking.id);
  },

  methods: {
    async updateBooking() {
      try {
        let response = await this.$axios.$get(
          `/renter/bookings/by-code/${this.$route.params.code}`
        );
        this.booking = response.data;

        // Загружаем ссылку для оплаты депозита
        if (this.booking.status < 3) {
          try {
            if (!this.$auth.user || !this.$auth.user.binded_card) {
              let response = await this.$axios.$get(
                `/renter/bookings/${this.booking.id}/deposit-payment-url`
              );

              if (response) {
                console.log(response.url);
                this.deposit_link = response.url;
              }
            }
          } catch (error) {
            this.error = error.response.data.message;
          }
        }
        //
      } catch (error) {
        console.log(error.response);
      }
    },
    async payDeposit() {
      this.process.payment_deposit = true;
      this.payment_failed = false;
      try {
        let response = await this.$axios.$post(
          `/renter/bookings/${this.booking.id}/pay-deposit`
        );
        console.log(response);
        if (response.status) {
          this.process.payment_deposit = false;
          this.updateBooking();
        } else {
          setTimeout(this.checkPayDeposit(), this.interval_check_time);
        }
      } catch (error) {
        console.log(error.response);
        this.process.payment_deposit = false;
        this.payment_failed = true;
      }
    },

    async checkPayDeposit() {
      console.log("test");
      try {
        let response = await this.$axios.$get(
          `/renter/bookings/by-code/${this.$route.params.code}`
        );
        this.booking = response.data;
        console.log(response.data);
        if (!response.data.deposit_paid) {
          setTimeout(this.checkPayDeposit(), this.interval_check_time);
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>

<style scoped>
.swiper {
  border-radius: 7px;
}
.swiper-slide {
  height: 248px;
  background-position: center;
  background-size: cover;
}
.address-booking {
  /* font-family: "FuturaLightC"; */
  font-weight: 500;
}
</style>