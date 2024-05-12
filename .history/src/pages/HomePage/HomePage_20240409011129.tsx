import { useSelector } from 'react-redux'
import BannerMain from '../../components/BannerMain'
import { RootState } from '../../reducer/rootReducer'
import { useState } from 'react'
import { createProduct } from '../../apis/product.api'
import axios from 'axios'
import ListCategory from '../../components/Category/ListCategory'
import ProductCart from '../../components/Product/ProductCart'
import ListProduct from '../../components/Product/ListProduct'
import bannerMainImg from '../../assets/big_bn_slide_8da64cdf00984930b0d15d2df8d28679.webp'
import { Link } from 'react-router-dom'
const HomePage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  console.log(isAuthenticated)

  const [image, setImage] = useState<File | string>()
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0])
    }
  }
  const handleUpload = async () => {
    try {
      if (!image) {
        console.error('No image selected')
        return
      }

      const formData = new FormData()
      const variant: any = [
        {
          color: 'red',
          storageCapacity: '65Gb',
          price: 23000000
        }
      ]
      formData.append('image', image)
      formData.append('name', 'iphone 15')
      formData.append('category_id', '1')
      formData.append('available', '50')
      formData.append('discount', '0.05')
      formData.append('price', '23000000')
      formData.append('description', 'description for iphone 15')
      formData.append('variant', JSON.stringify(variant))

      const params = {
        name: 'iphone 15',
        category_id: '1',
        available: 50,
        discount: 0.05,
        price: 23000000,
        description: 'description for iphone 15',
        variant: [
          {
            color: 'red',
            storageCapacity: '65Gb',
            price: 23000000
          }
        ]
      }
      const response = await axios.post('http://localhost:8080/api/admin/products', formData, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MTEzNjYyNzEsImV4cCI6MTcxMTM2OTg3MX0.6cUUxCWH_VLYODJoVI1d1p4NfC92rX1GNuK_1p-GcxU'
        }
      })

      console.log('Upload success:', response.data)
      // Handle response from server here
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  return (
    <div className='container'>
      <BannerMain />
      <ListCategory />
      <div className='my-7 rounded-md overflow-hidden bg-[#cd1817]'>
        <div className='text-center'>
          <img src='https://fptshop.com.vn/Uploads/Originals/2024/3/8/638455174621285140_Dien-thoai%20(2).png' alt='' />
        </div>
        <ListProduct />
        <div className='text-center mb-5'>
          <Link to='/products' className='text-white bg-black py-3 px-5 rounded-md'>
            Xem tất cả
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
