import React, { useState } from 'react'
import { Input } from './Input'
import { MainButton } from './MainButton'
import { IBotOrder, ICart } from '../@types'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { processOrder } from '../redux/sendOrderSlice'
import { Alert } from './Alert'

interface UserFormProps {
  cart: ICart
}

export const UserForm: React.FC<UserFormProps> = ({ cart }) => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const dispatch = useAppDispatch()
  const { isPending, error } = useAppSelector((state) => state.botOrder)

  async function handleMainButtonClick(): Promise<void> {
    if (name === '' || phoneNumber === '') return

    const botOrder: IBotOrder = {
      cart,
      user: {
        name,
        phoneNumber
      }
    }

    const tgApp = window.Telegram.WebApp
    const queryId = tgApp.initDataUnsafe?.query_id

    if (queryId !== undefined) {
      dispatch(processOrder(botOrder, queryId))
        .then(() => tgApp.close())
        .catch((e) => console.log(e))
    }
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
        disabled={isPending}
      />
      {error !== null && <Alert message={error.message} />}
    </>
  )
}
