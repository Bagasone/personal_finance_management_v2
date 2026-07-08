export const variations = (data) => {
  if (data.remainingAmount === 0) {
    return {
      label: "Paid Off",
      classType: "bg-income-500/5 text-income-700",
      classAmount: "text-income-700",
    };
  }

  if (data.type === "owe") {
    return {
      label: data.type,
      classType: "bg-debt-500/5 text-debt-700",
      classAmount: "text-debt-700",
    };
  }

  if (data.type === "owed") {
    return {
      label: data.type,
      classType: "bg-budget-500/5 text-budget-700",
      classAmount: "text-budget-700",
    };
  }
};
