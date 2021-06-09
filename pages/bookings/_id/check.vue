<template>
  <div class="container">
    <div class="top-bar">
      <!-- Кнопка назад -->
      <nuxt-link class="link-back" :to="`/bookings/${$route.params.id}`">
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

      <!-- <a :href="booking.receipt.url" class="check-source" target="_blank">
        <span>Оригинал чека</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </a> -->
    </div>

    <div class="check-title">Кассовый чек</div>

    <div class="check-info-row">
      <div class="check-info-name">Фискальный документ</div>
      <div class="check-info-value">{{ booking.receipt.fiscal_doc }}</div>
    </div>
    <div class="check-info-row">
      <div class="check-info-name">Дата выдачи</div>
      <div class="check-info-value">{{ booking.receipt.issued_at }}</div>
    </div>
    <div class="check-info-row">
      <div class="check-info-name">Фискальный признак</div>
      <div class="check-info-value">{{ booking.receipt.fiscal_feature }}</div>
    </div>
    <div class="check-info-row">
      <div class="check-info-name">Номер смены</div>
      <div class="check-info-value">{{ booking.receipt.shift_number }}</div>
    </div>
    <div class="check-info-row">
      <div class="check-info-name">Номер чека в смене</div>
      <div class="check-info-value">
        {{ booking.receipt.shift_receipt_number }}
      </div>
    </div>

    <div class="check-info-row check-info-header">
      <div class="check-info-name">Заказ</div>
      <div class="check-info-value">Сумма</div>
    </div>

    <div class="check-info-row check-info-positions">
      <div class="check-info-name">
        Аренда апартамента {{ booking.apartment.name }} с
        {{ booking.date_from | date_d }} по {{ booking.date_to | date_d }}
      </div>
      <div class="check-info-value">
        {{ booking.period_price | number }} руб.
      </div>
    </div>

    <div class="check-link">
      <a :href="booking.receipt.url" class="check-source" target="_blank">
        <span>Посмотреть оригинал чека</span>
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg> -->
      </a>
    </div>
  </div>
</template>



<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      booking: {},
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
    let response = await $axios.$get(`/renter/bookings/${params.id}`);
    return { booking: response.data };
  },
};
</script>

<style scoped>
.check-title {
  font-family: "FuturaDemiC";
  font-size: 22px;
  margin-bottom: 20px;
  /* letter-spacing: 0.3px; */
}

.check-info-row {
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  margin: 6px 0;

  font-family: "FuturaLightC";
}

.check-info-name {
  width: 200px;
  flex-grow: 0;
  flex-shrink: 0;
  /* font-size: 12px; */
  color: rgba(0, 0, 0, 0.5);
  line-height: 18px;
}

.check-info-value {
  flex-grow: 1;
  flex-shrink: 1;
  text-align: right;
}

.check-info-header {
  margin-top: 30px;
}

.check-info-header .check-info-name,
.check-info-header .check-info-value {
  color: rgba(0, 0, 0, 0.5);
}

.check-info-positions .check-info-name,
.check-info-positions .check-info-value {
  color: #000;
  font-family: "FuturaBookC";
}

.check-source {
  width: 20px;
  height: 20px;
}

.check-link {
  margin-top: 30px;
  font-family: "FuturaLightC";
}

/* .check-source span {
  margin-left: 8px;
  font-family: "FuturaMediumC";
  font-weight: 500;
  text-decoration: none;
  font-style: normal;
  font-size: 13px;
  padding-top: 2px;
  color: #000;
  letter-spacing: 1.5px;
  transition: 0.3s all ease-in-out;
} */
</style>