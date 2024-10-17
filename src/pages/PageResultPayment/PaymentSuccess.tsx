import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <div className='container h-[70vh] flex flex-col justify-center items-center mt-10'>
      <img
        src='https://funtura.in/tvm/wp-content/themes/funtura/assets/images/success.svg'
        className='w-[60%] h-[60%]'
        alt=''
      />
      <h3 className='text-3xl my-3'>Thanh toán thành công</h3>
      <Link to={'/'} className='bg-blue-600 text-white p-2 rounded-md'>
        Tiếp tục mua hàng
      </Link>
    </div>
  )
}

export default PaymentSuccess
