import React from 'react'
import ReactDOM from 'react-dom'
import { IoIosWarning } from 'react-icons/io'

interface props {
  setShowModal: any
  // showModal: boolean
  // handleDelete: () => void
}
function ModalListCoupon(props: props) {
  return (
    <div className='w-[100vw] h-[100vh] fixed top-0 right-0 left-0 z-50 bg-slate-400/50'>
      <div id='popup-modal' tabIndex={-1} className='flex z-50 justify-center items-center w-[100vw] h-[100vh]'>
        <div className='relative  p-4 max-w-md max-h-full'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button
              // onClick={() => props.setShowModal(!props.showModal)}
              type='button'
              className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='popup-modal'
            >
              <svg
                className='w-3 h-3 font-bold'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='p-4 md:p-5 text-center'>
              <IoIosWarning className='text-6xl text-[#ffc107] mx-auto' />
              <h3 className='mb-5 text-lg font-bold text-gray-500 dark:text-gray-400'>
                Số lượng của sản phẩm trong giỏ hàng vượt quá trong kho. Vui lòng kiểm tra lại!
              </h3>
              <button
                // onClick={() => {
                //   props.setShowModal(!props.showModal)
                // }}
                data-modal-hide='popup-modal'
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-400 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
              >
                Tiếp tục
              </button>
              <button
                // onClick={() => props.setShowModal(!props.showModal)}
                data-modal-hide='popup-modal'
                type='button'
                className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalListCoupon