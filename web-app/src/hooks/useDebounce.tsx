import React, { useEffect, useState } from 'react'

export function useDebounce(
  func: () => void,
  ms: number
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [immediateValue, setImmediateValue] = useState('')

  useEffect(() => {
    const timeout = setTimeout(func, ms)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [immediateValue]);

  return [immediateValue, setImmediateValue]
}
