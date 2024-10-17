import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <div className='container h-[70vh] flex flex-col justify-center items-center mt-10'>
      <img
        src='https://funtura.in/tvm/wp-content/themes/funtura/assets/images/success.svg'
        className='w-[60%] h-[60%]'
        alt=''
      />
      <div className='mt-3'>
        <h3 className='text-3xl'>Thanh toán thành công</h3>
      </div>
      <Link to={'/'}>Tiếp tục mua hàng</Link>
    </div>
  )
}

export default PaymentSuccess
