<template>
  <div
    class="
      tw-grid tw-grid-cols-1
      md:tw-grid-cols-4
      tw-bg-white tw-rounded-sm tw-p-3 tw-my-4
    "
  >
    <div class="tw-grid tw-grid-cols-2 md:tw-block">
      <div
        class="
          tw-font-bold tw-mb-2 tw-pb-2
          md:tw-border-b md:tw-border-grey-300
          tw-text-sm
          md:tw-text-base
        "
      >
        Lương {{ salaryType === "gross-to-net" ? "Gross" : "Net" }}
      </div>
      <div>
        {{
          salaryType === "gross-to-net"
            ? $currency(grossSalary)
            : $currency(netSalary)
        }}
      </div>
    </div>
    <div class="tw-grid tw-grid-cols-2 md:tw-block">
      <div
        class="
          tw-font-bold tw-mb-2 tw-pb-2
          md:tw-border-b md:tw-border-grey-300
          tw-text-sm
          md:tw-text-base
        "
      >
        Bảo hiểm
      </div>
      <div>{{ $currency(totalInsuranceFee) }}</div>
    </div>
    <div class="tw-grid tw-grid-cols-2 md:tw-block">
      <div
        class="
          tw-font-bold tw-mb-2 tw-pb-2
          md:tw-border-b md:tw-border-grey-300
          tw-text-sm
          md:tw-text-base
        "
      >
        Thuế TNCN
      </div>
      <div>{{ $currency(totalTax) }}</div>
    </div>
    <div class="tw-grid tw-grid-cols-2 md:tw-block">
      <div
        class="
          tw-font-bold tw-pb-2
          md:tw-border-b md:tw-border-grey-300
          tw-text-sm
          md:tw-text-base
        "
      >
        Lương {{ salaryType === "gross-to-net" ? "Net" : "Gross" }}
      </div>
      <div class="tw-text-primary-medium tw-font-bold">
        {{
          salaryType === "gross-to-net"
            ? $currency(netSalary)
            : $currency(grossSalary)
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GrossToNet",
};
</script>

<script setup>
import { storeToRefs } from "pinia";
import { useSalaryStore } from "~/store/salary";

const salaryStore = useSalaryStore();

const $currency = useCurrency();

const { totalInsuranceFee, totalTax, grossSalary, netSalary, salaryType } =
  storeToRefs(salaryStore);
</script>

<style>
</style>