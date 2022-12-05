import React from 'react'

export interface TelegramWrapperProps {
  children: React.ReactNode
}

export const TelegramWrapper: React.FC<TelegramWrapperProps> = (props) => {
  const tgApp = window.Telegram.WebApp
  return <>{tgApp.platform !== 'unknown' ? '' : props.children}</>
}
