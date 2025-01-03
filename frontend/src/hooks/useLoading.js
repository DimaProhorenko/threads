import React, { useState } from "react";

const useLoading = (defaultState = false) => {
  const [isLoading, setIsLoading] = useState(defaultState);

  const startLoading = () => setIsLoading(true);

  const stopLoading = () => setIsLoading(false);

  return { isLoading, startLoading, stopLoading };
};

export default useLoading;
