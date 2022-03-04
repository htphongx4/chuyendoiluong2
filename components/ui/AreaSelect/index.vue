<template>
  <div class="tw-flex tw-items-center tw-my-4 tw-gap-4">
    <label class="tw-font-bold tw-mr-4 tw-text-sm md:tw-text-base" for="Thu Nhập:"> Chọn vùng: </label>
    <Checkbox
      :active="areaSelected === area.value"
      v-for="(area, index) in areaList"
      :key="index"
      @click="onCheck(area)"
    >
      {{ area.name }}
    </Checkbox>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useSalaryStore } from "~/store/salary";

export default {
  name: "AreaSelect",
  data() {
    return {
      areaList: [
        {
          value: "first",
          salary: 4420000,
          name: "I",
        },
        {
          value: "second",
          salary: 3920000,
          name: "II",
        },
        {
          value: "third",
          salary: 3430000,
          name: "III",
        },
        {
          value: "fourth",
          salary: 3070000,
          name: "IV",
        },
      ],
      areaSelected: "first",
    };
  },
  methods: {
    ...mapActions(useSalaryStore, ["saveAreaSalary"]),
    onCheck(area) {
      this.areaSelected = area.value;
      this.saveAreaSalary(area.salary);
    },
  },
};
</script>

<style>
</style>