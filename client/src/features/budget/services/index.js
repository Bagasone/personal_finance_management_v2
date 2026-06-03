import fetcher from "../../../lib/fetcher";

const budgetService = {
  getAll: (filters) => {
    const queries = new URLSearchParams(filters);
    return fetcher(`/api/budgets?${queries.toString()}`);
  },
  create: (data) => {
    return fetcher(`/api/budgets`, { method: "POST", body: JSON.stringify(data) });
  },
  update: (id, data) => {
    return fetcher(`/api/budgets/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },
  delete: (id) => {
    return fetcher(`/api/budgets/${id}`, { method: "DELETE" });
  },
};

export default budgetService;
