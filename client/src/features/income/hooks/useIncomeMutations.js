import { useQueryClient, useMutation } from "@tanstack/react-query";
import INCOME_KEYS from "../constants";
import incomeService from "../services";

const useIncomeMutations = (filters) => {
  const queryClient = useQueryClient();

  const createIncome = useMutation({
    mutationFn: (data) => incomeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INCOME_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const updateIncome = useMutation({
    mutationFn: ({ id, data }) => incomeService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INCOME_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteIncome = useMutation({
    mutationFn: (id) => incomeService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: INCOME_KEYS.all() });

      const previous = queryClient.getQueryData(INCOME_KEYS.filtered(filters));
      queryClient.setQueryData(INCOME_KEYS.filtered(filters), (oldData) =>
        oldData.filter((i) => i.id !== id),
      );

      return { previous };
    },
    onError: (err, id, context) => {
      console.error(err);
      queryClient.setQueryData(INCOME_KEYS.filtered(filters), context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: INCOME_KEYS.all() });
    },
  });

  return { createIncome, updateIncome, deleteIncome };
};

export default useIncomeMutations;
