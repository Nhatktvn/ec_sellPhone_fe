import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const AddNewProduct = () => {
  const [listCategory, setListCategory] = useState()
  const [imageThumb, setImageThumb] = useState<string | ArrayBuffer | null>()
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      setImageThumb(reader.result)
    }

    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
  }
  return (
    <div>
      <div>
        <h3>Add new phone</h3>
        <div className='w-[70%] mx-auto grid grid-cols-12 gap-3'>
          <div className='flex flex-col gap-1 col-span-6'>
            <label className='font-medium text-lg' htmlFor='name'>
              Name:
            </label>
            <input
              placeholder='Enter name...'
              className='border h-8 px-2 border-gray-500 rounded-md'
              type='text'
              id='name'
              name='name'
            />
          </div>
          <div className='flex flex-col gap-1 col-span-6'>
            <label className='font-medium text-lg' htmlFor='category'>
              Category:
            </label>
            <select name='category' id='category' className='border  h-8 px-2 border-gray-500 rounded-md'>
              <option value='0'>Select category...</option>
              <option value='1'>Iphone</option>
              <option value='2'>Samsung</option>
              <option value='3'>Xiaomi</option>
            </select>
          </div>
          <div className='flex flex-col gap-1 col-span-4'>
            <label className='font-medium text-lg' htmlFor='price'>
              Price:
            </label>
            <input
              placeholder='Enter price...'
              className='border h-8 px-2 border-gray-500 rounded-md'
              type='number'
              id='price'
              name='price'
            />
          </div>
          <div className='flex flex-col gap-1 col-span-4'>
            <label className='font-medium text-lg' htmlFor='discount'>
              Discount:
            </label>
            <input
              placeholder='Enter discount...'
              className='border h-8 px-2 border-gray-500 rounded-md'
              type='number'
              id='discount'
              name='discount'
            />
          </div>
          <div className='flex flex-col gap-1 col-span-4'>
            <label className='font-medium text-lg' htmlFor='available'>
              Price:
            </label>
            <input
              placeholder='Enter available...'
              className='border h-8 px-2 border-gray-500 rounded-md'
              type='number'
              id='available'
              name='available'
            />
          </div>
          <div className='flex flex-col gap-1 col-span-12'>
            <label className='font-medium text-lg' htmlFor='imageThumb'>
              Image thumb:
            </label>
            <div className='w-full h-[150px] flex justify-center'>
              <label
                className='cursor-pointer font-medium h-[150px] w-[150px] bg-slate-200 flex justify-center items-center text-[40px] rounded-3xl'
                htmlFor='imageThumb'
              >
                {imageThumb ? }<div className='text-slate-400'>+</div>

              </label>
              <input
                accept='image/*'
                placeholder='Enter available...'
                className='border h-8 px-2 border-gray-500 rounded-md hidden'
                type='file'
                id='imageThumb'
                name='imageThumb'
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-5 float-end pr-5 font-medium'>
        <button className='w-[65px] bg-slate-400 text-white py-3 rounded-md hover:bg-slate-500 hover:font-bold '>
          Cancel
        </button>
        <button className='w-[65px] bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 hover:font-bold'>
          Save
        </button>
      </div>
    </div>
  )
}

export default AddNewProduct
