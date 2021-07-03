<template>
  <div class="relative">
    <header>
      <!-- v-if="$route.name != 'index'" -->
      <nuxt-link to="/" class="logo">aeroapart.ru</nuxt-link>
      <!-- <div v-if="$route.name == 'index'" class="logo">aeroapart.ru</div> -->

      <div v-if="opened == false" @click="opened = true" class="burger">
        <svg
          width="37"
          height="12"
          viewBox="0 0 37 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="9" width="28" height="2" rx="1" fill="#404040" />
          <rect y="5" width="37" height="2" rx="1" fill="#404040" />
          <rect x="16" y="10" width="21" height="2" rx="1" fill="#404040" />
        </svg>
      </div>

      <div v-if="opened == true" @click="opened = false" class="burger">
        <svg
          width="28"
          height="12"
          viewBox="0 0 28 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="28" height="2" rx="1" fill="#404040" />
          <rect x="6" y="5" width="22" height="2" rx="1" fill="#404040" />
          <rect x="17" y="10" width="11" height="2" rx="1" fill="#404040" />
        </svg>
      </div>
    </header>

    <!-- <transition> -->
    <div v-if="opened" class="container-menu">
      <div class="menu">
        <template v-if="$auth.loggedIn">
          <div @click="link('/profile')" class="menu-link">профиль</div>
          <div class="divider"></div>
          <div @click="link('/profile/cards')" class="menu-link">карты</div>
          <div class="divider"></div>
          <div @click="link('/bookings')" class="menu-link">бронирования</div>
          <div class="divider"></div>
          <div @click="logout" class="menu-link">выйти</div>
        </template>
        <template v-else>
          <div @click="link('/auth')" class="menu-link">войти</div>
        </template>
      </div>

      <div class="big-circle">
        <svg
          width="320"
          height="681"
          viewBox="0 0 320 681"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M533.227 308.879C532.102 303.565 530.859 298.462 529.511 293.024C497.016 174.301 379.718 62.0017 250.342 83.6715C150.795 100.389 68.1639 179.46 50.5728 276.164C22.3145 429.836 169.422 601.718 326.824 622.917C355.788 626.863 386.332 625.342 411.931 612.801C427.518 605.181 440.82 593.811 452.787 581.699C522.279 511.607 554.11 407.087 533.227 308.879Z"
            fill="#F9F2E2"
            fill-opacity="0.2"
          />
        </svg>
      </div>
      <div class="small-circle">
        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M67.1209 92.0961C67.9823 91.8087 68.8052 91.5065 69.6813 91.1806C88.7285 83.5695 104.427 62.355 97.326 41.8369C91.855 26.0504 76.3765 14.2368 59.6817 13.3029C33.1441 11.7694 8.2485 38.9896 8.90792 64.8938C9.02167 69.6615 10.0949 74.5767 12.8846 78.4732C14.5804 80.846 16.8443 82.7746 19.1968 84.4723C32.817 94.3364 51.2044 97.4212 67.1209 92.0961Z"
            fill="#F9F2E2"
            fill-opacity="0.5"
          />
        </svg>
      </div>
      <div class="very-small-circle">
        <svg
          width="24"
          height="42"
          viewBox="0 0 24 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-4.62959 40.901C-5.08499 40.8087 -5.52176 40.7066 -5.98706 40.5957C-16.1352 37.9179 -25.4308 28.1226 -23.104 17.2592C-21.3099 8.90051 -14.1855 1.93549 -5.76487 0.420085C7.61724 -2.01358 21.9585 10.2584 23.2389 23.4555C23.4785 25.884 23.2399 28.4473 22.0661 30.6001C21.3528 31.911 20.3233 33.0316 19.2344 34.0406C12.9321 39.8996 3.78602 42.6129 -4.62959 40.901Z"
            fill="#F9F2E2"
            fill-opacity="0.5"
          />
        </svg>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  // props: {
  // car: {
  //   required: true,
  // },
  // },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    link(url) {
      this.$router.push(url);
      this.opened = false;
    },
    logout() {
      this.$auth.logout();
      this.opened = false;
    },
  },
};
</script>


<style scoped>
.burger {
  cursor: pointer;
}

header {
  padding: 30px 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 10001;
}

.logo {
  font-family: "FuturaDemiC";
  font-weight: normal;
  font-style: normal;
  font-size: 18px;
  letter-spacing: 1px;
  color: #404040;
  text-decoration: none;
}
.container-menu {
  background: #f5bf53;
  min-height: 100vh;
  position: absolute;
  z-index: 10000;
  width: 100%;
  top: 0;
  /* transition: 0.3s all ease-in-out; */
}

.big-circle {
  top: 0px;
  right: 0;
  left: auto;
}

.small-circle {
  top: 540px;
  left: 40px;
  right: auto;
}

.very-small-circle {
  position: absolute;
  z-index: 0;
  top: 80px;
  left: 0;
  right: auto;
}

.menu {
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  z-index: 1000;
}

.menu > div.menu-link,
.menu a.menu-link {
  font-family: "FuturaDemiC";
  font-size: 18px;
  letter-spacing: 0.3px;
  color: #000;
  line-height: 28px;
  padding: 15px 0;
  text-align: right;
  text-decoration: none;
  cursor: pointer;
  display: block;
}

.menu > div.divider {
  width: 100;
  height: 2px;
  background: #f9f2e2;
  display: block;
}

.menu > div:last-child {
  border: none;
}
</style>