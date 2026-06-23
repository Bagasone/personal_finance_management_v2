const calculateSpent = (expenses) => {
  return expenses?.reduce((acc, exp) => exp.amount + acc, 0) ?? 0;
};

export default calculateSpent;
