<template>
  <div class="bgYellow">
    <Header />

    <div class="main-text">
      <div>aeroapart.ru</div>
      <template v-if="!$auth.loggedIn">
        <div>
          <nuxt-link to="/auth" class="auth-btn">войти</nuxt-link>
        </div>
      </template>
    </div>
    

    <!-- <Nuxt /> -->

    <div class="big-circle">
      <svg
        width="320"
        height="429"
        viewBox="0 0 320 429"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M153.512 360.215C156.881 359.09 160.099 357.908 163.526 356.633C238.021 326.861 299.42 243.882 271.652 163.63C250.257 101.884 189.721 55.6788 124.427 52.028C20.6371 46.0335 -76.7344 152.505 -74.1588 253.824C-73.7145 272.473 -69.5177 291.698 -58.6075 306.938C-51.9756 316.218 -43.1217 323.761 -33.9211 330.402C19.3472 368.982 91.2609 381.045 153.512 360.215Z"
          fill="#F9F2E2"
          fill-opacity="0.72"
        />
      </svg>
    </div>

    <div class="small-circle">
      <svg
        width="118"
        height="114"
        viewBox="0 0 118 114"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5179 76.6641C10.8097 75.6344 10.158 74.6263 9.4679 73.5494C-5.06054 49.6747 -3.56003 16.8491 22.9183 5.19663C43.2993 -3.76181 71.3371 -0.199116 90.9295 14.0345C122.117 36.6169 125.53 83.0219 101.429 105.223C97.002 109.316 91.364 112.674 84.7169 113.587C80.6726 114.145 76.3907 113.801 72.2176 113.174C48.0249 109.571 24.5918 95.7038 11.5179 76.6641Z"
          fill="#F9F2E2"
          fill-opacity="0.72"
        />
      </svg>
    </div>
  </div>
</template>


<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
};
</script>

<style scoped>
.big-circle {
  top: 100px;
  left: 0;
  right: auto;
}

.small-circle {
  right: 15px;
  top: 450px;
  left: auto;
}

.main-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  z-index: 100;
  font-family: "FuturaDemiC";
  font-size: 24px;
}

.auth-btn {
  width: 100%;
  display: block;
  margin: 30px auto 20px;
  text-align: center;
  cursor: pointer;
}
</style>
