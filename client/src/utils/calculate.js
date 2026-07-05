export const calculate = (data, key = "amount", filter = null) => {
  if (!data) return 0;
  else if (!filter) return data.reduce((acc, curr) => acc + curr[key], 0);
  return data.reduce((acc, curr) => {
    return curr[filter.key] === filter.id ? acc + curr[key] : acc;
  }, 0);
};

export const percent = (dividen, divisor) => {
  return `${Math.round((dividen / divisor) * 100)}%`;
};
