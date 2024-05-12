import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TiDelete } from 'react-icons/ti'
import { FaPlus } from 'react-icons/fa'
interface variant {
  color: string
  storageCapacity: string
  price: number
}
const AddNewProduct = () => {
  const [listCategory, setListCategory] = useState()
  const [isInputVariant, setIsInputVariant] = useState(false)
  const [isInputImage, setIsInputImage] = useState(false)
  const [listVariant, setListVariant] = useState<variant[]>([
    { color: 'Titan Xanh', storageCapacity: '256GB', price: 29890000 },
    { color: 'Titan Xanh', storageCapacity: '512GB', price: 36990000 },
    { color: 'Titan Xanh', storageCapacity: '1TB', price: 41990000 }
  ])
  const [newVariant, setNewVariant] = useState<variant>({ color: '', storageCapacity: '', price: 0 })
  const [imageThumb, setImageThumb] = useState<string | ArrayBuffer | null>()
  const [listImageData, setListImageData] = useState<File[]>([])
  const [listImagePreview, setListImagePreview] = useState<string[] | ArrayBuffer[]>([])

  const handleAddImageList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (selectedFile) setListImageData((prevImages) => [...prevImages, selectedFile])
    const reader = new FileReader()
    reader.onload = () => {
      const arrImagePriview: any = [...listImagePreview, reader.result]
      setListImagePreview(arrImagePriview)
    }
    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
    setIsInputImage(false)
  }
  console.log(listImageData)
  console.log(listImagePreview)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      console.log(reader.result)
      setImageThumb(reader.result)
    }
    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleCreateVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewVariant((prevNewVariant) => ({
      ...prevNewVariant,
      [name]: value
    }))
  }

  const handleAddListVariant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newVariant.color === '' || newVariant.storageCapacity === '' || newVariant.price == 0) {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }

    setListVariant((prevData) => {
      if (prevData && prevData.length > 0) {
        return [...prevData, newVariant]
      } else {
        return [newVariant]
      }
    })
  }

  const handleRemoveVariant = (idx: number) => {
    console.log(idx)
    const arrayTmp: variant[] = listVariant
    arrayTmp.splice(idx, 1)
    setListVariant([...arrayTmp])
  }

  return (
    <div className='my-10 w-[70%] mx-auto'>
      <div className=' grid grid-cols-12 gap-3'>
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
              {imageThumb ? (
                <img src={imageThumb as string} alt='Preview' style={{ maxWidth: '150px', maxHeight: '150px' }} />
              ) : (
                <div className='text-slate-400'>+</div>
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
            />
          </div>
        </div>

        <div className='flex flex-col gap-1 col-span-12'>
          <label className='font-medium text-lg' htmlFor=''>
            List Image:
          </label>
          <div className='w-full h-[150px]'>
            {listImagePreview &&
              listImagePreview.length > 0 &&
              listImagePreview.map((image, idx) => {
                return (
                  <div className='w-full h-[150px]'>
                    <label
                      className='cursor-pointer font-medium h-[150px] w-[150px] bg-slate-200 flex justify-center items-center text-[40px] rounded-3xl'
                      htmlFor='imageThumb'
                    >
                      <img src={image as string} alt='Preview' style={{ maxWidth: '150px', maxHeight: '150px' }} />
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
                )
              })}
            {!isInputImage ? (
              <div
                className='w-10 h-10 border-2 text-gray-400 border-dashed border-gray-400 rounded-md flex justify-center items-center text-xl cursor-pointer'
                onClick={() => setIsInputImage(true)}
              >
                <FaPlus />
              </div>
            ) : (
              <div className='w-full h-[150px] flex justify-center'>
                <label
                  className='cursor-pointer font-medium h-[150px] w-[150px] bg-slate-200 flex justify-center items-center text-[40px] rounded-3xl'
                  htmlFor='imageList'
                >
                  <div className='text-slate-400'>+</div>
                </label>
                <input
                  accept='image/*'
                  placeholder='Enter available...'
                  className='border h-8 px-2 border-gray-500 rounded-md hidden'
                  type='file'
                  id='imageList'
                  name='imageList'
                  onChange={handleAddImageList}
                />
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-1 col-span-12'>
          <label className='font-medium text-lg' htmlFor='variant'>
            Variant:
          </label>
          <div className='w-full flex gap-2 items-center'>
            {listVariant &&
              listVariant.map((variant, idx) => {
                return (
                  <div className='border-2 p-2 rounded-md relative group hover:border-orange duration-150' key={idx}>
                    <button
                      className='text-red-600 font-bold p-1 absolute hidden group-hover:block -top-1 -right-1 text-2xl'
                      onClick={() => handleRemoveVariant(idx)}
                    >
                      <TiDelete />
                    </button>
                    <table>
                      <tr>
                        <span className='font-medium'>Color:</span>
                        <td>{variant.color}</td>
                      </tr>
                      <tr>
                        <span className='font-medium'>Storage:</span>
                        <td>{variant.storageCapacity}</td>
                      </tr>
                      <tr>
                        <span className='font-medium'>Price:</span>
                        <td>{formatToVND(variant.price)}</td>
                      </tr>
                    </table>
                  </div>
                )
              })}
            {!isInputVariant ? (
              <div
                className='w-10 h-10 border-2 border-dashed text-gray-400 border-gray-400 rounded-md flex justify-center items-center text-xl cursor-pointer'
                onClick={() => setIsInputVariant(true)}
              >
                <FaPlus />
              </div>
            ) : (
              <form
                onSubmit={handleAddListVariant}
                className='w-max border-2 border-orange rounded-md flex flex-col gap-1 p-2 relative'
              >
                <button
                  className='text-red-600 font-bold text-2xl absolute top-0 right-0'
                  onClick={() => setIsInputVariant(false)}
                >
                  <TiDelete />
                </button>
                <input
                  className='w-[150px] p-1'
                  type='text'
                  value={newVariant.color}
                  name='color'
                  placeholder='Enter color...'
                  onChange={handleCreateVariant}
                />
                <input
                  className='w-[150px] p-1'
                  type='text'
                  value={newVariant.storageCapacity}
                  name='storageCapacity'
                  placeholder='Enter storage...'
                  onChange={handleCreateVariant}
                />
                <input
                  className='w-[150px] p-1'
                  type='number'
                  value={newVariant.price || ''}
                  name='price'
                  placeholder='Enter price...'
                  onChange={handleCreateVariant}
                />
                <button type='submit' className='bg-red-500 hidden'>
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className='flex gap-5 float-end font-medium my-5'>
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
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
export default AddNewProduct
