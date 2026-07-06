export const getFullDate = () => new Date().toISOString();
export const getDate = () => new Date().toISOString().split("T")[0];
export const getMonth = () => new Date().toISOString().slice(0, 7);
