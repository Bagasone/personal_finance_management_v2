export const typeIndicator = (remaining_amount, type) => {
  if (remaining_amount === 0) {
    return {
      type_label: "Paid Off",
      type_cls: "bg-income-500/5 text-income-700",
      remaining_cls: "text-income-700",
    };
  }

  if (type === "owe") {
    return {
      type_label: type,
      type_cls: "bg-debt-500/5 text-debt-700",
      remaining_cls: "text-debt-700",
    };
  }

  if (type === "owed") {
    return {
      type_label: type,
      type_cls: "bg-budget-500/5 text-budget-700",
      remaining_cls: "text-budget-700",
    };
  }
};
