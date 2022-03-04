import { useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const [ storedValue, setStoredValue ] = useState(() => {
    try {
      const item: any = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }
  return [ storedValue, setValue ];
}
