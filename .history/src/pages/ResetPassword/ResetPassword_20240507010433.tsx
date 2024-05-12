import { IoMdArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../reducer/rootReducer'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import { resetPassword } from '../../apis/auth.api'
import { emailForgot } from '../../slices/forgotPasswordSlice'
import { toast } from 'react-toastify'
const ResetPassword = () => {
  const emailForgotPassword = useSelector((state: RootState) => state.forgotPassword.email)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const navigation = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!emailForgotPassword) {
      navigation('/quen-mat-khau')
    }
  }, [])
  const schema = yup
    .object({
      codeReset: yup.string().required('Mã đặt lại không được để trống').length(6, 'Mã đặt lại phải đủ 6 kí tự'),
      password: yup.string().required('Password không được để trống').min(8, 'Mật khẩu phải từ 8 ký tự'),
      passwordConfirm: yup
        .string()
        .required('Password không được để trống')
        .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
    })
    .required()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const dataBody = { codeReset: data.codeReset, email: emailForgotPassword, password: data.password }
      const rs = await resetPassword(dataBody)
      if (rs && rs.status === 200) {
        dispatch(emailForgot(''))
        toast.success('Lấy lại mật khẩu thành công. Vui lòng đăng nhập lại!')
        navigation('/login')
      }
    } catch (error: any) {
      console.log(error)
    }
  })
  return (
    <div className='flex items-center justify-center '>
      <div className='bg-white py-5 px-20 my-20 shadow-md relative'>
        <Link to={'/login'}>
          <IoMdArrowRoundBack className='absolute top-4 left-5 text-4xl text-orange cursor-pointer' />
        </Link>

        <h3 className='text-xl text-center'>Đặt lại mật khẩu</h3>
        <form onSubmit={onSubmit} className='my-5 w-[300px]'>
          <Input
            name='codeReset'
            placeholder='Nhập mã xác thực'
            register={register}
            type='text'
            errorMessage={errors.codeReset?.message}
          />
          <Input
            name='password'
            placeholder='Nhập mật khẩu mới'
            register={register}
            type='password'
            errorMessage={errors.password?.message}
          />
          <Input
            name='passwordConfirm'
            placeholder='Nhập lại mật khẩu mới'
            register={register}
            type='password'
            errorMessage={errors.passwordConfirm?.message}
          />
          <button type='submit' className='w-full bg-orange text-white py-3 rounded-sm mt-5'>
            Tiếp theo
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
