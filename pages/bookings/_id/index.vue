<template>
  <!-- <div>Бронь # {{ $route.params.id }}</div> -->
  <div class="container">
    <div class="top-bar">
      <!-- Кнопка назад -->
      <nuxt-link class="link-back" to="/bookings/">
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

    <div class="booking-person-name">
      {{ $auth.user.last_name }} {{ $auth.user.first_name }}
    </div>
    <div class="booking-person-email" v-if="$auth.user.email">
      <svg
        width="15"
        height="11"
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.4666 0.739574V9.71924L9.47852 5.22941L14.4666 0.739574Z"
          fill="#F5BF53"
        />
        <path
          d="M7.23357 3.20836L5.80944 4.49023L0.821289 0.000402451H13.6459L8.6577 4.49023L7.23357 3.20836Z"
          fill="#F5BF53"
        />
        <path
          d="M13.6459 10.458H0.821289L7.23357 4.6863L13.6459 10.458Z"
          fill="#F5BF53"
        />
        <path
          d="M0 9.71924V0.739574L4.98812 5.22941L0 9.71924Z"
          fill="#F5BF53"
        />
      </svg>
      <span>{{ $auth.user.email }}</span>
    </div>
    <div class="booking-person-phone" v-if="$auth.user.phone">
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7108 8.53301C10.9568 8.53301 10.2165 8.40853 9.51489 8.1638C9.17111 8.04003 8.74849 8.15357 8.53867 8.38104L7.15389 9.48448C5.54793 8.57959 4.5587 7.53573 3.71314 5.85328L4.72775 4.42965C4.99135 4.15177 5.0859 3.74586 4.97262 3.365C4.73978 2.62055 4.62149 1.83943 4.62149 1.04318C4.62152 0.467966 4.17819 0 3.63328 0H1.37154C0.826636 0 0.383301 0.467966 0.383301 1.04315C0.383301 7.63625 5.46477 13 11.7108 13C12.2558 13 12.6991 12.532 12.6991 11.9569V9.57613C12.6991 9.00098 12.2557 8.53301 11.7108 8.53301Z"
          fill="#F5BF53"
        />
      </svg>
      <span>{{ $auth.user.phone | phone_number }}</span>
    </div>
    <div v-if="booking.apartment && booking.apartment.name" class="booking-apartment-name">{{ booking.apartment.name }}</div>

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
          {{ booking.date_from | date_d }} с {{ booking.date_from | date_t }} по
          Москве
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

      <div class="booking-row" v-if="booking.apartment && booking.apartment.address" >
        <div class="booking-row-title">Адрес</div>
        <div class="booking-row-value">
          {{ booking.apartment.address }}
        </div>
      </div>

      <div class="booking-tariff" v-if="booking.status == 4">
        <div class="booking-tariff-price">
          Тариф: {{ booking.period_price | number
          }}<span class="suf-rub">Ꝑ</span>
        </div>
        <button
          :disabled="process.payment_tariff"
          v-if="booking.status == 4"
          @click="payTariff()"
          class="form-button-go form-button-go-tariff"
        >
          <template v-if="process.payment_tariff"
            ><div class="donut"></div></template
          ><template v-else>Оплатить тариф</template>
        </button>
      </div>

      <Notify
        v-model="payment_success"
        type="success"
        title="Спасибо за оплату!"
      >
        <template slot="text"
          >Ключи можно будет получить в день заезда, не забудьте взять с собой
          паспорт</template
        >
      </Notify>

      <Notify v-model="payment_failed" type="error" title="Оплата не прошла">
        <template slot="text"
          >Платёжная система не смогла произвести оплату, попробуйте
          <nuxt-link :to="`/voucher/${$route.params.code}`">ещё раз</nuxt-link>
          или обратитесь к администратору</template
        >
      </Notify>

      <div
        :disabled="process.open_pdf"
        v-if="booking.status >= 5"
        class="booking-document-link"
        @click="openPdf"
      >
        <template v-if="process.open_pdf"><div class="donut"></div></template
        ><template v-else>
          <div class="booking-document-icon">
            <svg
              width="28"
              height="36"
              viewBox="0 0 28 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.7692 35.7778H3.23077C1.44925 35.7778 -1.90735e-06 34.3672 -1.90735e-06 32.6332V10.4818H7.53846C9.31998 10.4818 10.7692 9.0712 10.7692 7.33724V0H24.7692C26.5507 0 28 1.41057 28 3.14453V32.6332C28 34.3672 26.5507 35.7778 24.7692 35.7778ZM20.4615 14.7444H7.53846C6.94321 14.7444 6.46154 15.2132 6.46154 15.7925C6.46154 16.3719 6.94321 16.8407 7.53846 16.8407H20.4615C21.0568 16.8407 21.5385 16.3719 21.5385 15.7925C21.5385 15.2132 21.0568 14.7444 20.4615 14.7444ZM20.4615 18.9371H7.53846C6.94321 18.9371 6.46154 19.4059 6.46154 19.9852C6.46154 20.5646 6.94321 21.0334 7.53846 21.0334H20.4615C21.0568 21.0334 21.5385 20.5646 21.5385 19.9852C21.5385 19.4059 21.0568 18.9371 20.4615 18.9371ZM20.4615 23.1298H7.53846C6.94321 23.1298 6.46154 23.5986 6.46154 24.178C6.46154 24.7573 6.94321 25.2261 7.53846 25.2261H20.4615C21.0568 25.2261 21.5385 24.7573 21.5385 24.178C21.5385 23.5986 21.0568 23.1298 20.4615 23.1298ZM20.4615 27.3225H11.8462C11.2509 27.3225 10.7692 27.7913 10.7692 28.3707C10.7692 28.95 11.2509 29.4188 11.8462 29.4188H20.4615C21.0568 29.4188 21.5385 28.95 21.5385 28.3707C21.5385 27.7913 21.0568 27.3225 20.4615 27.3225Z"
                fill="#F5BF53"
              />
              <path
                d="M7.50661 8.37355H0.777886L8.55566 0.76123V7.34681C8.55566 7.91329 8.08541 8.37355 7.50661 8.37355Z"
                fill="#F5BF53"
              />
            </svg>
          </div>
          <span>Справка о проживании</span>
        </template>
      </div>

      <nuxt-link
        v-if="booking.receipt"
        class="booking-document-link"
        :to="`/bookings/${booking.id}/check`"
        ><div class="booking-document-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.4238 0H1.57548C0.79865 0 0.168945 0.629704 0.168945 1.40653C0.168945 2.18336 0.79865 2.81306 1.57548 2.81306H3.11682V31.6871C3.11682 31.7563 3.15972 31.8183 3.22442 31.8427C3.2892 31.8671 3.36226 31.8489 3.40798 31.7969L4.69826 30.3288C4.77752 30.2387 4.8906 30.1853 5.01058 30.1814C5.13056 30.1776 5.24681 30.2236 5.33176 30.3084L6.89603 31.8727C7.06566 32.0423 7.34078 32.0423 7.51041 31.8727L9.09515 30.288C9.26477 30.1183 9.53989 30.1183 9.70952 30.288L11.2943 31.8726C11.4639 32.0423 11.7389 32.0423 11.9086 31.8726L13.4934 30.288C13.663 30.1183 13.9381 30.1183 14.1077 30.288L15.6925 31.8727C15.8621 32.0423 16.1372 32.0423 16.3069 31.8727L17.8916 30.288C18.0612 30.1184 18.3363 30.1184 18.506 30.288L20.0907 31.8728C20.2604 32.0424 20.5355 32.0424 20.7051 31.8728L22.2898 30.288C22.4594 30.1184 22.7346 30.1184 22.9042 30.288L24.4889 31.8727C24.6586 32.0423 24.9336 32.0423 25.1033 31.8727L26.6637 30.3123C26.7492 30.2268 26.8666 30.1808 26.9874 30.1854C27.1083 30.1899 27.2218 30.2448 27.3005 30.3366L28.5901 31.8391C28.6354 31.8919 28.7088 31.9109 28.774 31.8868C28.8392 31.8626 28.8825 31.8004 28.8825 31.7309V2.81306H30.4239C31.2008 2.81306 31.8305 2.18336 31.8305 1.40653C31.8305 0.629704 31.2006 0 30.4238 0ZM7.30632 5.59385H19.0211C19.6037 5.59385 20.076 6.06616 20.076 6.64875C20.076 7.23133 19.6037 7.70364 19.0211 7.70364H7.30632C6.72373 7.70364 6.25142 7.23133 6.25142 6.64875C6.25142 6.06616 6.72373 5.59385 7.30632 5.59385ZM24.3535 19.9032H7.22558C6.643 19.9032 6.17069 19.4309 6.17069 18.8483C6.17069 18.2657 6.643 17.7934 7.22558 17.7934H24.3535C24.9361 17.7934 25.4084 18.2657 25.4084 18.8483C25.4084 19.4309 24.9361 19.9032 24.3535 19.9032ZM24.4342 14.0054H7.30632C6.72373 14.0054 6.25142 13.5331 6.25142 12.9505C6.25142 12.3679 6.72373 11.8956 7.30632 11.8956H24.4342C25.0168 11.8956 25.4891 12.3679 25.4891 12.9505C25.4891 13.5331 25.0168 14.0054 24.4342 14.0054Z"
              fill="#F5BF53"
            />
          </svg>
        </div>
        <span>Кассовый чек</span></nuxt-link
      >

      <div class="apartment-swiper" v-if="booking.apartment && booking.apartment.images">
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
    </div>
  </div>
