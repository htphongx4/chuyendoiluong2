<template>
  <div
    class="
      tw-container tw-mx-auto tw-bg-grey-100
      md:tw-rounded-lg
      tw-p-4
      md:tw-w-7/12
      tw-mb-6
    "
  >
    <Html lang="en">
      <Head>
        <Title>Tính lương Gross sang Net / Net sang Gross chuẩn 2022</Title>
        <Meta
          name="title"
          property="title"
          content="Tính lương Gross sang Net / Net sang Gross chuẩn 2022"
        />
        <Meta
          name="og:title"
          property="og:title"
          content="Tính lương Gross sang Net / Net sang Gross chuẩn 2022"
        />
        <Meta
          name="description"
          property="description"
          content="Tính lương Gross sang Net / Net sang Gross chuẩn 2022"
        />
        <Meta
          name="og:description"
          property="og:description"
          content="Tính lương Gross sang Net / Net sang Gross chuẩn 2022"
        />
        <Meta
          name="image"
          property="image"
          content="https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye.jpg"
        />
        <Meta name="og:type" property="og:type" content="Website" />
        <Meta
          name="og:image"
          property="og:image"
          content="https://vuongquocanh.com/wp-content/uploads/2018/05/london-eye.jpg"
        />
        <Meta
          name="og:url"
          property="og:url"
          content="https://chuyendoi.vercel.app/chuyen-doi-luong?type=gross-to-net"
        />
      </Head>
    </Html>
    <div class="tw-flex tw-mb-4">
      <Button @click="backToHome">Về trang chủ</Button>
    </div>
    <SalaryInfo />
    <div class="tw-flex tw-gap-4 tw-my-4">
      <Checkbox
        :active="salaryType === 'gross-to-net'"
        @click="onCheck('gross-to-net')"
      >
        Gross to Net
      </Checkbox>
      <Checkbox
        :active="salaryType === 'net-to-gross'"
        @click="onCheck('net-to-gross')"
      >
        Net to Gross
      </Checkbox>
    </div>
    <Regulation class="tw-my-4" />
    <SalaryInput />
    <GrossToNet />
    <SalaryDetail />
    <TaxSalary />
    <CompanyPay />
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSalaryStore } from "~/store/salary";

export default {
  name: "HomePage",
  computed: {
    ...mapState(useSalaryStore, {
      salaryType: "salaryType",
    }),
  },
  created() {
    const { type } = this.$route.query;
    this.saveSalaryType(type);
  },
  methods: {
    ...mapActions(useSalaryStore, ["saveSalaryType"]),
    onCheck(type) {
      this.$router.push({
        query: {
          type,
        },
      });
      this.saveSalaryType(type);
    },

    backToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="">
</style>