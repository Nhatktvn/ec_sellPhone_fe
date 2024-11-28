import React, { useState } from 'react'
import { FiPercent, FiDollarSign, FiCalendar, FiClock } from 'react-icons/fi'

const CouponCreationPage = () => {
  const [formData, setFormData] = useState<any>({
    codeCoupon: '',
    typeCoupon: '',
    couponValue: '',
    quantity: '',
    startTime: '',
    endTime: '',
    minimumAmount: ''
  })

  console.log(formData)

  const [errors, setErrors] = useState<any>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    let tempErrors: any = {}
    if (!formData.typeCoupon) tempErrors.typeCoupon = 'Please select a discount type'
    if (!formData.couponValue) {
      tempErrors.couponValue = 'Please enter a discount value'
    } else if (formData.typeCoupon === 'percentage' && (formData.couponValue < 0 || formData.couponValue > 100)) {
      tempErrors.couponValue = 'Percentage must be between 0 and 100'
    }
    if (!formData.quantity || formData.quantity <= 0) {
      tempErrors.quantity = 'Please enter a valid quantity'
    }
    if (!formData.startTime) tempErrors.startTime = 'Please select start time'
    if (!formData.endTime) {
      tempErrors.endTime = 'Please select end time'
    } else if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      tempErrors.endTime = 'End time must be after start time'
    }
    if (!formData.minimumAmount || formData.minimumAmount < 0) {
      tempErrors.minimumAmount = 'Please enter a valid minimum amount'
    }
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
      console.log('Form submitted:', formData)
      // Add API call here
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white shadow-xl rounded-lg p-6 md:p-8 space-y-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Create New Coupon</h2>
            <p className='text-gray-600'>Fill in the details below to create a new coupon</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label htmlFor='typeCoupon' className='block text-sm font-medium text-gray-700'>
                  Discount Type
                </label>
                <select
                  id='typeCoupon'
                  name='typeCoupon'
                  value={formData.typeCoupon}
                  onChange={handleChange}
                  className={`mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition duration-150 ease-in-out ${errors.typeCoupon ? 'border-red-500 ring-red-500' : ''}`}
                  aria-label='Select discount type'
                >
                  <option value=''>Select Type</option>
                  <option value='percentage'>Percentage</option>
                  <option value='fixed'>Fixed Amount</option>
                </select>
                {errors.typeCoupon && (
                  <p className='mt-2 text-sm text-red-600' role='alert'>
                    {errors.typeCoupon}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor='couponValue' className='block text-sm font-medium text-gray-700'>
                  Discount Value
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    {formData.typeCoupon === 'percentage' ? (
                      <FiPercent className='text-gray-400' />
                    ) : (
                      <FiDollarSign className='text-gray-400' />
                    )}
                  </div>
                  <input
                    type='number'
                    name='couponValue'
                    id='couponValue'
                    value={formData.couponValue}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition duration-150 ease-in-out ${errors.couponValue ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder={formData.typeCoupon === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                    aria-label='Enter discount value'
                  />
                </div>
                {errors.couponValue && (
                  <p className='mt-2 text-sm text-red-600' role='alert'>
                    {errors.couponValue}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor='quantity' className='block text-sm font-medium text-gray-700'>
                  Quantity
                </label>
                <input
                  type='number'
                  name='quantity'
                  id='quantity'
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`mt-1 block w-full pl-3 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition duration-150 ease-in-out ${errors.quantity ? 'border-red-500 ring-red-500' : ''}`}
                  placeholder='Enter quantity'
                  aria-label='Enter coupon quantity'
                />
                {errors.quantity && (
                  <p className='mt-2 text-sm text-red-600' role='alert'>
                    {errors.quantity}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor='minimumAmount' className='block text-sm font-medium text-gray-700'>
                  Minimum Amount
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FiDollarSign className='text-gray-400' />
                  </div>
                  <input
                    type='number'
                    name='minimumAmount'
                    id='minimumAmount'
                    value={formData.minimumAmount}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition duration-150 ease-in-out ${errors.minimumAmount ? 'border-red-500 ring-red-500' : ''}`}
                    placeholder='Enter minimum amount'
                    aria-label='Enter minimum amount required'
                  />
                </div>
                {errors.minimumAmount && (
                  <p className='mt-2 text-sm text-red-600' role='alert'>
                    {errors.minimumAmount}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor='startTime' className='block text-sm font-medium text-gray-700'>
                  Start Time
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FiCalendar className='text-gray-400' />
                  </div>
                  <input
                    type='datetime-local'
                    name='startTime'
                    id='startTime'
                    value={formData.startTime}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition duration-150 ease-in-out ${errors.startTime ? 'border-red-500 ring-red-500' : ''}`}
                    aria-label='Select start time'
                  />
                </div>
                {errors.startTime && (
                  <p className='mt-2 text-sm text-red-600' role='alert'>
                    {errors.startTime}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor='endTime' className='block text-sm font-medium text-gray-700'>
                  End Time
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FiClock className='text-gray-400' />
                  </div>
                  <input
                    type='datetime-local'
                    name='endTime'
                    id='endTime'
                    value={formData.endTime}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition duration-150 ease-in-out ${errors.endTime ? 'border-red-500 ring-red-500' : ''}`}
                    aria-label='Select end time'
                  />
                </div>
                {errors.endTime && (
                  <p className='mt-2 text-sm text-red-600' role='alert'>
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>

            <div className='flex items-center justify-center pt-6'>
              <button
                type='submit'
                className='w-full md:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-105'
                aria-label='Create coupon'
              >
                Create Coupon
              </button>
            </div>
          </form>

          {isSubmitted && (
            <div className='mt-4 p-4 rounded-md bg-green-50 border border-green-200'>
              <p className='text-green-600 text-center' role='alert'>
                Coupon created successfully!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CouponCreationPage
