import { useQueryClient, useMutation } from "@tanstack/react-query";
import BUDGET_KEYS from "../constants";
import budgetService from "../services";

const useBudgetMutations = (filters) => {
  const queryClient = useQueryClient();

  const createBudget = useMutation({
    mutationFn: (data) => budgetService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const updateBudget = useMutation({
    mutationFn: ({ id, data }) => budgetService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteBudget = useMutation({
    mutationFn: (id) => budgetService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: BUDGET_KEYS.all() });

      const previous = queryClient.getQueryData(BUDGET_KEYS.filtered(filters));
      queryClient.setQueryData(BUDGET_KEYS.filtered(filters), (oldData) => ({
        ...oldData,
        data: oldData.data.filter((b) => b.id !== id),
      }));

      return { previous };
    },
    onError: (err, id, context) => {
      console.error(err);
      queryClient.setQueryData(BUDGET_KEYS.filtered(filters), context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all() });
    },
  });

  return { createBudget, updateBudget, deleteBudget };
};

export default useBudgetMutations;
