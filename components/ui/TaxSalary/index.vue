<template>
  <div class="tw-text-primary-medium tw-font-lg tw-mb-3">
    (*) Chi tiết thuế thu nhập cá nhân (VNĐ)
  </div>
  <div class="tw-grid tw-grid-cols-4 tw-bg-white tw-rounded-t-sm tw-p-2">
    <div
      class="
        tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-text-sm
        md:tw-text-base
        tw-col-start-1 tw-col-end-3
      "
    >
      Mức chịu thuế
    </div>
    <div
      class="
        tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-text-sm
        md:tw-text-base
      "
    >
      Thuế suất
    </div>
    <div
      class="
        tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-text-sm
        md:tw-text-base
      "
    >
      Tiền nộp
    </div>
  </div>
  <div
    class="tw-grid tw-grid-cols-4 tw-bg-white tw-p-2"
    v-for="(item, index) in taxArr"
    :key="index"
  >
    <div
      class="
        tw-pb-2 tw-border-b tw-border-grey-300 tw-text-sm
        md:tw-text-base
        tw-col-start-1 tw-col-end-3
      "
    >
      {{ item.text }}
    </div>
    <div
      class="tw-pb-2 tw-border-b tw-border-grey-300 tw-text-sm md:tw-text-base tw-text-center md:tw-text-left"
    >
      {{ item.taxPercent * 100 }}%
    </div>
    <div
      class="tw-pb-2 tw-border-b tw-border-grey-300 tw-text-sm md:tw-text-base"
    >
      {{ item.tax ? $currency(item.tax) : "-" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TaxSalary",
};
</script>

<script setup>
import { storeToRefs } from "pinia";
import { useSalaryStore } from "~/store/salary";

const salaryStore = useSalaryStore();

const $currency = useCurrency();

const { taxArr } = storeToRefs(salaryStore);
</script>

<style>
</style>