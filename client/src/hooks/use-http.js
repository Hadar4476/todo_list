import axios from "axios";
import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.request({
        method: requestConfig.method,
        url: requestConfig.url,
        headers: requestConfig.headers || null,
        params: requestConfig.params || null,
        data: requestConfig.body || null,
      });

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
