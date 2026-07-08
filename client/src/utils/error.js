export const errorField = (clientError, serverError) => {
  return (field) => clientError[field] || serverError?.[field];
};
