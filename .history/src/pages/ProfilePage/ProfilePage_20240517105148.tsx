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
    <div className='container'>
      <div>
        <h3>Thông tin cá nhân</h3>
      </div>
    </div>
  )
}

export default ProfilePage
