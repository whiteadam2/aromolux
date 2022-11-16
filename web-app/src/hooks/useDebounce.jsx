import { useEffect, useState } from "react";

export function useDebounce(func, ms) {
  const [immediateValue, setImmediateValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(func, ms);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [immediateValue]);

  return [immediateValue, setImmediateValue];
}
