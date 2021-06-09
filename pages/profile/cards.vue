<template>
  <div class="container">
    <div v-if="cards" class="top-bar top-bar-right">
      <div v-if="!edit" @click="edit = true" class="top-bar-button">
        Изменить
      </div>
      <div v-if="edit" @click="edit = false" class="top-bar-button">Готово</div>
    </div>

    <Notify
      v-model="bind_success"
      type="success"
      title="Карта успешно привязана!"
      text="Как только наш сервер получит данные от платёжной системы новая карта
        появится в списке"
    />

    <Notify
      v-model="bind_error"
      type="error"
      title="Не удалось привязать карту"
      text="Убедитесь что данные карты были указаны верно, попробуйте использовать
        другую карту или обратитесь к администратору"
    />

    <Notify
      v-model="bind_warning"
      type="warning"
      title="Внимание"
      text="У вас нет активной карты, для совершения оплат необходимо привязать
        новую карту, либо выбрать существующую"
    />

    <div class="page-title">Способы оплаты</div>

    <div class="card-dilimiter"></div>

    <div v-if="cards" class="cards">
      <template v-for="card in cards">
        <div :class="['cards-item', [card.active ? 'active-card' : '']]">
          <div class="card-number">
            <svg
              width="40"
              height="24"
              viewBox="0 0 40 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.8242 17.3457L19.5225 7.79297H22.176L20.5308 17.3457H17.8242Z"
                fill="#3C58BF"
              />
              <path
                d="M17.8242 17.3457L20.0001 7.79297H22.176L20.5308 17.3457H17.8242Z"
                fill="#293688"
              />
              <path
                d="M30.1374 7.89917C29.6067 7.68689 28.7575 7.47461 27.6961 7.47461C25.0426 7.47461 23.1321 8.80137 23.1321 10.7119C23.1321 12.1448 24.4588 12.8878 25.5202 13.3654C26.5816 13.8431 26.9001 14.1615 26.9001 14.5861C26.9001 15.2229 26.0509 15.5413 25.308 15.5413C24.2465 15.5413 23.6628 15.3821 22.7606 15.0106L22.3891 14.8514L22.0176 17.0273C22.6544 17.2927 23.822 17.558 25.0426 17.558C27.8553 17.558 29.7128 16.2313 29.7128 14.2146C29.7128 13.1001 29.0229 12.251 27.4308 11.561C26.4755 11.0834 25.8917 10.8181 25.8917 10.3404C25.8917 9.91586 26.3694 9.49129 27.4308 9.49129C28.333 9.49129 28.9698 9.6505 29.4475 9.86278L29.7128 9.96893L30.1374 7.89917Z"
                fill="#3C58BF"
              />
              <path
                d="M30.1374 7.89917C29.6067 7.68689 28.7575 7.47461 27.6961 7.47461C25.0426 7.47461 23.6097 8.80137 23.6097 10.7119C23.6097 12.1448 24.4588 12.8878 25.5202 13.3654C26.5816 13.8431 26.9001 14.1615 26.9001 14.5861C26.9001 15.2229 26.0509 15.5413 25.308 15.5413C24.2465 15.5413 23.6628 15.3821 22.7606 15.0106L22.3891 14.8514L22.0176 17.0273C22.6544 17.2927 23.822 17.558 25.0426 17.558C27.8553 17.558 29.7128 16.2313 29.7128 14.2146C29.7128 13.1001 29.0229 12.251 27.4308 11.561C26.4755 11.0834 25.8917 10.8181 25.8917 10.3404C25.8917 9.91586 26.3694 9.49129 27.4308 9.49129C28.333 9.49129 28.9698 9.6505 29.4475 9.86278L29.7128 9.96893L30.1374 7.89917Z"
                fill="#293688"
              />
              <path
                d="M34.7009 7.79297C34.0641 7.79297 33.5865 7.84604 33.3211 8.48289L29.3408 17.3457H32.2066L32.7373 15.7536H36.1339L36.4523 17.3457H38.9997L36.7707 7.79297H34.7009ZM33.4803 14.1614C33.6395 13.6838 34.5417 11.3487 34.5417 11.3487C34.5417 11.3487 34.754 10.7649 34.9132 10.3934L35.0724 11.2956C35.0724 11.2956 35.6031 13.6838 35.7093 14.2145H33.4803V14.1614Z"
                fill="#3C58BF"
              />
              <path
                d="M35.3378 7.79297C34.7009 7.79297 34.2233 7.84604 33.958 8.48289L29.3408 17.3457H32.2066L32.7373 15.7536H36.1339L36.4523 17.3457H38.9997L36.7707 7.79297H35.3378ZM33.4803 14.1614C33.6926 13.6307 34.5417 11.3487 34.5417 11.3487C34.5417 11.3487 34.754 10.7649 34.9132 10.3934L35.0724 11.2956C35.0724 11.2956 35.6031 13.6838 35.7093 14.2145H33.4803V14.1614Z"
                fill="#293688"
              />
              <path
                d="M12.9422 14.48L12.6769 13.1002C12.1992 11.5081 10.6602 9.75673 8.96191 8.9076L11.3501 17.3989H14.2159L18.5146 7.84619H15.6488L12.9422 14.48Z"
                fill="#3C58BF"
              />
              <path
                d="M12.9422 14.48L12.6769 13.1002C12.1992 11.5081 10.6602 9.75673 8.96191 8.9076L11.3501 17.3989H14.2159L18.5146 7.84619H16.1795L12.9422 14.48Z"
                fill="#293688"
              />
              <path
                d="M5.56543 7.79297L6.04306 7.89911C9.43958 8.69517 11.7747 10.7119 12.6769 13.1L11.7216 8.58903C11.5624 7.95218 11.0848 7.79297 10.501 7.79297H5.56543Z"
                fill="#FFBC00"
              />
              <path
                d="M5.56543 7.79297C8.96195 8.58903 11.7747 10.6588 12.6769 13.047L11.7747 9.27895C11.6155 8.6421 11.0848 8.2706 10.501 8.2706L5.56543 7.79297Z"
                fill="#F7981D"
              />
              <path
                d="M5.56543 7.79297C8.96195 8.58903 11.7747 10.6588 12.6769 13.047L12.04 10.9772C11.8808 10.3404 11.6685 9.70351 10.9256 9.43816L5.56543 7.79297Z"
                fill="#ED7C00"
              />
              <path
                d="M15.5954 14.1611L13.791 12.3567L12.9419 14.3733L12.7296 13.0466C12.252 11.4545 10.7129 9.70313 9.01465 8.854L11.4028 17.3453H14.2686L15.5954 14.1611Z"
                fill="#051244"
              />
              <path
                d="M20.5308 17.3454L18.2488 15.0103L17.8242 17.3454H20.5308Z"
                fill="#051244"
              />
              <path
                d="M26.6337 14.0552C26.846 14.2675 26.9522 14.4267 26.8991 14.639C26.8991 15.2758 26.05 15.5942 25.307 15.5942C24.2456 15.5942 23.6618 15.435 22.7596 15.0635L22.3881 14.9043L22.0166 17.0802C22.6534 17.3456 23.821 17.6109 25.0416 17.6109C26.7399 17.6109 28.1197 17.1333 28.9158 16.2841L26.6337 14.0552Z"
                fill="#051244"
              />
              <path
                d="M29.7119 17.3453H32.2062L32.7369 15.7532H36.1335L36.4519 17.3453H38.9993L38.0971 13.4712L34.9128 10.3931L35.072 11.2422C35.072 11.2422 35.6027 13.6304 35.7089 14.1611H33.4799C33.6922 13.6304 34.5413 11.3483 34.5413 11.3483C34.5413 11.3483 34.7536 10.7646 34.9128 10.3931"
                fill="#051244"
              />
              <rect
                x="0.5"
                y="0.5"
                width="39"
                height="23"
                rx="2.5"
                fill="#F2EADF"
                stroke="black"
              />
              <line y1="8.5" x2="40" y2="8.5" stroke="black" />
              <line y1="11.5" x2="40" y2="11.5" stroke="black" />
              <rect x="4.5" y="14.5" width="9" height="5" stroke="black" />
              <line x1="17" y1="14.5" x2="23" y2="14.5" stroke="black" />
              <line x1="24" y1="14.5" x2="30" y2="14.5" stroke="black" />
              <line x1="31" y1="14.5" x2="37" y2="14.5" stroke="black" />
            </svg>
            <span v-if="card.active">{{ card.card }}</span>
            <span
              v-if="!card.active"
              @click="setActiveCard(card.id)"
              class="set-active-card"
              >{{ card.card }}</span
            >
          </div>

          <div class="card-icon" v-if="edit" @click="deleteCard(card.id)">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12.5" cy="12.5" r="12.5" fill="#E44715" />
              <rect
                x="6.71191"
                y="6.19482"
                width="16.9306"
                height="0.977546"
                rx="0.488773"
                transform="rotate(45 6.71191 6.19482)"
                fill="white"
              />
              <rect
                x="6.29492"
                y="18.4385"
                width="16.9306"
                height="1.03733"
                rx="0.518664"
                transform="rotate(-45 6.29492 18.4385)"
                fill="white"
              />
            </svg>
          </div>

          <div class="card-icon" v-if="!edit && card.active">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#F5BF53" />
              <g clip-path="url(#clip0)">
                <path
                  d="M10.9779 16.3565C10.8538 16.4813 10.6845 16.5509 10.5087 16.5509C10.3328 16.5509 10.1635 16.4813 10.0394 16.3565L6.2917 12.6082C5.90277 12.2192 5.90277 11.5886 6.2917 11.2004L6.5 11C7 10.5 7.61107 11.1112 8 11.5001L10.5087 14.0001L17 7.5C17.3891 7.11107 18.1117 6.61117 18.5 7.0001L18.7083 7.21772C19.0972 7.60665 19.0972 8.2372 18.7083 8.62552L10.9779 16.3565Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="13"
                    height="13"
                    fill="white"
                    transform="translate(6 5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div
            class="card-icon card-icon-hover"
            v-if="!edit && !card.active"
            @click="setActiveCard(card.id)"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#dbdbdb" />
              <g clip-path="url(#clip0)">
                <path
                  d="M10.9779 16.3565C10.8538 16.4813 10.6845 16.5509 10.5087 16.5509C10.3328 16.5509 10.1635 16.4813 10.0394 16.3565L6.2917 12.6082C5.90277 12.2192 5.90277 11.5886 6.2917 11.2004L6.5 11C7 10.5 7.61107 11.1112 8 11.5001L10.5087 14.0001L17 7.5C17.3891 7.11107 18.1117 6.61117 18.5 7.0001L18.7083 7.21772C19.0972 7.60665 19.0972 8.2372 18.7083 8.62552L10.9779 16.3565Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="13"
                    height="13"
                    fill="white"
                    transform="translate(6 5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div class="card-dilimiter"></div>
      </template>
    </div>

    <a :href="bind_link" v-if="bind_link" class="form-button-go"
      >Привязать карту</a
    >
  </div>
