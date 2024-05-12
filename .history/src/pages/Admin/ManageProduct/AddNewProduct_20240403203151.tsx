import React from 'react'

const AddNewProduct = () => {
  return (
    <div>
      <div>
        <h3>Add new phone</h3>
        <div>
          <div className='flex'>
            <label htmlFor='name'>Name: </label>
            <input className='border p-2 border-gray-500' type='text' id='name' name='name' />
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
