import { Link } from 'react-router-dom'

function PaymentFail() {
  return (
    <div className='container h-[70vh] flex flex-col justify-center items-center mt-10'>
      <img
        src='https://funtura.in/tvm/wp-content/themes/funtura/assets/images/success.svg'
        className='w-[60%] h-[60%]'
        alt=''
      />
      <h3 className='text-3xl my-3'>Thanh toán thất bại</h3>
      <Link to={'/'} className='bg-blue-600 text-white p-2 rounded-md'>
        Thử lại
      </Link>
    </div>
  )
}

export default PaymentFail