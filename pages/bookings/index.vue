<template>
  <div class="container">
    <!-- <div class="top-bar">
      <nuxt-link class="link-back" :to="`/voucher/${$route.params.code}`">
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
    </div> -->

    <div class="page-title">Бронирования</div>

    <div class="bookings">
      <template v-for="(booking, key) in bookings">
        <nuxt-link :to="`/bookings/${booking.id}`" class="booking-item">
          <div class="booking-header">
            <div class="booking-photo-mini">
              <template v-if="booking.apartment && booking.apartment.images && booking.apartment.images.length > 0">
                <div
                  :style="`background-image: url(${booking.apartment.images[0].thumb})`"
                  class="booking-photo-mini-bg"
                ></div>
              </template>
            </div>
            <div class="booking-main-info">
              <div class="booking-status">
                <nuxt-link
                  v-if="booking.status == 2"
                  class="link-pay-deposit"
                  :to="`/voucher/${booking.code}`"
                  >Оплатить депозит<svg
                    width="7"
                    height="8"
                    viewBox="0 0 7 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.31113 4.31113C6.48296 4.1393 6.48296 3.8607 6.31113 3.68887L3.51098 0.88873C3.33915 0.716899 3.06056 0.716899 2.88873 0.88873C2.7169 1.06056 2.7169 1.33915 2.88873 1.51098L5.37775 4L2.88873 6.48902C2.7169 6.66085 2.7169 6.93944 2.88873 7.11127C3.06056 7.2831 3.33915 7.2831 3.51098 7.11127L6.31113 4.31113ZM0 4.44L6 4.44V3.56L0 3.56L0 4.44Z"
                      fill="#343434"
                    />
                  </svg>
                </nuxt-link>
                <nuxt-link
                  v-if="booking.status == 3"
                  class="link-pay-deposit"
                  :to="`/voucher/${booking.code}`"
                  >Пройти регистрацию<svg
                    width="7"
                    height="8"
                    viewBox="0 0 7 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.31113 4.31113C6.48296 4.1393 6.48296 3.8607 6.31113 3.68887L3.51098 0.88873C3.33915 0.716899 3.06056 0.716899 2.88873 0.88873C2.7169 1.06056 2.7169 1.33915 2.88873 1.51098L5.37775 4L2.88873 6.48902C2.7169 6.66085 2.7169 6.93944 2.88873 7.11127C3.06056 7.2831 3.33915 7.2831 3.51098 7.11127L6.31113 4.31113ZM0 4.44L6 4.44V3.56L0 3.56L0 4.44Z"
                      fill="#343434"
                    />
                  </svg>
                </nuxt-link>
                <span v-if="booking.status == 4">Оплатить проживание</span>
                <span v-if="booking.status == 5">Заезд</span>
                <span v-if="booking.status == 8"
                  >Завершено<svg
                    width="7"
                    height="6"
                    viewBox="0 0 7 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.68043 5.1148C2.61361 5.18201 2.52244 5.21951 2.42774 5.21951C2.33305 5.21951 2.24188 5.18201 2.17506 5.1148L0.157068 3.09648C-0.0523559 2.88705 -0.0523559 2.54746 0.157068 2.33843L0.269231 2.23054C0.538462 1.96131 0.867499 2.2904 1.07692 2.49982L2.42774 3.84598L5.92308 0.345928C6.13257 0.136505 6.52167 -0.132671 6.73077 0.0767523L6.84292 0.193932C7.05234 0.403355 7.05234 0.742884 6.84292 0.95198L2.68043 5.1148Z"
                      fill="#343434"
                    />
                  </svg>
                </span>
              </div>
              <div v-if="booking.apartment && booking.apartment.name" class="booking-apartment-name">
                {{ booking.apartment.name }}
              </div>
              <div class="booking-dates">
                {{ booking.date_from | date_dm }} -
                {{ booking.date_to | date_dm }}
                {{ booking.date_to | date_year }} года
                <!-- | declOfNum(["год", "года", "фы"], true, false) -->
              </div>
            </div>
          </div>

          <div v-if="booking.apartment && booking.apartment.address" class="booking-apartment-address">
            {{ booking.apartment.address }}
          </div>

          <div class="booking-footer">
            <div class="booking-count-nights">
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="9" height="9" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use xlink:href="#image0" transform="scale(0.00195312)" />
                  </pattern>
                  <image
                    id="image0"
                    width="512"
                    height="512"
                    xlink:href="data:image/png;base64,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"
                  />
                </defs>
              </svg>

              {{
                booking.date_to
                  | count_nights(booking.date_from)
                  | declOfNum(["ночь", "ночи", "ночей"], true)
              }}

              <!-- {{ booking.apartment.address | count_nights }} -->
            </div>

            <div class="booking-price">
              {{ booking.period_price | number }}<span class="suf-rub">Ꝑ</span>
            </div>
          </div>
        </nuxt-link>
      </template>
    </div>

    <!-- {{ bookings }} -->
  </div>
</template>




<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      bookings: {},
    };
  },

  //   async validate({ params, $axios }) {
  // try {
  //   let response = await $axios.get(
  //     "http://127.0.0.1:8000/api/v1/person/" + params.slug
  //   );
  //   return true;
  // } catch (error) {
  //   return false;
  // }
  //   },

  async asyncData({ $axios, error, params }) {
    let response = await $axios.$get(`/renter/bookings`);
    // console.log(response.data)
    return { bookings: response.data };
  },

  //   async mounted() {
  //     try {
  //       let response_booking = await this.$axios.$get(
  //         `/renter/bookings/by-code/${code}`
  //       );
  //       // console.log(response_booking.data);
  //       this.booking = response_booking.data;

  //       var id = response_booking.data.id;
  //       var status = response_booking.data.status;

  //       if (this.$auth.user && this.$auth.user.binded_card) {
  //         // console.log(this.$auth.user.binded_card);
  //         // renter/bookings/12988/pay-deposit
  //       } else {
  //         let response_link = await this.$axios.$get(
  //           `/renter/bookings/${id}/deposit-payment-url`
  //         );
  //         if (response_link) {
  //           this.deposit_link = response_link.url;
  //         }
  //       }
  //     } catch (error) {
  //       this.error = error.response.data.message;
  //     }
  //   },
};
</script>