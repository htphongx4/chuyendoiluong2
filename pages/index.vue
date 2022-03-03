<template>
  <div class="tw-container tw-mx-auto">
    <Html lang="en">
      <Head>
        <Title>Tính lương Gross sang Net / Net sang Gross chuẩn 2022</Title>
        <Meta name="title" content="Tinh luong" />
        <Meta name="description" content="Tinh luong" />
      </Head>
    </Html>
    <div class="tw-flex tw-justify-center tw-items-center tw-gap-6">
      <div
        class="
          tw-bg-primary-medium
          tw-text-white
          tw-font-bold
          tw-p-10
          tw-rounded-sm
          tw-cursor-pointer
          tw-text-lg
        "
        @click="onClick('gross-to-net')"
      >
        Chuyển đổi Gross => Net
      </div>
      <div
        class="
          tw-bg-coral
          tw-text-white
          tw-font-bold
          tw-p-10
          tw-rounded-sm
          tw-cursor-pointer
          tw-text-lg
        "
        @click="onClick('net-to-gross')"
      >
        Chuyển đổi Net => Gross
      </div>
    </div>
  </div>
</template>

<script>
import Regulation from "~~/components/ui/Regulation";
import SalaryInfo from "~/components/ui/SalaryInfo";
import { useSalaryStore } from "~/store/salary";
import { mapActions } from "pinia";

export default {
  name: "HomePage",
  components: {
    Regulation,
    SalaryInfo,
  },
  methods: {
    ...mapActions(useSalaryStore, ["saveSalaryType"]),
    onClick(type) {
      this.saveSalaryType(type);
      this.$router.push({
        path: "/chuyen-doi-luong",
        query: {
          type: type,
        },
      });
    },
  },
};
</script>

<script setup>
</script>

<style lang="">
</style>