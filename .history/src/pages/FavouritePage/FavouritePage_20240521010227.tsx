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
  return <div className='container w-[60%]'>Trang yêu thích</div>
}

export default FavouritePage
