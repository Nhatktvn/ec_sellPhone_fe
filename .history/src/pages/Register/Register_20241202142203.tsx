import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerAccount, sendCodeActive } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { loading } from '../../slices/loadingSlice'
import { emailActive } from '../../slices/activeAccountSlice'
export default function Register() {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const isLoading = useSelector((state: RootState) => state.loading.isLoading)
  const schema = yup
    .object({
      email: yup.string().required('Email không được để trống').email('Email không hợp lệ'),
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
    // setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  // const registerAccountMutation = useMutation({
  //   mutationFn: (body: { email: string; password: string }) => registerAccount(body)
  // })

  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(loading(true))
      const username = data.email
      const password = data.password
      const rs = await registerAccount({ username, password })
      if (rs && rs.status === 201) {
        dispatch(emailActive(username))
        const rsSendCodeActive = await sendCodeActive(username)
        console.log(rsSendCodeActive)

        if (rsSendCodeActive && rsSendCodeActive.status === 200) {
          console.log(rsSendCodeActive)
          toast.success('Active code has been sent to email')
          navigation('/kich-hoat-tai-khoan')
        }
      }
      dispatch(loading(false))
    } catch (error) {
      console.log(error)
      dispatch(loading(false))
    }
  })
  return (
    <div className='bg-[#F5F5F5]'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 lg:py-32 lg:pr-10 lg:mx-0'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                placeholder='Email'
                register={register}
                type='text'
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                placeholder='Password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
              />
              <Input
                name='passwordConfirm'
                placeholder='Confirm Password'
                register={register}
                type='password'
                errorMessage={errors.passwordConfirm?.message}
              />
              <button
                type='submit'
                disabled={!watch().email || !watch().password || !watch().passwordConfirm || isLoading}
                className={`w-full bg-orange text-white py-3 rounded-sm mt-5 flex gap-2 justify-center items-center active:bg-[#e2492b] ${!watch().email || !watch().password || !watch().passwordConfirm ? 'cursor-not-allowed opacity-[0.7]' : isLoading ? 'cursor-not-allowed opacity-[0.7]' : 'hover:opacity-90 cursor-pointer'}`}
              >
                {isLoading && (
                  <span>
                    <svg
                      aria-hidden='true'
                      className='w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-orange'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                  </span>
                )}
                ĐĂNG KÝ
              </button>
              <div className='w-full text-sm flex justify-center gap-5 mt-7'>
                <button className='w-[40%] border border-gray-400 rounded-sm py-2 flex items-center justify-center gap-1 active:bg-gray-200'>
                  <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='30' height='30' viewBox='0 0 48 48'>
                    <path fill='#039be5' d='M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z'></path>
                    <path
                      fill='#fff'
                      d='M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z'
                    ></path>
                  </svg>
                  Facebook
                </button>
                <button className='w-[40%] border active:bg-gray-200 border-gray-400 rounded-sm py-2 flex items-center justify-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className=''
                    x='0px'
                    y='0px'
                    width='30'
                    height='30'
                    viewBox='0 0 48 48'
                  >
                    <path
                      fill='#FFC107'
                      d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                    ></path>
                    <path
                      fill='#FF3D00'
                      d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                    ></path>
                    <path
                      fill='#4CAF50'
                      d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                    ></path>
                    <path
                      fill='#1976D2'
                      d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                    ></path>
                  </svg>
                  Google
                </button>
              </div>
              <div className='text-center text-xs mt-3'>
                <div>Bằng việc đăng kí, bạn đã đồng ý về</div>
                <div>
                  <Link to='/' className='text-orange mx-1'>
                    Điều khoản dịch vụ
                  </Link>
                  &
                  <Link to='' className='text-orange mx-1'>
                    Chính sách bảo mật
                  </Link>
                </div>
              </div>
              <div className='mt-7 text-center text-sm'>
                Bạn đã có tài khoản?
                <Link className='text-orange mx-1' to='/dang-nhap'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
