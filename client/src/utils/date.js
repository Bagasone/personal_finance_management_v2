export const getFullDate = () => new Date().toISOString();
export const getDate = () => new Date().toISOString().split("T")[0];
export const getMonth = () => new Date().toISOString().slice(0, 7);
export const prevMonth = (month) => {
  const date = new Date(`${month}-01`);
  date.setMonth(date.getMonth() - 1);

  const prev_month = date.toISOString().slice(0, 7);
  return prev_month;
};
