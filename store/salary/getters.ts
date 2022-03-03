export default {
  salaryByRegulation({ regulationSelected, latestRegulation, oldRegulation }) {
    return regulationSelected === "latest" ? latestRegulation : oldRegulation;
  },

  totalSocialInsuranceFee(state) {
    const { socialInsurance, insuranceMoney } = state;
    if (insuranceMoney) {
      return insuranceMoney * socialInsurance;
    }

    const maxInsurance = 20 * this.salaryByRegulation.baseSalary;

    if (this.grossSalary > maxInsurance) {
      return maxInsurance * socialInsurance;
    }

    return this.grossSalary * socialInsurance;
  },

  totalHealthInsuranceFee(state) {
    const { healthInsurance } = state;
    let { insuranceMoney } = state;

    if (insuranceMoney) {
      if (insuranceMoney > this.grossSalary) insuranceMoney = this.grossSalary;
      return insuranceMoney * healthInsurance;
    }

    const maxInsurance = 20 * this.salaryByRegulation.baseSalary;

    if (this.grossSalary > maxInsurance) {
      return maxInsurance * healthInsurance;
    }

    return this.grossSalary * healthInsurance;
  },

  totalUnemploymentInsuranceFee(state) {
    const { unemploymentInsurance } = state;
    let { insuranceMoney } = state;

    if (insuranceMoney) {
      if (insuranceMoney > this.grossSalary) insuranceMoney = this.grossSalary;
      return insuranceMoney * unemploymentInsurance;
    }

    const maxInsurance = 20 * this.areaSalary;

    if (this.grossSalary > maxInsurance) {
      return maxInsurance * unemploymentInsurance;
    }

    return this.grossSalary * unemploymentInsurance;
  },

  totalInsuranceFee({ salaryType }) {
    if (salaryType !== "gross-to-net") {
      return this.grossToNetObj.pbh;
    }

    return (
      this.totalSocialInsuranceFee +
      this.totalHealthInsuranceFee +
      this.totalUnemploymentInsuranceFee
    );
  },

  grossSalary({ realSalary, salaryType }) {
    const gross =
      salaryType === "gross-to-net" ? realSalary : this.grossToNetObj.gross;

    return gross;
  },

  thuNhapChiuThue(state) {
    const { numberDependentPerson } = state;

    if (this.grossSalary <= this.salaryByRegulation.minusMyself) {
      return 0;
    }

    const luongChiuThue =
      this.grossSalary -
      this.salaryByRegulation.minusMyself -
      this.salaryByRegulation.dependents * numberDependentPerson -
      this.totalInsuranceFee;

    return luongChiuThue < 0 ? 0 : luongChiuThue;
  },

  taxArr() {
    if (this.grossSalary < 12000000) return taxDetailArray;
    let totalValue = 0;

    const taxDetail = JSON.parse(JSON.stringify(taxDetailArray));
    const tax = taxDetail.map((taxItem) => {
      totalValue += taxItem.startValue;

      const nextChiuThue =
        this.thuNhapChiuThue - totalValue > 0
          ? this.thuNhapChiuThue - totalValue
          : 0;

      if (this.thuNhapChiuThue >= taxItem.minValue) {
        taxItem.tax = taxItem.value * taxItem.taxPercent;
      }

      if (
        this.thuNhapChiuThue < taxItem.maxValue &&
        this.thuNhapChiuThue > taxItem.minValue
      ) {
        taxItem.tax = nextChiuThue * taxItem.taxPercent;
      }

      if (
        this.thuNhapChiuThue < taxItem.maxValue &&
        this.thuNhapChiuThue < taxItem.minValue
      ) {
        taxItem.tax = null;
      }

      return taxItem;
    });

    return tax;
  },

  totalTax() {
    if (this.grossSalary < 12000000) return 0;
    return this.taxArr.map((t) => t.tax).reduce((a, b) => a + b);
  },

  salaryBeforeTax({ realSalary, salaryType }) {
    return this.grossSalary - this.totalInsuranceFee < 0
      ? 0
      : realSalary - this.totalInsuranceFee;
  },

  netSalary({ realSalary, salaryType }) {
    const grossSalary =
      salaryType === "gross-to-net" ? realSalary : this.grossToNetObj.gross;
    const net = grossSalary - this.totalTax - this.totalInsuranceFee;

    if (net < 0) return 0;

    return Math.round(net);
  },

  grossToNetObj({ realSalary, numberDependentPerson, areaSalary }) {
    const TNGD =
      realSalary -
      this.salaryByRegulation.minusMyself -
      numberDependentPerson * this.salaryByRegulation.dependents;
    let gross = 0;
    let pbh = 0;

    const findWithinSalary = TNQD.find(
      (t) => t.minValue <= TNGD && t.maxValue > TNGD
    ) || {
      minus: 0,
      percent: 1,
    };

    const thuNhapTinhThue =
      (TNGD - findWithinSalary.minus) / findWithinSalary.percent;

    const thueTNCN =
      thuNhapTinhThue * (1 - findWithinSalary.percent) - findWithinSalary.minus;

    const maxPBHWithoutUnemployment =
      this.salaryByRegulation.baseSalary * 20 * 0.095;
    const maxInsuranceFee = areaSalary * 20 * 0.01;

    const maxPBH = maxPBHWithoutUnemployment + maxInsuranceFee;

    if (TNGD < 0) {
      gross = realSalary / 0.895;
      const countPBH = gross - realSalary;
      pbh = countPBH > maxPBH ? maxPBH : countPBH;
    } else {
      const salaryWithoutPBH =
        thuNhapTinhThue +
        this.salaryByRegulation.minusMyself +
        numberDependentPerson * this.salaryByRegulation.dependents;

      const countPBH = salaryWithoutPBH / 0.895 - salaryWithoutPBH;

      pbh = countPBH > maxPBH ? maxPBH : countPBH;

      gross = salaryWithoutPBH + pbh;
    }

    return {
      thuNhapTinhThue: Math.round(thuNhapTinhThue),
      thueTNCN: Math.round(thueTNCN),
      gross: Math.round(gross),
      pbh: Math.round(pbh),
      maxPBH: Math.round(maxPBH)
    };
  },
};

