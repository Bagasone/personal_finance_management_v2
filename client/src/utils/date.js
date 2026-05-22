export const getFullDate = () => new Date().toISOString();
export const getShortDate = () => new Date().toISOString().split("T")[0];
export const getYearMonthDate = () => new Date().toISOString().slice(0, 7);
export const formatDate = (date) => new Intl.DateTimeFormat("id-ID", format).format(date);
