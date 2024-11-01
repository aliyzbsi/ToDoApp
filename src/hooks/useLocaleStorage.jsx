import { useState, useEffect } from "react";

const useLocaleStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Eğer item yoksa (null veya undefined) varsayılan değeri kullan
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`localStorage error: ${error}`);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`localStorage error: ${error}`);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocaleStorage;
