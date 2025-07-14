import { useState } from "react";
import getStoredValue from "../util/getStoredValue";

export default function useStorage(key) {
  let [value, setValue] = useState(getStoredValue(key));

  return [
    value,
    (newValue) => {
      if (!newValue) {
        localStorage.removeItem(key);
      } else if (typeof newValue === "object") {
        localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        localStorage.setItem(key, newValue);
      }
      setValue(newValue);
    },
  ];
}
