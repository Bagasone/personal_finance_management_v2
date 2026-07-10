export const errorField = (client_error, server_error) => {
  return (field) => client_error?.[field] || server_error?.[field];
};
