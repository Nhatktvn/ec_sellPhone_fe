import { useEffect, useState } from 'react'
import { getProfile } from '../../apis/profile.api'
import { User } from '../../types/user.type'
import { Link } from 'react-router-dom'

function ProfilePage() {
  const [profileUser, setProfileUser] = useState<User>()
  useEffect(() => {
    handleGetProfile()
  })

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
          <div className='col-span-5'>
            <div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src='https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg'
                alt=''
              />
            </div>
            <Link to={'/'}>Cập nhật thông tin</Link>
            <Link className='block' to={'/'}>
              Đổi mật khẩu
            </Link>
          </div>
          <div className='col-span-7'>Thông tin</div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
