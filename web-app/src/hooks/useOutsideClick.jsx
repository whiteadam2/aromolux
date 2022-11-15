import { useEffect } from "react";

export function useOutsideClick(ref, callback) {
  function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line
  }, []);
}
