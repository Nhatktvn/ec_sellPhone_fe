import React from 'react'

const AddNewProduct = () => {
  return (
    <div>
      <div>Content</div>
      <div className='flex gap-5 float-end'>
        <button className='w-[65px] bg-slate-400 text-white py-2 px-3 rounded-md'>Cancel</button>
        <button className='bg-blue-600 text-white py-2 px-3 rounded-md'>Save</button>
      </div>
    </div>
  )
}

export default AddNewProduct
