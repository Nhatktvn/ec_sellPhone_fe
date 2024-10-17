import { Link } from 'react-router-dom'

function PaymentFail() {
  return (
    <div className='container h-[70vh] flex flex-col justify-center items-center mt-10'>
      <div className='w-[20vw] h-[20vh]'>
        <img
          src='https://static-00.iconduck.com/assets.00/alert-error-icon-2048x2048-e7e48aks.png'
          className=''
          alt=''
        />
      </div>
      <h3>Thanh toán thất bại</h3>
      <Link to={'/gio-hang'}>Thử lại</Link>
      <Link to={'/'}>Trang chủ</Link>
    </div>
  )
}

export default PaymentFail
