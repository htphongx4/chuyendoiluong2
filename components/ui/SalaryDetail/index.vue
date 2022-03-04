<template>
  <div class="tw-text-primary-medium tw-font-lg tw-mb-4">
    Diễn giải chi tiết bảng lương
  </div>
  <div class="tw-bg-white tw-rounded-sm tw-mb-4 tw-p-2">
    <div
      class="tw-grid tw-grid-cols-3"
      :class="{ 'tw-text-primary-medium': item.color }"
      v-for="(item, key) in items"
      :key="key"
    >
      <div
        class="
          tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2 tw-text-sm
          md:tw-text-base
          tw-col-start-1 tw-col-end-3 tw-font-bold
        "
      >
        <span>{{ item.name }}</span>
        <span
          v-if="item.desc"
          class="
            tw-text-error tw-cursor-pointer tw-ml-3 tw-text-sm
            md:tw-text-base
          "
          @click="onShowDesc(item.desc)"
        >
          (?)
        </span>
      </div>
      <div
        class="
          tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2
          tw-text-sm
          md:tw-text-base
        "
        :class="{ 'tw-font-bold': item.color }"
      >
        {{ item.color ? "" : "-" }} {{ $currency(item.value) }}
      </div>
    </div>
  </div>
  <Modal :show="show" @hide="hideModal">
    <div v-html="desc"></div>
  </Modal>
</template>

<script>
export default {
  name: "SalaryDetail",
  data() {
    return {
      show: false,
      desc: "",
    };
  },
  methods: {
    onShowDesc(desc) {
      this.desc = desc;
      this.show = true;
    },

    hideModal() {
      this.desc = "";
      this.show = false;
    },
  },
};
</script>

<script setup>
import { storeToRefs } from "pinia";
import { useSalaryStore } from "~/store/salary";
import { computed } from "vue";

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

const items = computed(() => [
  {
    name: "Lương Gross",
    value: grossSalary.value,
    color: "green",
  },
  {
    name: "Bảo hiểm xã hội (8%)",
    value: totalSocialInsuranceFee.value,
    desc: `<ul class="list-unstyled">
                <li>- Người lao động đóng: 8% (lao động quốc tịch nước ngoài: 8%).</li>
                <li>- Người sử dụng lao động đóng: 17% (lao động quốc tịch nước ngoài: 17%).</li>
                <li>- Mức lương tối đa tính bảo hiểm xã hội bằng 20 lần mức lương cơ sở (hiện là 1.490.000 VND/tháng).</li>
            </ul>`,
  },
  {
    name: "Bảo hiểm y tế (1.5%)",
    value: totalHealthInsuranceFee.value,
    desc: `<ul class="list-unstyled">
                <li>- Người lao động đóng: 1.5% (lao động quốc tịch nước ngoài: 1.5%).</li>
                <li>- Người sử dụng lao động đóng: 3% (lao động quốc tịch nước ngoài: 3%).</li>
                <li>- Mức lương tối đa tính bảo hiểm y tế bằng 20 lần mức lương cơ sở (hiện là 1.490.000 VND/tháng).</li>
            </ul>`,
  },
  {
    name: "Bảo hiểm thất nghiệp (1%)",
    value: totalUnemploymentInsuranceFee.value,
    desc: `<ul class="list-unstyled">
                <li>- Người lao động đóng: 1% (lao động quốc tịch nước ngoài: 0%).</li>
                <li>- Người sử dụng lao động đóng: 1% (lao động quốc tịch nước ngoài: 1%).</li>
                <li>- Mức lương tối đa tính bảo hiểm thất nghiệp bằng 20 lần mức lương tối thiểu vùng tại vùng mà người sử dụng lao động trực thuộc.</li>
            </ul>`,
  },
  {
    name: "Thu nhập trước thuế",
    value: salaryBeforeTax.value,
    color: "green",
  },
  {
    name: "Giảm trừ gia cảnh bản thân",
    value: salaryByRegulation.value.minusMyself,
  },
  {
    name: "Giảm trừ gia cảnh người phụ thuộc",
    value: salaryByRegulation.value.dependents * numberDependentPerson.value,
  },
  {
    name: "Thu nhập chịu thuế",
    value: thuNhapChiuThue.value,
    color: "green",
  },
  {
    name: "Thuế thu nhập cá nhân(*)",
    value: totalTax.value,
  },
  {
    name: "Lương NET",
    text: "(Thu nhập trước thuế - Thuế thu nhập cá nhân.)",
    value: netSalary.value,
    color: "green",
  },
]);
</script>

<style>
</style>