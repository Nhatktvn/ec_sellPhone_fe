import { useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { deleteFavourite, getAllFavourite } from '../../apis/favourite.api'
import { toast } from 'react-toastify'
import { RiDeleteBin5Fill } from 'react-icons/ri'

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

  const handleDeleteFavourite = async (id: number) => {
    try {
      const rsDelete = await deleteFavourite(id)
      if (rsDelete && rsDelete.status === 200) {
        toast.success('Bỏ yêu thích thành công')
        handleGetListFavourite()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container w-[60%] my-5 bg-white py-4'>
      <h2 className='font-bold text-3xl'>Danh sách yêu thích</h2>
      <div className='mt-3'>
        <ul>
          {listFavourite && listFavourite.length > 0
            ? listFavourite.map((favourite, idx) => {
                return (
                  <li>
                    <div key={idx} className='flex gap-4 relative border-b p-2'>
                      <button
                        onClick={() => handleDeleteFavourite(favourite.id)}
                        className='absolute top-1 right-1 text-xl hover:text-orange'
                      >
                        <RiDeleteBin5Fill />
                      </button>
                      <div className='w-[100px] h-[100px] border rounded-xl overflow-hidden'>
                        <img src={favourite.urlImage} alt='' />
                      </div>
                      <div className='w-full'>
                        <h4 className='text-xl font-bold'>{favourite.name}</h4>
                        <div className='flex mt-2 justify-between'>
                          <div className='gap-4 text-sm grid grid-cols-12'></div>
                          <div>
                            <p className='text-xl text-red-600 font-bold'>
                              {formatToVND(favourite.variantDTOList[0].sellPrice)}
                            </p>
                            <p className='text-end line-through text-gray-500'>
                              {formatToVND(favourite.variantDTOList[0].originalPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })
            : 'Không có sản phẩm yêu thích'}
        </ul>
      </div>
    </div>
  )
}

export default FavouritePage
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}
