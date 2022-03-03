<template>
  <div class="tw-text-primary-medium tw-font-lg tw-mb-3">
    (*) Chi tiết thuế thu nhập cá nhân (VNĐ)
  </div>
  <div
    class="tw-grid tw-grid-cols-4 tw-bg-white tw-rounded-sm tw-p-3 tw-my-4"
  >
    <div class="tw-col-start-1 tw-col-end-3">
      <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300">
        Mức chịu thuế
      </div>
      <div
        class="tw-py-2 tw-border-b tw-border-grey-300"
        v-for="(item, index) in taxArr"
        :key="`${index}_muc`"
      >
        {{ item.text }}
      </div>
    </div>
    <div>
      <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300">
        Thuế suất
      </div>
      <div
        class="tw-py-2 tw-border-b tw-border-grey-300"
        v-for="(item, index) in taxArr"
        :key="`${index}_muc`"
      >
        {{ item.taxPercent * 100 }}%
      </div>
    </div>
    <div>
      <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300">
        Tiền nộp
      </div>
      <div
        class="tw-py-2 tw-border-b tw-border-grey-300"
        v-for="(item, index) in taxArr"
        :key="`${index}_muc`"
      >
        {{ item.tax ? $currency(item.tax) : 0 }}
      </div>
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