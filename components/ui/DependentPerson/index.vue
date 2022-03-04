<template>
  <h4 class="tw-font-bold tw-mb-3 tw-text-sm md:tw-text-base">Số người phụ thuộc:</h4>
  <Field
    class="
      tw-border
      tw-border-success
      tw-p-1.5
      tw-rounded-sm
      tw-outline-none
      tw-pr-4
      tw-w-64
      tw-text-right
    "
    v-model="numberDependentPerson"
  />
</template>

<script>
export default {
  name: "DependentPerson",
};
</script>


<script setup>
import { Field } from "vee-validate";
import { ref, watch } from "vue";
import { useSalaryStore } from "~/store/salary";

const salaryStore = useSalaryStore();

const { saveDependentPerson } = salaryStore;

const $emit = defineEmits(["on:sendDependentPerson"]);

const numberDependentPerson = ref(0);

watch(numberDependentPerson, (value) => {
  saveDependentPerson(+value);
});
</script>

<style>
</style>