</template>


<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  middleware: ["auth"],
  data() {
    return {
      process: {
        payment_tariff: false,
        open_pdf: false,
      },
      index: null,
      booking: {},
      link: "",
      payment_success: false,
      payment_failed: false,
      //   error: "",
      //   deposit_link: "",
      //   index: null,
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

  // async validate({ params, $axios }) {
  //   try {
  //     let response = await $axios.get(
  //       "http://127.0.0.1:8000/api/v1/person/" + params.slug
  //     );
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // },

  created() {
    if (this.booking.status < 3) {
      this.$router.push(`/voucher/${this.booking.code}`);
    }
    if (this.booking.status == 3) {
      this.$router.push(`/voucher/${this.booking.code}/register`);
    }

    if (this.booking.status == 5) {
      this.payment_success = true;
    }
  },
  async asyncData({ $axios, error, params }) {
    let response = await $axios.$get(`/renter/bookings/${params.id}`);
    // let link = "";
    // if (response.data.status == 4) {
    //   let response_link = await $axios.$post(
    //     `/renter/bookings/${params.id}/pay-period`
    //   );
    //   if (response_link.status) {
    //   } else {
    //   }
    // link = response_link.data;
    // }

    return { booking: response.data };
  },

  methods: {
    async payTariff() {
      this.process.payment_tariff = true;
      this.payment_failed = false;
      if (this.booking.status == 4) {
        try {
          let response = await this.$axios.$post(
            `/renter/bookings/${this.booking.id}/pay-period`
          );
          if (response.status) {
            this.payment_success = true;
            this.payment_failed = false;
            this.updateBooking();
          } else {
            this.payment_success = false;
            this.payment_failed = true;
          }

          this.process.payment_tariff = false;
        } catch (error) {
          this.payment_failed = true;
          console.log(error.response);
          this.process.payment_tariff = false;
        }
      }
    },
    async openPdf() {
      this.process.open_pdf = true;
      try {
        let response = await this.$axios.$get(
          `/renter/bookings/${this.$route.params.id}/download-order`,
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "booking_order.pdf");
        document.body.appendChild(link);
        link.click();

        this.process.open_pdf = false;
      } catch (error) {
        console.log(error.response);
        this.process.open_pdf = false;
      }
    },
    async updateBooking() {
      try {
        let response = await this.$axios.$get(
          `/renter/bookings/${this.booking.id}`
        );
        this.booking = response.data;
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
.about-booking {
  margin-top: 0;
}

.booking-apartment-name {
  border-top: 2px solid rgba(203, 182, 177, 0.19);
  color: #a69275;
  text-transform: uppercase;
  font-weight: 900;
  line-height: 18px;
  padding: 20px 0;
  font-size: 15px;
  margin-top: 20px;
}

.form-button-go-tariff {
  width: 160px;
}
</style>