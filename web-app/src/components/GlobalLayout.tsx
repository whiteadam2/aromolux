import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export const GlobalLayout: React.FC = () => {
  useEffect(() => {
    window.Telegram.WebApp.ready()
  }, [])
  return (
    <div className="pt-10">
      <div className="container max-w-screen-md m-auto font-sans">
        <Outlet />
      </div>
    </div>
  )
}