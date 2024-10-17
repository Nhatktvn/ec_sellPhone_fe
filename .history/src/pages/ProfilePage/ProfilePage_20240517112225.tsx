import { useEffect, useState } from 'react'
import { getProfile } from '../../apis/profile.api'
import { User } from '../../types/user.type'
import { Link } from 'react-router-dom'

function ProfilePage() {
  const [profileUser, setProfileUser] = useState<User>()
  useEffect(() => {
    handleGetProfile()
  }, [])

  const handleGetProfile = async () => {
    try {
      const rsFetch = await getProfile()
      if (rsFetch && rsFetch.status === 200) {
        setProfileUser(rsFetch.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container w-[60%]'>
      <div className='bg-white p-3 mt-5'>
        <h3 className='text-xl'>Thông tin cá nhân</h3>
        <div className='grid grid-cols-12'>
          <div className='col-span-5 flex items-center flex-col'>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src='https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg'
                alt=''
              />
            </div>
            <div className='w-max text-sm'>
              <Link className='button block bg-orange p-2 text-center text-white mb-2 rounded-md' to={'/'}>
                Cập nhật thông tin
              </Link>
              <Link className='block bg-blue-600 p-2 text-center text-white rounded-md' to={'/'}>
                Đổi mật khẩu
              </Link>
            </div>
          </div>
          <div className='col-span-7'>
            <div>
              <h3 className='text-gray-400 text-xl font-semibold'>Tên</h3>
              <p>{profileUser?.fullname || 'chưa cập nhật'}</p>
            </div>
            <div>
              <h3 className='text-gray-400 text-xl font-semibold'>Email</h3>
              <p>{profileUser?.email || 'chưa cập nhật'}</p>
            </div>
            <div>
              <h3 className='text-gray-400 text-xl font-semibold'>Số điện thoại</h3>
              <p>{profileUser?.fullname || 'chưa cập nhật'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
