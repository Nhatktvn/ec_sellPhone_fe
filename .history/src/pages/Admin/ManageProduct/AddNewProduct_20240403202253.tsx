import React from 'react'

const AddNewProduct = () => {
  return (
    <div>
      <div>Content</div>
      <div className='flex gap-5 float-end pr-5 font-medium'>
        <button className='w-[65px] bg-slate-400 text-white py-2 px-3 rounded-md '>Cancel</button>
        <button className='w-[65px] bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600'>Save</button>
      </div>
    </div>
  )
}

export default AddNewProduct
