export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date, option) => {
  return new Intl.DateTimeFormat("en-US", option).format(date);
};

export const formatMonth = (month) => {
  const date = new Date(`${month}-01`);
  return formatDate(date, { year: "numeric", month: "long" });
};
