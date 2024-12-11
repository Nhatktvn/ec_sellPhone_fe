import React, { useState } from 'react'
import axios from 'axios'

const UploadImage = () => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0])
  }

  const handleImageUpload = async () => {
    if (!image) return
    try {
      setUploading(true)

      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'reactTest') // Thay YOUR_UPLOAD_PRESET bằng upload preset của bạn
      formData.append('api_key', '496953981567327') // Thay YOUR_API_KEY bằng api key của bạn

      // Gửi yêu cầu POST lên Cloudinary
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dzjpaoyds/image/upload`, formData)

      setUploading(false)
      setUploadedImageUrl(response.data.secure_url) // Địa chỉ URL của ảnh đã upload
      alert('Image uploaded successfully')
    } catch (error) {
      setUploading(false)
      console.error('Error uploading image', error)
      alert('Failed to upload image')
    }
  }

  return (
    <div>
      <h2>Upload Image to Cloudinary</h2>
      <input type='file' onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>

      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImageUrl} alt='Uploaded' style={{ width: '300px' }} />
        </div>
      )}
    </div>
  )
}

export default UploadImage
