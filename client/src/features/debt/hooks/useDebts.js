
import { useQuery } from "@tanstack/react-query";
import DEBT_KEYS from "../constants";
import debtService from "../services";

const useDebts = () => {
  return useQuery({
    queryKey: DEBT_KEYS.all(),
    queryFn: () => debtService.getAll(),
    select: (res) => res.data,
  });
};

export default useDebts;
