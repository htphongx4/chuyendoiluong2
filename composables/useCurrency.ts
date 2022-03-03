export const useCurrency = () => {
  const currency = (value) => {
    return Number.parseInt(value).toLocaleString("vi", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      style: "currency",
      currencyDisplay: "symbol",
      currency: "VND",
    });
  };
  return currency;
};
