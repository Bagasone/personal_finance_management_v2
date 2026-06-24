export const calculate = (data, filter = null) => {
  if (!data) return 0;
  else if (!filter) return data.reduce((acc, curr) => acc + curr.amount, 0);
  return data.reduce((acc, curr) => {
    return curr[filter.label] === filter.value ? acc + curr.amount : acc;
  }, 0);
};

export const percent = (dividen, divisor) => {
  return `${Math.round((dividen / divisor) * 100)}%`;
};
