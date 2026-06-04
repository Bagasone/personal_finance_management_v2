import { useQuery } from "@tanstack/react-query";
import BUDGET_KEYS from "../constants/queryKey";
import budgetService from "../services";

const useBudgets = (filters) => {
  return useQuery({
    queryKey: BUDGET_KEYS.filtered(filters),
    queryFn: ()=> budgetService.getAll(filters),
  });
};

export default useBudgets;
