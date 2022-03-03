<template>
  <div class="tw-text-primary-medium tw-font-lg tw-mb-4">
    Diễn giải chi tiết bảng lương
  </div>
  <div class="tw-bg-white tw-rounded-sm tw-mb-4">
    <div>
      <div class="tw-grid tw-grid-cols-2 tw-text-primary-medium">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Lương Gross
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(grossSalary) }}
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-2">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Bảo hiểm xã hội (8%)
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(totalSocialInsuranceFee) }}
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-2">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Bảo hiểm y tế (1.5%)
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(totalHealthInsuranceFee) }}
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-2">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Bảo hiểm thất nghiệp (1%)
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(totalUnemploymentInsuranceFee) }}
        </div>
      </div>
    </div>
    <div>
      <div class="tw-grid tw-grid-cols-2 tw-text-primary-medium">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Thu nhập trước thuế
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(salaryBeforeTax) }}
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-2">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Giảm trừ gia cảnh bản thân
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(salaryByRegulation.minusMyself) }}
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-2">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Giảm trừ gia cảnh người phụ thuộc
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(salaryByRegulation.dependents * numberDependentPerson) }}
        </div>
      </div>
    </div>
    <div>
      <div class="tw-grid tw-grid-cols-2 tw-text-primary-medium">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Thu nhập chịu thuế
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(thuNhapChiuThue) }}
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-2">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Thuế thu nhập cá nhân(*)
        </div>
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          {{ $currency(totalTax) }}
        </div>
      </div>
      <div class="tw-grid tw-grid-cols-2 tw-text-primary-medium">
        <div class="tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2">
          Lương NET
          <p class="tw-font-normal tw-italic">
            (Thu nhập trước thuế - Thuế thu nhập cá nhân.)
          </p>
        </div>
        <div
          class="
            tw-font-bold
            tw-pb-2
            tw-border-b
            tw-border-grey-300
            tw-p-2
            tw-flex
            tw-items-center
          "
        >
          {{ $currency(netSalary) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalaryDetail",
};
</script>

<script setup>
import { storeToRefs } from "pinia";
import { useSalaryStore } from "~/store/salary";

const salaryStore = useSalaryStore();

const $currency = useCurrency();

const {
  totalInsuranceFee,
  totalTax,
  grossSalary,
  netSalary,
  totalSocialInsuranceFee,
  totalHealthInsuranceFee,
  totalUnemploymentInsuranceFee,
  salaryBeforeTax,
  salaryByRegulation,
  numberDependentPerson,
  thuNhapChiuThue,
} = storeToRefs(salaryStore);
</script>

<style>
</style>