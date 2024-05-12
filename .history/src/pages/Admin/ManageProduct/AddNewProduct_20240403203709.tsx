import React from 'react'

const AddNewProduct = () => {
  return (
    <div>
      <div>
        <h3>Add new phone</h3>
        <div className='w-[70%] mx-auto grid grid-cols-12 gap-3'>
          <div className='flex flex-col gap-2 col-span-6'>
            <label className='font-medium' htmlFor='name'>
              Name:{' '}
            </label>
            <input className='border p-2 border-gray-500 rounded-md' type='text' id='name' name='name' />
          </div>
          <div className='flex flex-col gap-2 col-span-6'>
            <label className='font-medium' htmlFor='name'>
              Category:
            </label>
            <select name='' id=''></select>
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