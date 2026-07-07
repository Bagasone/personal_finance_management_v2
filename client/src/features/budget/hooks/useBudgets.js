import { useQuery } from "@tanstack/react-query";
import BUDGET_KEYS from "../constants";
import budgetService from "../services";

const useBudgets = (filters) => {
  return useQuery({
    queryKey: BUDGET_KEYS.filtered(filters),
    queryFn: () => budgetService.getAll(filters),
    select: (res) => res.data,
  });
};

export default useBudgets;
