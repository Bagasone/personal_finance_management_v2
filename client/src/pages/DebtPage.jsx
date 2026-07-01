import { useState } from "react";
import useDebts from "../features/debt/hooks/useDebts";
import useDebtMutations from "../features/debt/hooks/useDebtMutations";
import useToast from "../hooks/useToast";

import DebtList from "../features/debt/components/DebtList";
import DebtForm from "../features/debt/components/DebtForm";
import DebtDetailPanel from "../features/debt/components/DebtDetailPanel";
import DebtSkeleton from "../features/debt/components/DebtSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const DebtPage = () => {
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isFetching, isError, error } = useDebts();
  const { createDebt, updateDebt, deleteDebt, addPayment } = useDebtMutations();

  const { toast, showToast, closeToast } = useToast();

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedDebt(null);
  };

  const handleEdit = (data) => {
    setIsOpen(true);
    setSelectedDebt(data);
  };

  const handleDelete = (id) => {
    deleteDebt.mutate(id, {
      onSuccess: () => {
        setSelectedDebt(null);
        showToast("Debt deleted", "success");
      },
      onError: (err) => showToast("Failed to delete debt", "error"),
    });
  };

  const handleSubmit = (data) => {
    if (selectedDebt)
      updateDebt.mutate(
        { id: selectedDebt.id, data },
        {
          onSuccess: () => {
            showToast("Debt updated", "success");
            handleCancel();
          },
          onError: (err) => setServerError(err.message),
        },
      );
    else
      createDebt.mutate(data, {
        onSuccess: () => {
          showToast("Debt added", "success");
          handleCancel();
        },
        onError: (err) => setServerError(err.message),
      });
  };

  const handleAddPayment = (data) => {
    addPayment.mutate(
      { id: selectedDebt.id, data },
      {
        onSuccess: ({ data }) => {
          setSelectedDebt(data);
          showToast("Payment added", "success");
        },
        onError: (err) => setServerError(err.message),
      },
    );
  };

  if (isLoading) return <DebtSkeleton />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="grid grid-cols-12 justify-center gap-5 overflow-hidden">
      <div className="col-span-8 flex flex-col justify-start items-start gap-1">
        {isFetching && !isLoading && <Spinner />}
        <Button
          label="Add Debt"
          onClick={() => setIsOpen(true)}
        />
        <DebtList
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={setSelectedDebt}
        />
      </div>
      <div className="col-span-4 flex flex-col justify-start items-start gap-1 ">
        <DebtDetailPanel
          data={selectedDebt}
          onAddPayment={handleAddPayment}
          serverError={serverError}
        />
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}>
          <DebtForm
            initialData={selectedDebt}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            serverError={serverError}
          />
        </Modal>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default DebtPage;
