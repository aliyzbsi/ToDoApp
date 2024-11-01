import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    // ilk açılışta localstorage okuyoruz
    const localVal = localStorage.getItem(key);

    // Eğer localVal null ise, defaultValue'yu localStorage'a atıyoruz
    if (localVal === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }

    // localVal boş değilse, JSON.parse ile değeri döndürüyoruz
    try {
      return JSON.parse(localVal);
    } catch (error) {
      console.error("Error parsing localStorage item:", error);
      return defaultValue; // Hata durumunda default değeri döndür
    }
  });

  // value değiştiğinde localstorage'a yazıyoruz
  // ve yeni değeri dönüyoruz
  const setLocalStorage = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  };

  return [value, setLocalStorage];
}
