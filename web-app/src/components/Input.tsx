import React, { useState } from 'react'

interface InputProps {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder: string
  isFocused?: boolean
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  isFocused
}) => {
  const [changed, setChanged] = useState(false)
  return (
    <>
      <input
        onBlur={() => setChanged(true)}
        autoFocus={isFocused}
        className="h-8 pl-2 outline-0 rounded-md"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {changed && value === '' && (
        <span className="text-red-500 font-light text-sm -mt-3">
          обязательно к заполнению!
        </span>
      )}
    </>
  )
}
