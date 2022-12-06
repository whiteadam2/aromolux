import React, { useState } from 'react'
import { Input } from './Input'
import { MainButton } from './MainButton'
import { sendToShop, sendToBot } from '../api/sendOrders'
import { IOrder } from '../@types'

interface UserFormProps {
  orders: IOrder[]
}

export const UserForm: React.FC<UserFormProps> = ({ orders }) => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  async function handleMainButtonClick(): Promise<void> {
    if (name === '' || phoneNumber === '') return

    const data = orders.map((order) => ({
      productId: order.id,
      quantity: order.count
    }))

    const tgApp = window.Telegram.WebApp
    const queryId = tgApp.initDataUnsafe?.query_id

    if (queryId !== undefined) {
      await sendToShop(data, name, phoneNumber)
      await sendToBot(orders, queryId)
    }

    tgApp.close()
  }

  return (
    <>
      <div className="flex flex-col gap-4 mt-6 mb-28">
        <h2 className="text-center text-xl">Заполните свои данные</h2>
        <Input
          isFocused={true}
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Телефон"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <MainButton
        label={'Подтвердить заказ!'}
        onClick={handleMainButtonClick}
      />
    </>
  )
}
