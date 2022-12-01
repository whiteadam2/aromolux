import React, { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  function handleClick(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line
  }, []);
  return null;
}
