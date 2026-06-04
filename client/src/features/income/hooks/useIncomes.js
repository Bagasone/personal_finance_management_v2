import { useQuery } from "@tanstack/react-query";
import INCOME_KEYS from "../constants/queryKey";
import incomeService from "../services";

const useIncomes = (filters) => {
  return useQuery({
    queryKey: INCOME_KEYS.filtered(filters),
    queryFn: () => incomeService.getAll(filters),
  });
};

export default useIncomes;