</template>



<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      edit: false,
      cards: {},
      bind_link: "",
      bind_success: false,
      bind_error: false,
      bind_warning: false,
    };
  },

  async asyncData({ $axios, error, params }) {
    let response = await $axios.$get(`/renter/cards`);
    let cards = response.data;
    let bind_warning = true;
    cards.forEach(function (item, i, arr) {
      if (item.active) bind_warning = false;
    });

    //   let response_bind_link = await $axios.$get(`/renter/cards/binding-url`);
    return { cards: cards, bind_warning: bind_warning }; //  bind_link: response_bind_link.url
  },

  async mounted() {
    let response_bind_link = await this.$axios.$get(
      `/renter/cards/binding-url`
    );
    this.bind_link = response_bind_link.url;

    var binding = this.$route.query.binding;

    if (binding == "failed") {
      this.bind_error = true;
      this.bind_success = false;
      setTimeout(this.errorFalse, 10000);
    }
    if (binding == "success") {
      this.bind_error = false;
      this.bind_success = true;
      setTimeout(this.successFalse, 10000);
    }
  },

  methods: {
    errorFalse() {
      this.bind_error = false;
    },
    successFalse() {
      this.bind_success = false;
    },
    async setActiveCard(id) {
      try {
        let response = await this.$axios.$post(
          `/renter/cards/${id}/set-active`,
          {},
          {
            progress: false,
          }
        );
        if (response.status) {
          let response_cards = await this.$axios.$get(`/renter/cards`);
          this.cards = response_cards.data;
          this.checkActive();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCard(id) {
      try {
        let response = await this.$axios.$delete(`/renter/cards/${id}`);
        if (response.status) {
          let response_cards = await this.$axios.$get(`/renter/cards`);
          this.cards = response_cards.data;
          this.checkActive();
        }
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    },
    checkActive() {
      /////
      let bind_warning = true;
      this.cards.forEach(function (item, i, arr) {
        if (item.active) bind_warning = false;
      });
      this.bind_warning = bind_warning;
      /////
    },
  },
};
</script>


<style scoped>
.cards {
  display: flex;
  flex-direction: column;
}

.cards-item {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
}

.card-icon-hover {
  opacity: 0;
  transition: 0.3s all ease-in-out;
}

.cards-item:hover .card-icon-hover {
  opacity: 1;
}

.card-number {
  display: flex;
  flex-direction: row;
  align-content: center;
}

.card-number span {
  margin-left: 20px;
  font-weight: 400;
  line-height: 20px;
}

.cards-item.active-card .card-number span {
  font-weight: 700;
}

.card-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

.card-icon:hover {
  opacity: 0.7;
}

.card-dilimiter {
  width: 100%;
  height: 2px;
  background: #fff;
  margin: 16px 0;
}

.form-button-go {
  margin-top: 0;
}

.set-active-card {
  cursor: pointer;
}
</style>