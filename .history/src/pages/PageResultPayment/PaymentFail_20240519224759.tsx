import { Link } from 'react-router-dom'

function PaymentFail() {
  return (
    <div className='container h-[70vh] mt-10'>
      <div className='w-[20vw] h-[20vh]'>
        <img
          src='https://static-00.iconduck.com/assets.00/process-error-icon-512x512-zmcympnc.png'
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
