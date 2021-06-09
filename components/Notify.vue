<template>
  <div
    v-if="localValue"
    :class="[
      'notify',
      [type == 'error' ? 'notify-error' : ''],
      [type == 'success' ? 'notify-success' : ''],
      [type == 'warning' ? 'notify-warning' : ''],
    ]"
  >
    <div class="notify-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="notify-text">
      <slot name="text">{{ text }}</slot>
    </div>
  </div>
  <!-- <transition name="fade" appear></transition> -->
</template>


<script>
export default {
  props: {
    value: {
      required: false,
      default: true,
    },
    type: {
      required: true,
    },
    title: {
      required: false,
      default: "",
    },
    text: {
      required: false,
      default: "",
    },
    time: {
      required: false,
    },
  },
  data() {
    return {
      localValue: true,
      localTime: 0,
    };
  },
  mounted() {
    this.localValue = this.value;
    if (this.time) {
      this.localTime = this.time * 1000;
      setTimeout(this.hide, this.localTime);
    }
  },
  methods: {
    hide() {
      this.localValue = false;
    },
  },
  watch: {
    value() {
      this.localValue = this.$props.value;
    },
  },
};
</script>