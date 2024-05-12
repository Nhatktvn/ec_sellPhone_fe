import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  return (
    <div className='flex items-center justify-center '>
      <div className='bg-white py-5 px-20 my-20 shadow-md relative'>
        <Link to={'/login'}>
          <IoMdArrowRoundBack className='absolute top-4 left-5 text-4xl text-orange cursor-pointer' />
        </Link>

        <h3 className='text-xl text-center'>Đặt lại mật khẩu</h3>
        <form className='my-5 w-[300px]'>
          <input type='text' placeholder='Email/Số điện thoại' className='text-sm w-full rounded-sm border p-3' />
          <button type='submit' className='w-full bg-orange text-white py-3 rounded-sm mt-5'>
            Tiếp theo
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
