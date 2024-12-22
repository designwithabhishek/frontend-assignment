import { useState, useEffect } from 'react';

const useFetch = <T,>(api: string) => {
  // State declarations
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (error: unknown) {
        if (isMounted) {
          setIsLoading(false);
          if (error instanceof Error) {
            setErrorMessage(error.message);
          } else {
            setErrorMessage('An unknown error occurred');
          }
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [api]); 

  return { data, isLoading, errorMessage };
};

export default useFetch;
