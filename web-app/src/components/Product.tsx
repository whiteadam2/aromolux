import React from 'react'
import { IProduct, IOrder } from '../@types'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { addProduct, removeProduct } from '../redux/cartSlice'

interface ProductProps {
  data: IProduct
}

export const Product: React.FC<ProductProps> = ({ data }) => {
  const dispatch = useAppDispatch()

  const orders = useAppSelector((state) => state.cart.orders)
  const productInCart = orders.find((order: IOrder) => order.id === data.id)

  const handleClickAdd = (data: IProduct): void => {
    dispatch(addProduct(data))
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium')
  }

  const handleClickRemove = (id: string): void => {
    dispatch(removeProduct(id))
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium')
  }

  return (
    <div className="flex flex-col items-center w-40">
      <h2 className="h-16 text-center text-base font-normal leading-tight">
        {data.name}
      </h2>
      <div className="w-40 h-40 relative border-solid border-2 border-amber-400 rounded-md">
        <img src={data.picture} alt={data.name} className="rounded-md" />
        {productInCart != null && (
          <div className="absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-red-400 flex justify-center items-center text-white shadow-md">
            {productInCart.count}
          </div>
        )}
      </div>
      <p className="my-4 flex w-full px-1 justify-between">
        <span className="line-through">{data.oldprice} руб.</span>
        <span className="text-red-400 font-semibold">{data.price} руб.</span>
      </p>
      {productInCart != null
        ? (
        <div className="flex justify-center gap-x-2">
          <div
            className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
            select-none text-white bg-red-500 text-xl font-normal rounded-xl"
            onClick={() => handleClickRemove(data.id)}
          >
            &minus;
          </div>
          <div
            className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
            select-none text-white bg-blue-500 text-xl font-normal rounded-xl"
            onClick={() => handleClickAdd(data)}
          >
            +
          </div>
        </div>
          )
        : (
        <div
          className="px-4 py-1.5 flex justify-center items-center shadow-md cursor-pointer
           select-none text-white bg-blue-500 text-xl font-normal rounded-xl"
          onClick={() => handleClickAdd(data)}
        >
          В корзину
        </div>
          )}
    </div>
  )
}
