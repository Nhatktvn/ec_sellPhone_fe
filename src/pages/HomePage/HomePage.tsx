import { useSelector } from 'react-redux'
import BannerMain from '../../components/BannerMain'
import { RootState } from '../../reducer/rootReducer'
import { useState } from 'react'
import { createProduct } from '../../apis/product.api'
import axios from 'axios'
import ListCategory from '../../components/Category/ListCategory'
import ProductCart from '../../components/Product/ProductCard'
import ListProduct from '../../components/Product/ListProduct'
import { Link } from 'react-router-dom'
const HomePage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return (
    <div>
      <BannerMain />
      <ListCategory />
      <div className='container my-7 rounded-md overflow-hidden bg-[#cd1817]'>
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
