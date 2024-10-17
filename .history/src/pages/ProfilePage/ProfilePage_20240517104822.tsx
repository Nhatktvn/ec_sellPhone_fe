import { useEffect } from 'react'
import { getProfile } from '../../apis/profile.api'

function ProfilePage() {
  useEffect(() => {
    handleGetProfile()
  })

  const handleGetProfile = async () => {
    try {
      const rsFetch = await getProfile()
      if (rsFetch) {
        console.log(rsFetch)
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
