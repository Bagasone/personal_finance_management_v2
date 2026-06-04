import { useQuery } from "@tanstack/react-query";
import INCOME_KEYS from "../constants";
import incomeService from "../services";

const useIncomes = (filters) => {
  return useQuery({
    queryKey: INCOME_KEYS.filtered(filters),
    queryFn: () => incomeService.getAll(filters),
    select: (res) => res.data,
  });
};

export default useIncomes;
