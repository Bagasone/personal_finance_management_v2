import fetcher from "../../../lib/fetcher";

const expenseService = {
  getAll: (filters) => {
    const queries = new URLSearchParams(filters);
    return fetcher(`/api/expenses?${queries.toString()}`);
  },
  create: (data) => {
    return fetcher(`/api/expenses`, { method: "POST", body: JSON.stringify(data) });
  },
  update: (id, data) => {
    return fetcher(`/api/expenses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete: (id) => {
    return fetcher(`/api/expenses/${id}`, { method: "DELETE" });
  },
};

export default expenseService;
