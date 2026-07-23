export const calculate = (data, key = "amount", filter = null) => {
  if (!data || data.length === 0) return 0;
  if (!filter) return data.reduce((acc, curr) => acc + curr[key], 0);
  return data.reduce((acc, curr) => {
    return curr[filter.key] === filter.value ? acc + curr[key] : acc;
  }, 0);
};

export const calculatePercent = (dividen, divisor) => {
  if (divisor === 0 || isNaN(divisor)) return null;
  return Math.round((dividen / divisor) * 100);
};
