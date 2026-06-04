import { useMutation, useQueryClient } from "@tanstack/react-query";
import EXPENSE_KEYS from "../constants/queryKey";
import BUDGET_KEYS from "../../budget/constants/queryKey";
import expenseService from "../services";

const useExpenseMutations = (filters) => {
  const queryClient = useQueryClient();

  const createExpense = useMutation({
    mutationFn: (data) => expenseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all() });
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const updateExpense = useMutation({
    mutationFn: ({ id, data }) => expenseService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all() });
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteExpense = useMutation({
    mutationFn: (id) => expenseService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: EXPENSE_KEYS.all() });

      const previous = queryClient.getQueryData(EXPENSE_KEYS.filtered(filters));
      queryClient.setQueryData(EXPENSE_KEYS.filtered(filters), (oldData) =>
        oldData.filter((e) => e.id !== id),
      );

      return { previous };
    },
    onError: (err, id, context) => {
      console.error(err);
      queryClient.setQueryData(EXPENSE_KEYS.filtered(filters), context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSE_KEYS.all() });
      queryClient.invalidateQueries({ queryKey: BUDGET_KEYS.all() });
    },
  });

  return { createExpense, updateExpense, deleteExpense };
};

export default useExpenseMutations;
