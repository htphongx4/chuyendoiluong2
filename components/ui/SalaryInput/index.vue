<template>
  <div class="tw-bg-white tw-rounded-sm tw-p-3 tw-my-4">
    <div class="tw-mb-4">
      <label class="tw-font-bold tw-mr-4" for="Thu Nhập:"> Thu Nhập: </label>
      <div class="tw-flex tw-flex-wrap tw-mt-4 tw-gap-4">
        <Checkbox :active="moneyType === 'vnd'" @click="onCheck('vnd')">
          VNĐ
        </Checkbox>
        <!-- <Checkbox :active="moneyType === 'other'" @click="onCheck('other')">
          Khác
        </Checkbox> -->
        <div class="tw-relative">
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
            ref="salaryRef"
            placeholder="VD: 20,000,000"
            v-model="salary"
            @keypress="onlyNumber"
            @focus="onFocus"
            @blur="onBlur"
          />
          <div
            class="tw-absolute tw-top-2 tw-right-4 tw-text-grey-500 tw-text-sm"
          >
            (VNĐ)
          </div>
          <ErrorMessage name="salary-input" />
        </div>
      </div>
    </div>
    <AreaSelect class="tw-my-6" />
    <DependentPerson :money="salary" />
    <InsuranceMoney :salary="salary" />
  </div>
</template>

<script>
export default {
  name: "SalaryInput",
};
</script>

<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { useSalaryStore } from "~/store/salary";

const salary = ref(null);
const moneyType = ref("vnd");

const salaryStore = useSalaryStore();

const { saveRealSalary } = salaryStore;

const onCheck = (type) => {
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
    salary.value = parseFloat(
      e.target.value.toString().replace(/,/g, "")
    ).toFixed(0);
  }
};

const localStringToNumber = (value) => {
  return Number(value).toLocaleString("tl-PH");
};

const onBlur = (e) => {
  saveRealSalary(+e.target.value);
  const setFormat = localStringToNumber(e.target.value.replace(/,/g, ""));
  if (e.target.value) {
    salary.value = setFormat;
  }
};
</script>