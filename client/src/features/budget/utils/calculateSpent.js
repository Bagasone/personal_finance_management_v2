const calculateSpent = (expenses, budgetCategoryId) => {
  return (
    expenses.reduce(
      (acc, exp) => (budgetCategoryId === exp.categoryId ? acc + exp.amount : acc),
      0,
    ) ?? 0
  );
};

export default calculateSpent;