const taxDetailArray = [
  {
    minValue: 0,
    maxValue: 5000000,
    value: 5000000,
    taxPercent: 0.05,
    text: "Đến 5 triệu VNĐ",
    tax: null,
    startValue: 0,
  },
  {
    minValue: 5000000,
    maxValue: 10000000,
    value: 5000000,
    taxPercent: 0.1,
    text: "Trên 5 triệu VNĐ đến 10 triệu VNĐ",
    tax: null,
    startValue: 5000000,
  },
  {
    minValue: 10000000,
    maxValue: 18000000,
    value: 8000000,
    taxPercent: 0.15,
    text: "Trên 10 triệu VNĐ đến 18 triệu VNĐ",
    tax: null,
    startValue: 5000000,
  },
  {
    minValue: 18000000,
    maxValue: 32000000,
    value: 14000000,
    taxPercent: 0.2,
    text: "Trên 18 triệu VNĐ đến 32 triệu VNĐ",
    tax: null,
    startValue: 8000000,
  },
  {
    minValue: 32000000,
    maxValue: 52000000,
    value: 20000000,
    taxPercent: 0.25,
    text: "Trên 32 triệu VNĐ đến 52 triệu VNĐ",
    tax: null,
    startValue: 14000000,
  },
  {
    minValue: 52000000,
    maxValue: 80000000,
    value: 28000000,
    taxPercent: 0.3,
    text: "Trên 52 triệu VNĐ đến 80 triệu VNĐ",
    tax: null,
    startValue: 20000000,
  },
  {
    minValue: 80000000,
    maxValue: 1000000000000000000,
    value: 1000000000000000000 - 80000000,
    taxPercent: 0.35,
    text: "Trên 80 triệu VNĐ",
    tax: null,
    startValue: 28000000,
  },
];

const TNQD = [
  {
    minValue: 0,
    maxValue: 4750000,
    percent: 0.95,
    minus: 0,
  },
  {
    minValue: 4750000,
    maxValue: 9250000,
    percent: 0.9,
    minus: 250000,
  },
  {
    minValue: 9250000,
    maxValue: 16050000,
    percent: 0.85,
    minus: 750000,
  },
  {
    minValue: 16050000,
    maxValue: 27250000,
    percent: 0.8,
    minus: 1650000,
  },
  {
    minValue: 27250000,
    maxValue: 42250000,
    percent: 0.75,
    minus: 3250000,
  },
  {
    minValue: 42250000,
    maxValue: 61850000,
    percent: 0.7,
    minus: 5850000,
  },
  {
    minValue: 61850000,
    maxValue: 1000000000000000,
    percent: 0.65,
    minus: 9850000,
  },
];
