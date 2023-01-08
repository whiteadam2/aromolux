import React, { useEffect } from 'react'

const tgApp = window.Telegram.WebApp

interface AlertProps {
  message: string
}

export const Alert: React.FC<AlertProps> = ({ message }) => {
  useEffect(() => {
    if (tgApp.platform !== 'unknown') {
      tgApp.showPopup({ message })
    }
  })

  return null
}
