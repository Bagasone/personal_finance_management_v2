const fetcher = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default fetcher;
