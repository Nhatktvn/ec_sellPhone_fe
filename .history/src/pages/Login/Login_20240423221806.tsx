import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../../components/Input'
import { IconFacebook, IconGoogle } from '../../components/Icon'
import { getRoleAuth, loginAccount } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../slices/authSlice'
import { RootState } from '../../reducer/rootReducer'
import { profileUser } from '../../apis/profile.api'
import { emailActive } from '../../slices/activeAccountSlice'
import { loading } from '../../slices/loadingSlice'
export default function Login() {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const schema = yup
    .object({
      username: yup.string().required('Username không được để trống'),
      password: yup.string().required('Password không được để trống').min(8, 'Mật khẩu phải từ 8 ký tự')
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
      dispatch(loading(true))
      const rs = await loginAccount(data)
      if (rs && rs.status === 200) {
        const accessToken: any = rs.data
        console.log(accessToken)
        localStorage.setItem('accessToken', accessToken)
      }
      const infoUser = await profileUser()
      if (infoUser && infoUser.status === 200) {
        dispatch(login(infoUser.data))
      }
      const rsRole = await getRoleAuth()
      if (rsRole && rsRole.status === 200) {
        const role = rsRole.data
        role === 'ADMIN' ? navigation('/admin/manage-users') : navigation('/')
      }
      toast.success('Đăng nhập thành công')
      dispatch(loading(false))
    } catch (error: any) {
      console.log(error.response)
      if (error.response.status === 403) {
        dispatch(emailActive(data.username))
        navigation('/confirm-active')
      }
      dispatch(loading(false))
    }
  })
  return (
    <div className='bg-[#F5F5F5]'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 lg:py-32 lg:pr-10 lg:mx-0'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='username'
                placeholder='Username'
                register={register}
                type='text'
                errorMessage={errors.username?.message}
              />
              <Input
                name='password'
                placeholder='Password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
              />
              <button
                type='submit'
                disabled={!watch().username || !watch().password}
                className={`w-full p-3 bg-orange text-white font-medium mt-5 rounded-sm active:bg-[#e2492b] ${!watch().username || !watch().password ? 'cursor-not-allowed opacity-[0.7]' : 'cursor-pointer hover:opacity-[0.7]'}`}
              >
                ĐĂNG NHẬP
              </button>
              {/* 'w-full p-3 bg-orange text-white font-medium mt-5 rounded-sm' */}
              <div className='text-xs text-blue-700 mt-3 flex justify-between'>
                <Link to='/forgot-password'>Quên mật khẩu</Link>
              </div>
              <div className='w-full text-sm flex justify-center gap-5 mt-7'>
                <button className='w-[40%] border border-gray-400 rounded-sm py-2 flex items-center justify-center gap-1 active:bg-gray-200'>
                  <IconFacebook />
                  Facebook
                </button>
                <button className='w-[40%] border active:bg-gray-200 border-gray-400 rounded-sm py-2 flex items-center justify-center gap-1'>
                  <IconGoogle />
                  Google
                </button>
              </div>
              <div className='mt-7 text-center text-sm'>
                Bạn chưa có tài khoản?
                <Link className='text-orange mx-1' to='/dang-ki'>
                  Đăng kí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
