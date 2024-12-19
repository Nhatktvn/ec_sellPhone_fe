import { useSelector } from 'react-redux'
import BannerMain from '../../components/BannerMain'
import { RootState } from '../../reducer/rootReducer'
import ListProduct from '../../components/Product/ListProduct'
import { Link } from 'react-router-dom'
import HistoryView from '../../components/HistoryView'
import RecommendProduct from '../../components/RecommendProduct'
import CouponList from '../../components/Coupon'
import ListProductHome from '../../components/ListProHomeByCate/ListProductHome'
import { useEffect, useState } from 'react'
import { getAllCategories } from '../../apis/category.api'
const HomePage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const [listCate, setListCate] = useState<any[]>([])
  useEffect(() => {
    getListCate()
  }, [])
  console.log(listCate)
  const getListCate = async () => {
    const fetchGetCates = await getAllCategories()
    if (fetchGetCates && fetchGetCates.status == 200) {
      setListCate(fetchGetCates.data)
    }
  }
  return (
    <div>
      <BannerMain />
      {/* <ListCategory /> */}
      <CouponList />
      <HistoryView numberShow={4} />
      {isAuthenticated && <RecommendProduct />}
      <div className='container my-7 rounded-md overflow-hidden bg-[#cd1817]'>
        <div className='text-center'>
          <img src='https://fptshop.com.vn/Uploads/Originals/2024/3/8/638455174621285140_Dien-thoai%20(2).png' alt='' />
        </div>
        <ListProduct />
        <div className='text-center mb-5'>
          <Link to='/dien-thoai' className='text-white bg-black py-3 px-5 rounded-md'>
            Xem tất cả
          </Link>
        </div>
      </div>
      {listCate &&
        listCate.length > 0 &&
        listCate.map((cate: any) => {
          return <ListProductHome id={cate.id} name={cate.name} key={cate.id} />
        })}
    </div>
  )
}

export default HomePage
