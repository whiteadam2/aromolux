import React, { useEffect } from 'react'

const tgApp = window.Telegram.WebApp

interface ButtonProps {
  label: string
  onClick: React.MouseEventHandler<HTMLDivElement>
  disabled?: boolean
}

const WebMainButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed w-1/2 py-2 bottom-8 left-1/4 z-10 opacity-80 animate-bounce bg-green-500 text-white text-md  text-center rounded-xl cursor-pointer"
    >
      {label}
    </div>
  )
}

const TelegramMainButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false
}) => {
  useEffect(() => {
    tgApp.MainButton.show()
    return () => tgApp.MainButton.hide()
  }, [])

  useEffect(() => {
    tgApp.MainButton.setText(label)
  }, [label])

  useEffect(() => {
    tgApp.MainButton.onClick(onClick)
    return () => tgApp.MainButton.offClick(onClick)
  }, [onClick])

  useEffect(() => {
    disabled ? tgApp.MainButton.disable() : tgApp.MainButton.enable()
  }, [disabled])

  return null
}

export const MainButton: React.FC<ButtonProps> = (props) => {
  return (
    <>
      {tgApp.platform !== 'unknown' ? (
        <TelegramMainButton {...props} />
      ) : (
        <WebMainButton {...props} />
      )}
    </>
  )
}
