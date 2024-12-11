import Password from 'antd/es/input/Password'
import { useState } from 'react'
import { updateUser } from '../../apis/user.api'
import { toast } from 'react-toastify'
import { updateCategoryById } from '../../apis/category.api'

interface props {
  setShowModal: any
  showModal: boolean
  dataUser: any
  fetchGetData: () => void
}
const ModalUpdateCate = (props: props) => {
  console.log(props.dataUser)
  const [formData, setFormData] = useState({
    username: props.dataUser.username,
    phone: props.dataUser.phone,
    email: props.dataUser.email,
    fullName: props.dataUser.fullName
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Cập nhật giá trị của trường tương ứng trong formData
    setFormData((prevData) => ({
      ...prevData,
      [name]: value // Cập nhật trường tương ứng trong formData
    }))
  }
  const handleUpdateCate = async () => {
    try {
      const fetchDataUpdate = await updateCategoryById({
        id: props.dataUser.id,
        name: props.dataUser.name,
        description: props.dataUser.description
      })
      if (fetchDataUpdate && fetchDataUpdate.status == 200) {
        console.log(fetchDataUpdate)
        toast.success('Cập nhật thành công')
        props.fetchGetData()
      }
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
              <div className='p-4 md:p-5 text-center w-full flex flex-col items-center'>
                <h3 className='mb-5 text-xl text-blue-500 font-bold dark:text-blue-400 '>CẬP NHẬT THÔNG TIN</h3>
                <div className='w-full'>
                  <div className='flex flex-col gap-1 items-start w-full mb-3'>
                    <label htmlFor='username'>Tên danh mục:</label>
                    <input
                      type='text'
                      name='name'
                      className='border border-gray-300 py-2 px-2 rounded-md w-full'
                      defaultValue={formData.username}
                      disabled
                      readOnly
                    />
                  </div>
                  <div className='flex flex-col gap-1 items-start w-full mb-3'>
                    <label htmlFor='username'>Mô tả:</label>
                    <input
                      type='text'
                      name='description'
                      className='border border-gray-300 py-2 px-2 rounded-md w-full'
                      defaultValue={formData.fullName}
                      placeholder='Chưa cập nhật'
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='flex flex-col gap-1 items-start w-full mb-3'>
                    <label htmlFor='email'>Email:</label>
                    <input
                      type='text'
                      name='email'
                      className='border border-gray-300 py-2 px-2 rounded-md w-full'
                      defaultValue={formData.email}
                      placeholder='Chưa cập nhật'
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='flex flex-col gap-1 items-start w-full mb-3'>
                    <label htmlFor='username'>Số điện thoại:</label>
                    <input
                      type='text'
                      name='phone'
                      className='border border-gray-300 py-2 px-2 rounded-md w-full'
                      defaultValue={formData.phone}
                      placeholder='Chưa cập nhật'
                      onChange={handleInputChange}
                    />
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

export default ModalUpdateCate
