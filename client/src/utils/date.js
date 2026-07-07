export const getFullDate = () => new Date().toISOString();
export const getDate = () => new Date().toISOString().split("T")[0];
export const getMonth = () => new Date().toISOString().slice(0, 7);
export const getPreviousMonth = (selectedDate) => {
  const currentMonth = new Date(selectedDate);
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  return currentMonth.toISOString().slice(0, 7);
};
