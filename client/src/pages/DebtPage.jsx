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
  const [selected, setSelected] = useState(null);
  const [edited, setEdited] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({ message: null, fields: {} });
  const [paymentErrors, setPaymentErrors] = useState({ message: null, fields: {} });

  const { data, isLoading, isFetching, isError, error, refetch } = useDebts();
  const { createDebt, updateDebt, deleteDebt, addPayment } = useDebtMutations();

  const { toast, showToast, closeToast } = useToast();

  if (isLoading) return <DebtSkeleton />;
  if (isError && error.status >= 500)
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
      />
    );

  const handleCancel = () => {
    setIsOpen(false);
    setEdited(null);
    setErrors({ message: null, fields: {} });
  };

  const handleEdit = (data) => {
    setIsOpen(true);
    setEdited(data);
  };

  const handleDelete = (id) => {
    deleteDebt.mutate(id, {
      onSuccess: () => {
        if (selected.id === id) setSelected(null);
        showToast("Debt deleted", "success");
      },
      onError: (err) => {
        showToast("Failed to delete debt", "error");
      },
    });
  };

  const handleSubmit = (data) => {
    setErrors({ message: null, fields: {} });
    if (edited)
      updateDebt.mutate(
        { id: edited.id, data },
        {
          onSuccess: () => {
            showToast("Debt updated", "success");
            handleCancel();
          },
          onError: (err) => {
            setErrors({ message: err.message, fields: err.errors });
          },
        },
      );
    else
      createDebt.mutate(data, {
        onSuccess: () => {
          showToast("Debt added", "success");
          handleCancel();
        },
        onError: (err) => {
          setErrors({ message: err.message, fields: err.errors });
        },
      });
  };

  const handleAddPayment = (data) => {
    setPaymentErrors({ message: null, fields: {} });
    addPayment.mutate(
      { id: selected.id, data },
      {
        onSuccess: ({ data }) => {
          setSelected(data);
          showToast("Payment added", "success");
        },
        onError: (err) => {
          setPaymentErrors({ message: err.message, fields: err.errors });
        },
      },
    );
  };

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
          onDetail={setSelected}
        />
      </div>
      <div className="col-span-4 flex flex-col justify-start items-start gap-1 ">
        <DebtDetailPanel
          data={selected}
          onAddPayment={handleAddPayment}
          serverErrors={paymentErrors}
        />
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}>
          <DebtForm
            initialData={edited}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            serverErrors={errors}
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
