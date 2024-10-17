import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getAllFavourite } from '../../apis/favourite.api'

function FavouritePage() {
  const [listFavourite, setListFavourite] = useState<product[]>()
  useEffect(() => {
    handleGetListFavourite()
  }, [])
  const handleGetListFavourite = async () => {
    try {
      const rsGetListFavourite = await getAllFavourite()
      if (rsGetListFavourite && rsGetListFavourite.status === 200) {
        setListFavourite(rsGetListFavourite.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container w-[60%] my-5 bg-white py-4'>
      <h2 className='font-bold text-2xl'>Danh sách yêu thích</h2>
      <div>
        <ul>
          {listFavourite && listFavourite.length > 0
            ? listFavourite.map((favourite) => {
                return <li></li>
              })
            : 'Không có sản phẩm yêu thích'}
        </ul>
      </div>
    </div>
  )
}

export default FavouritePage
