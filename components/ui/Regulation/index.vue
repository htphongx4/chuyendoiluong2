<template>
  <div class="apply-regulation tw-bg-white tw-rounded-sm tw-p-3 tw-my-4">
    <h4 class="tw-font-bold">Chọn quy định:</h4>
    <div class="tw-flex tw-gap-4 tw-my-4">
      <Checkbox :active="type === 'latest'" @click="onCheck('latest')">
        Mới nhất
      </Checkbox>
      <Checkbox :active="type === 'old'" @click="onCheck('old')">
        Từ 1/1/2020 - 30/6/2020
      </Checkbox>
    </div>
    <div class="tw-grid tw-grid-cols-3 md:tw-grid-cols-7">
      <div class="tw-col-start-1 tw-col-end-3">Lương cơ sở:</div>
      <div class="tw-text-primary-dark">
        {{ $currency(salaryByRegulation.baseSalary) }}
      </div>
    </div>
    <div class="tw-grid tw-grid-cols-3 md:tw-grid-cols-7">
      <div class="tw-col-start-1 tw-col-end-3">Giảm trừ gia cảnh bản thân:</div>
      <div class="tw-text-primary-dark">
        {{ $currency(salaryByRegulation.dependents) }}
      </div>
    </div>
    <div class="tw-grid tw-grid-cols-3 md:tw-grid-cols-7">
      <div class="tw-col-start-1 tw-col-end-3">Người phụ thuộc:</div>
      <div class="tw-text-primary-dark">
        {{ $currency(salaryByRegulation.minusMyself) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Regulation",
};
</script>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSalaryStore } from "~/store/salary";

const type = ref("latest");
const salaryStore = useSalaryStore();

const { salaryByRegulation } = storeToRefs(salaryStore);
const { selectRegulation } = salaryStore;
const $currency = useCurrency();

const onCheck = (val) => {
  type.value = val;
  selectRegulation(val);
};
</script>

<style>
</style>