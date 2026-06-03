import fetcher from "../../../lib/fetcher";

const incomeService = {
  getAll: (filters) => {
    const queries = new URLSearchParams(filters);
    return fetcher(`/api/incomes?${queries.toString()}`);
  },
  create: (data) => {
    return fetcher(`/api/incomes`, { method: "POST", body: JSON.stringify(data) });
  },
  update: (id, data) => {
    return fetcher(`/api/incomes/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },
  delete: (id) => {
    return fetcher(`/api/incomes/${id}`, { method: "DELETE" });
  },
};

export default incomeService;
