import { useQueryClient, useMutation } from "@tanstack/react-query";
import DEBT_KEYS from "../constants";
import debtService from "../services";

const useDebtMutations = () => {
  const queryClient = useQueryClient();

  const createDebt = useMutation({
    mutationFn: (data) => debtService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEBT_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const updateDebt = useMutation({
    mutationFn: ({ id, data }) => debtService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEBT_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteDebt = useMutation({
    mutationFn: (id) => debtService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: DEBT_KEYS.all() });

      const previous = queryClient.getQueryData(DEBT_KEYS.all());
      queryClient.setQueryData(DEBT_KEYS.all(), (oldData) =>
        oldData.filter((d) => d.id !== id),
      );

      return { previous };
    },
    onError: (err, id, context) => {
      console.error(err);
      queryClient.setQueryData(DEBT_KEYS.all(), context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: DEBT_KEYS.all() });
    },
  });

  const addPayment = useMutation({
    mutationFn: ({ id, data }) => debtService.addPayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEBT_KEYS.all() });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { createDebt, updateDebt, deleteDebt, addPayment };
};

export default useDebtMutations;
