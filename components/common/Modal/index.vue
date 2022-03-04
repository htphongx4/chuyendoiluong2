<template>
  <div
    class="
      tw-fixed
      tw-top-0
      tw-left-0
      tw-right-0
      tw-w-full
      tw-h-full
      tw-bg-secondary-dark
      tw-opacity-30
      tw-cursor-pointer
    "
    v-if="isShow"
    @click="hide"
  ></div>
  <Transition name="fade">
    <div v-if="isShow" class="modal tw-w-10/12 md:tw-w-auto tw-mx-auto">
      <div
        class="
          tw-w-full
          md:tw-max-w-2xl
          tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-4
        "
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: this.show,
    };
  },
  watch: {
    show(show) {
      this.isShow = show;
    },
  },
  methods: {
    hide() {
      this.$emit("hide");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fade-enter-active {
  transition: all 0.4s;
}
</style>