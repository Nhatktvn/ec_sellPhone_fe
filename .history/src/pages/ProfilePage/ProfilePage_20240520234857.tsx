import { useEffect, useState } from 'react'
import { getProfile } from '../../apis/profile.api'
import { User } from '../../types/user.type'
import { Link } from 'react-router-dom'

function ProfilePage() {
  const [profileUser, setProfileUser] = useState<User>()
  const [selectedChange, setSelectedChange] = useState<boolean>(false)
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
        <h3 className='text-2xl'>Thông tin cá nhân</h3>
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
              {selectedChange ? (
                <div>
                  <button>Lưu</button>
                  <button onClick={() => setSelectedChange(false)}>Hủy</button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedChange(true)}
                  className='button block bg-orange p-2 text-center text-white mb-2 rounded-md'
                >
                  Cập nhật thông tin
                </button>
              )}

              <Link className='block bg-blue-600 p-2 text-center text-white rounded-md' to={'/'}>
                Đổi mật khẩu
              </Link>
            </div>
          </div>
          <div className='col-span-7 flex flex-col gap-2'>
            <div>
              <h3 className='text-gray-500 text-xl font-semibold'>Tên</h3>
              {profileUser?.fullname ? <p>{profileUser.fullname}</p> : <p className='text-red-600'>chưa cập nhật</p>}
            </div>
            <div>
              <h3 className='text-gray-500 text-xl font-semibold'>Email</h3>
              {selectedChange ? <input defaultValue={profileUser?.email} type='text' className='blockw-max' /> : ''}
              {profileUser?.email ? <p>{profileUser.email}</p> : <p className='text-red-600'>chưa cập nhật</p>}
            </div>
            <div>
              <h3 className='text-gray-500 text-xl font-semibold'>Số điện thoại</h3>
              {profileUser?.phone ? <p>{profileUser.phone}</p> : <p className='text-red-600'>chưa cập nhật</p>}
            </div>
            <div>
              <h3 className='text-gray-500 text-xl font-semibold'>Ngày sinh</h3>
              {profileUser?.birthDate ? <p>{profileUser.birthDate}</p> : <p className='text-red-600'>chưa cập nhật</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
