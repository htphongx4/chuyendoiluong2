<template>
  <div class="tw-text-primary-medium tw-font-lg tw-mb-4 tw-mt-4">
    Người sử dụng lao động trả (VNĐ)
  </div>
  <div class="tw-bg-white tw-rounded-sm tw-mb-4 tw-p-2">
    <div class="tw-grid tw-grid-cols-3" v-for="(item, key) in items" :key="key">
      <div
        class="
          tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2 tw-text-sm
          md:tw-text-base
          tw-col-start-1 tw-col-end-3
        "
        :class="{ 'tw-text-primary-medium': item.name === 'Tổng chi phí' }"
      >
        <span>{{ item.name }}</span>
        <span
          v-if="item.desc"
          class="tw-text-error tw-cursor-pointer tw-ml-3"
          @click="onShowDesc(item.desc)"
        >
          (?)
        </span>
      </div>
      <div
        class="
          tw-font-bold tw-pb-2 tw-border-b tw-border-grey-300 tw-p-2 tw-text-sm
          md:tw-text-base
        "
        :class="{ 'tw-text-primary-medium': item.name === 'Tổng chi phí' }"
      >
        {{ item.value ? $currency(item.value) : 0 }}
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
};
</script>

<script setup>
import { storeToRefs } from "pinia";
import { useSalaryStore } from "~/store/salary";
import { computed, ref } from "vue";

const salaryStore = useSalaryStore();
const $currency = useCurrency();
const show = ref(false);
const desc = ref(null);

const {
  grossSalary,
  companyPaySocialInsurance,
  companyPayWorkingInsuranceFee,
  companyPayHealthInsuranceFee,
  companyPayUnemploymentInsuranceFee,
  totalCompanyPay,
} = storeToRefs(salaryStore);

const onShowDesc = (d) => {
  desc.value = d;
  show.value = true;
};

const hideModal = () => {
  desc.value = "";
  show.value = false;
};

const items = computed(() => [
  {
    name: "Lương Gross",
    value: grossSalary.value,
  },
  {
    name: "Bảo hiểm xã hội (17%)",
    value: companyPaySocialInsurance.value,
    desc: `<ul class="list-unstyled">
                <li>- Người lao động đóng: 8% (lao động quốc tịch nước ngoài: 8%).</li>
                <li>- Người sử dụng lao động đóng: 17% (lao động quốc tịch nước ngoài: 17%).</li>
                <li>- Mức lương tối đa tính bảo hiểm xã hội bằng 20 lần mức lương cơ sở (hiện là 1.490.000 VND/tháng).</li>
            </ul>`,
  },
  {
    name: "Bảo hiểm Tai nạn lao động - Bệnh nghề nghiệp (0.5%)",
    value: companyPayWorkingInsuranceFee.value,
    desc: `<ul class="list-unstyled">
                <li>- Người sử dụng lao động đóng: 0.5%.</li>
                <li>- Mức lương tối đa tính bảo hiểm y tế bằng 20 lần mức lương cơ sở (hiện là 1.490.000 VND/tháng).</li>
            </ul>`,
  },
  {
    name: "Bảo hiểm y tế (3%)",
    value: companyPayHealthInsuranceFee.value,
    desc: `<ul class="list-unstyled">
                <li>- Người lao động đóng: 1.5% (lao động quốc tịch nước ngoài: 1.5%).</li>
                <li>- Người sử dụng lao động đóng: 3% (lao động quốc tịch nước ngoài: 3%).</li>
                <li>- Mức lương tối đa tính bảo hiểm y tế bằng 20 lần mức lương cơ sở (hiện là 1.490.000 VND/tháng).</li>
            </ul>`,
  },
  {
    name: "Bảo hiểm thất nghiệp (1%)",
    value: companyPayUnemploymentInsuranceFee.value,
    desc: `<ul class="list-unstyled">
                <li>- Người sử dụng lao động đóng: 1%.</li>
                <li>- Mức lương tối đa tính bảo hiểm thất nghiệp bằng 20 lần mức lương tối thiểu vùng tại vùng mà người sử dụng lao động trực thuộc.</li>
            </ul>`,
  },
  {
    name: "Tổng chi phí",
    value: totalCompanyPay.value,
  },
]);
</script>

<style>
</style>