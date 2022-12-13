import React, { useEffect } from 'react'

const tgApp = window.Telegram.WebApp

interface AlertProps {
  message: string | undefined
}

export const Alert: React.FC<AlertProps> = ({ message }) => {
  useEffect(() => {
    if (tgApp.platform !== 'unknown' && message !== undefined) {
      tgApp.showAlert(JSON.stringify(message))
    }
  })

  return null
}
