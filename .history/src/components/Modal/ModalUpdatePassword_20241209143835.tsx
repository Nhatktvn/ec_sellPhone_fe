import { useState } from 'react'
import { toast } from 'react-toastify'

interface props {
  setShowModal: any
  showModal: boolean
}
const ModalUpdatePassword = (props: props) => {
  const [password, setPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [errorPassword, setErrorPassword] = useState<string>('')

  const handleUpdateCate = async () => {
    try {
    } catch (error) {
      toast.error('Cập nhật không thành công')
      console.log(error)
    }
  }
  return (
    <div>
      <div className='w-[100vw] h-[100vh] fixed top-0 right-0 left-0 z-50 bg-slate-400/50'>
        <div id='popup-modal' tabIndex={-1} className='flex z-50 justify-center items-center w-[100vw] h-[100vh]'>
          <div className='relative  p-4 w-[500px] max-h-full '>
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
              {/* <button
                onClick={() => props.setShowModal(!props.showModal)}
                type='button'
                className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='popup-modal'
              >
                <svg
                  className='w-3 h-3'
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
              </button> */}
              <div className=''>
                <h3 className=''>ĐỔI MẬT KHẨU</h3>
                <div>
                  <div className='relative z-0 w-full mb-5 group'>
                    <input
                      type='password'
                      name='floating_password'
                      id='floating_password'
                      className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor='floating_password'
                      className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Mật khẩu cũ
                    </label>
                  </div>
                  <div className='relative z-0 w-full mb-5 group'>
                    <input
                      type='password'
                      name='new_password'
                      id='floating_password'
                      className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label
                      htmlFor='new_password'
                      className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Mật khẩu mới
                    </label>
                  </div>
                  <div className='relative z-0 w-full mb-5 group'>
                    <input
                      type='password'
                      name='renew_password'
                      id='floating_repeat_password'
                      className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required
                      onChange={(e) => {
                        if (e.target.value !== newPassword) {
                          setErrorPassword('Mật khẩu không khớp')
                          return
                        }
                        setErrorPassword('')
                      }}
                    />
                    <label
                      htmlFor='renew_password'
                      className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Nhập lại mật khẩu
                    </label>
                    {errorPassword}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      props.setShowModal(!props.showModal)
                      handleUpdateCate()
                    }}
                    data-modal-hide='popup-modal'
                    type='button'
                    className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => props.setShowModal(!props.showModal)}
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
      </div>
    </div>
  )
}

export default ModalUpdatePassword
