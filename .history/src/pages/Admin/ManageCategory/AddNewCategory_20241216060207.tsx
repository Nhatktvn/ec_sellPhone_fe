import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { addCategory } from '../../../apis/category.api'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCategories } from '../../../apis/category.api'

const AddNewCategory = () => {
  const navigation = useNavigate()
  // const [imageThumbPriview, setImageThumbPreview] = useState<string | ArrayBuffer | null>()
  const [inputName, setInputName] = useState<string>('')
  const [inputDes, setInputDes] = useState<string>('')
  // const [listCate, setListCate] = useState([])
  const [categoryId, setCategoryId] = useState<string>('')
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files && e.target.files[0]
  //   setImage(selectedFile)
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     setImageThumbPreview(reader.result)
  //   }
  //   if (selectedFile) {
  //     reader.readAsDataURL(selectedFile)
  //   }
  // }
  useEffect(() => {
    handleGetAllCate()
  }, [])
  const handleSubmit = async () => {
    try {
      if (!inputName || !inputDes) {
        toast.warning('Vui lòng nhập đầy đủ thông tin')
        return
      }

      const formData: FormData = new FormData()
      formData.append('name', inputName)
      formData.append('description', inputDes)
      // formData.append('image', image)
      console.log(formData)

      const addCate = await addCategory(formData)
      if (addCate && addCate.status === 200) {
        toast.success('Thêm danh mục mới thành công')
        navigation('/admin/manage-categories')
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(categoryId)
  const handleGetAllCate = async () => {
    try {
      const getAllCate = await getAllCategories()
      if (getAllCate.status == 200 && getAllCate.data) {
        setCategoryId(getAllCate.data[0].id)
        // setListCate(getAllCate.data)
        console.log(categoryId)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='my-10 w-[70%] mx-auto'>
      <div className=' grid grid-cols-12 gap-3'>
        <div className='flex flex-col gap-1 col-span-6'>
          <label className='font-medium text-lg' htmlFor='name'>
            Tên:
          </label>
          <input
            placeholder='Nhập tên danh mục...'
            className='border h-8 px-2 border-gray-500 rounded-md'
            type='text'
            id='name'
            name='name'
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        {/* <div className='flex flex-col gap-1 col-span-12'>
          <label className='font-medium text-lg' htmlFor='imageThumb'>
            Image:
          </label>
          <div className='w-full h-[150px] flex justify-center'>
            <label
              className={`cursor-pointer font-medium h-[150px] w-[150px] flex justify-center items-center text-xl rounded-3xl ${!imageThumbPriview && 'border-4 border-dashed'} active:scale-95 duration-100`}
              htmlFor='imageThumb'
            >
              {imageThumbPriview ? (
                <img
                  src={imageThumbPriview as string}
                  alt='Preview'
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              ) : (
                <div className='text-slate-400 text-3xl'>
                  <FaUpload />
                </div>
              )}
            </label>
            <input
              accept='image/*'
              placeholder='Enter available...'
              className='border h-8 px-2 border-gray-500 rounded-md hidden'
              type='file'
              id='imageThumb'
              name='imageThumb'
              onChange={handleImageChange}
              multiple
            />
          </div>
        </div> */}
        <div className='flex flex-col h-max gap-1 col-span-12'>
          <label className='font-medium text-lg' htmlFor='name'>
            Mô tả:
          </label>
          <textarea
            placeholder='Nhập mô tả...'
            className='border px-2 border-gray-500 rounded-md min-h-[200px] py-1'
            id='name'
            name='name'
            value={inputDes}
            onChange={(e) => setInputDes(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='flex gap-5 float-end font-medium my-5'>
        <Link
          to={'/admin/manage-categories'}
          className='min-w-[65px] bg-slate-400 text-white py-3 px-3 rounded-md hover:bg-slate-500 hover:font-bold '
        >
          Hủy
        </Link>
        <button
          className='min-w-[65px] bg-blue-500 text-white py-3 px-3 rounded-md hover:bg-blue-600 hover:font-bold'
          onClick={handleSubmit}
        >
          Thêm
        </button>
      </div>
    </div>
  )
}
export default AddNewCategory
