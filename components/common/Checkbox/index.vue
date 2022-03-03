<template>
  <div
    class="
      checkbox
      tw-bg-grey-300
      tw-w-auto
      tw-p-2
      tw-rounded-sm
      tw-text-white
      tw-cursor-pointer
      tw-px-4
      tw-flex
      tw-relative
    "
    :class="{ 'tw-bg-primary-medium': active }"
    @click="onClick"
  >
    <slot />
    <div v-if="active" class="tick-mark"></div>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("input", true);
    },
  },
};
</script>

<style>
.tick-mark {
  position: absolute;
  top: 2px;
  right: 2px;
  box-sizing: border-box;
  border-top-right-radius: 4px;
  border-color: white white transparent transparent;
  border-style: solid;
  border-width: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>