import { Link } from 'react-router-dom'

function PaymentFail() {
  return (
    <div className='container h-[70vh] flex flex-col justify-center items-center mt-10'>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuwDbBZUYxZ94YJFjkEFq2mI6fZINkt2PP0Zd3H6LTg&s'
        className='w-[60%] h-[60%]'
        alt=''
      />
      <h3 className='text-3xl my-3'>Thanh toán thất bại</h3>
      <Link to={'/gio-hang'} className='bg-blue-600 text-white p-2 rounded-md'>
        Thử lại
      </Link>
    </div>
  )
}

export default PaymentFail
