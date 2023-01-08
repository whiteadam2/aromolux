import React from 'react'
import { useAppSelector } from '../hooks/redux'
import { OrdersList } from './OrdersList'
import { UserForm } from './UserForm'

export const Cart: React.FC = () => {
  const cart = useAppSelector((state) => state.cart)

  return (
    <div className="mx-10 ">
      <OrdersList cart={cart} />
      <UserForm cart={cart} />
    </div>
  )
}
