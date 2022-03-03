<template>
  <div class="tw-flex tw-flex-wrap tw-items-center tw-gap-3" v-if="showSuggest">
    <div
      class="
        tw-py-1.5
        tw-px-3
        tw-rounded-sm
        tw-text-white
        tw-bg-coral
        tw-cursor-pointer
      "
      v-for="value in defaultArrMoney"
      :key="value"
      @click="onClickItem(value)"
    >
      {{ $currency(value) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SuggestMoney",
};
</script>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  money: String,
});

const $emit = defineEmits(["on:sendValue"]);

const $currency = useCurrency();

const { money } = toRefs(props, "money");

const defaultArrMoney = ref([
  "3070000",
  "3920000",
  "3430000",
  "4500000",
  "4420000",
  "4800000",
  "5500000",
  "6200000",
]);

const showSuggest = ref(true);

watch(money, (money) => {
  const moneyFormat = money?.replaceAll(",", "");

  defaultArrMoney.value = suggestArr(moneyFormat);
});

const suggestArr = (money) => {
  let arr = [];

  for (let index = 0; index <= 6; index++) {
    const pow = Math.pow(10, index + 1);
    const suggestMoney = money * pow;
    arr.push(suggestMoney);
  }

  return arr.filter((money) => money >= 50000 && money <= 1000000000);
};

const onClickItem = (value) => {
  showSuggest.value = false;
  $emit("on:sendValue", value);
};
</script>

<style>
</style>