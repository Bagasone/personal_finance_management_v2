export const formatCurrency = (amount, option) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    ...option,
  }).format(amount);
};

export const formatCurrencyCompact = (amount, option) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    notation: "compact",
    compactDisplay: "short",
    ...option,
  }).format(amount);
};

export const formatDate = (value, option) => {
  const date = new Date(value);
  const default_option = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    ...option,
  };

  const options = Object.fromEntries(
    Object.entries(default_option).filter(([_, value]) => value !== null),
  );

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};
