import { useQuery } from "@tanstack/react-query";
import EXPENSE_KEYS from "../constants/queryKey";
import expenseService from "../services";

const useExpenses = (filters) => {
  return useQuery({
    queryKey: EXPENSE_KEYS.filtered(filters),
    queryFn: () => expenseService.getAll(filters),
  });
};

export default useExpenses;
