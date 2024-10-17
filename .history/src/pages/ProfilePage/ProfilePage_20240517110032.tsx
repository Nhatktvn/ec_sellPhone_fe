import { useEffect, useState } from 'react'
import { getProfile } from '../../apis/profile.api'
import { User } from '../../types/user.type'

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
        <div className='bg-gray-300 grid grid-cols-12'>
          <div className='col-span-5'>
            <div className='w-[200px] h-[200px]'>
              <img src='../../assets/avater-user.jpg' alt='' />
            </div>
          </div>
          <div className='col-span-7'>Thông tin</div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
