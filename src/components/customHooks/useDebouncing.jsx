import React, { useState } from "react";

function useDebouncing(callback, delay) {
  const [timeOutId, setTimeOutId] = useState(null);

  const debounceFunction = (...args) => {
    clearTimeout(timeOutId);

    const id = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
    setTimeOutId(id);
  };

  return debounceFunction;
}

export default useDebouncing;
