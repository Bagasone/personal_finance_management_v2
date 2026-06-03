import fetcher from "../../../lib/fetcher";

const debtService = {
  getAll: () => {
    return fetcher(`/api/debts`);
  },
  create: (data) => {
    return fetcher(`/api/debts`, { method: "POST", body: JSON.stringify(data) });
  },
  update: (id, data) => {
    return fetcher(`/api/debts/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },
  delete: (id) => {
    return fetcher(`/api/debts/${id}`, { method: "DELETE" });
  },
  addPayment: (id, data) => {
    return fetcher(`/api/debts/${id}/payments`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export default debtService;
