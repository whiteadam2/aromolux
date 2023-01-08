import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { setCurrentPage } from '../redux/viewSlice'
import classNames from 'classnames'
import PaginationRC from 'rc-pagination'

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch()
  const { currentPage, pageSize, totalCount } = useAppSelector(
    (state) => state.view
  )
  return (
    <>
      {totalCount > pageSize && (
        <div className="flex justify-center mt-12 mb-20 ">
          <PaginationRC
            className="flex flex-wrap gap-4"
            itemRender={(page, type, element) => {
              const style = classNames(
                'h-10 w-10 rounded-full cursor-pointer flex justify-center items-center select-none',
                {
                  'bg-amber-400 opacity-60 hover:opacity-100':
                    page !== currentPage || type === 'next',
                  'bg-amber-800 text-white':
                    page === currentPage && type !== 'next'
                }
              )

              switch (type) {
                case 'page':
                  return <div className={style}>{page}</div>
                case 'prev':
                  return <div className={style}>&lt;</div>
                case 'next':
                  return <div className={style}>&gt;</div>
                case 'jump-prev':
                case 'jump-next':
                  return <span>...</span>
                default:
              }
              return element
            }}
            pageSize={pageSize}
            current={currentPage}
            total={totalCount}
            onChange={(page) => dispatch(setCurrentPage(page))}
          />
        </div>
      )}
    </>
  )
}
