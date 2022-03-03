<template>
  <div class="tw-bg-white tw-rounded-sm tw-my-4">
    <div class="tw-mb-4">
      <label class="tw-font-bold tw-mr-4"> Số tiền đóng bảo hiểm: </label>
      <div class="tw-flex tw-flex-wrap tw-mt-4 tw-gap-4">
        <Checkbox :active="moneyType === 'base'" @click="onCheck('base')">
          Lương chính thức
        </Checkbox>
        <Checkbox :active="moneyType === 'other'" @click="onCheck('other')">
          Số khác
        </Checkbox>
      </div>
    </div>
    <div class="tw-flex">
      <div class="tw-relative tw-inline-block">
        <Field
          class="
            tw-border
            tw-border-success
            tw-p-1.5
            tw-rounded-sm
            tw-outline-none
            tw-pr-16
            tw-w-64
            tw-text-right
          "
          name="salary-input"
          :placeholder="moneyType === 'base' ? salary : 'VD: 20,000,000 VNĐ'"
          :disabled="moneyType === 'base'"
          @keypress="onlyNumber"
          @focus="onFocus"
          @blur="onBlur"
          v-model="insuranceMoney"
        />
        <ErrorMessage name="salary-input" />
        <div
          class="tw-absolute tw-top-2 tw-right-4 tw-text-grey-500 tw-text-sm"
        >
          (VNĐ)
        </div>
      </div>
      <SuggestMoney
        v-if="moneyType === 'other'"
        class="tw-ml-6"
        :money="insuranceMoney"
        @on:sendValue="receiveSuggestedMoney"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InsuranceMoney",
};
</script>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref, toRefs, watch } from "vue";
import { useSalaryStore } from "~/store/salary";

const props = defineProps({
  salary: String,
});

const { salary } = toRefs(props, "salary");

const moneyType = ref("base");
const insuranceMoney = ref(null);

const salaryStore = useSalaryStore();

const { saveInsuranceMoney } = salaryStore;

const onCheck = (type) => {
  saveInsuranceMoney(0);
  insuranceMoney.value = null;
  moneyType.value = type;
};

const onlyNumber = (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which;
  if (keyCode < 48 || keyCode > 57) {
    e.preventDefault();
  }
};

const onFocus = (e) => {
  if (e.target.value) {
    insuranceMoney.value = parseFloat(
      e.target.value.toString().replace(/,/g, "")
    ).toFixed(0);
  }
};

const localStringToNumber = (value) => {
  return Number(value).toLocaleString("tl-PH");
};

const onBlur = (e) => {
  saveInsuranceMoney(+e.target.value);
  const setFormat = localStringToNumber(e.target.value.replace(/,/g, ""));
  if (e.target.value) {
    insuranceMoney.value = setFormat;
  }
};

const receiveSuggestedMoney = (val) => {
  saveInsuranceMoney(+val);
  const setFormat = localStringToNumber(val);
  insuranceMoney.value = setFormat;
};
</script>