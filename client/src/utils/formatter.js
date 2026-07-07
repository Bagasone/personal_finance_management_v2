export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatCurrencyCompact = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    notation: "compact",
    compactDisplay: "short",
  }).format(amount);
};

export const formatDate = (data, option) => {
  const date = new Date(data);
  return new Intl.DateTimeFormat("en-GB", option).format(date);
};

export const formatMonth = (data) => {
  const date = new Date(`${data}-01`);
  return formatDate(date, { year: "numeric", month: "long" });
};
