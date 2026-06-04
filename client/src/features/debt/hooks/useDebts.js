import { useQuery } from "@tanstack/react-query";
import DEBT_KEYS from "../constants/queryKey";
import debtService from "../services";

const useDebts = () => {
  return useQuery({
    queryKey: DEBT_KEYS.all(),
    queryFn: () => debtService.getAll(),
  });
};

export default useDebts;
