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
                return (
                  <li>
                    <div key={idx} className='flex gap-4 relative border-b p-2'>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className='absolute top-1 right-1 text-xl hover:text-orange'
                      >
                        <RiDeleteBin5Fill />
                      </button>
                      <div className='w-[100px] h-[100px] border rounded-xl overflow-hidden'>
                        <img src={item.urlImage} alt='' />
                      </div>
                      <div className='w-full'>
                        <h4 className='text-xl font-bold'>{item.name}</h4>
                        <div className='flex mt-2 justify-between'>
                          <div className='gap-4 text-sm grid grid-cols-12'>
                            <div className='col-span-3'>
                              <p>Màu sắc</p>
                              <div className='py-1 px-2 rounded-full border w-max'>{item.color}</div>
                            </div>
                            <div className='col-span-3'>
                              <p>Dung lượng</p>
                              <div className='py-1 px-2 rounded-full border w-max'>{item.storageCapacity}</div>
                            </div>
                            <div className='col-span-3'>
                              <p>Số lượng</p>
                              <div>
                                <button
                                  className='border text-center py-1 px-2'
                                  onClick={() => hanndleFetchUpdateQuantity('minus', item.id, item.quantity)}
                                >
                                  -
                                </button>
                                <input
                                  type='number'
                                  value={item.quantity}
                                  name=''
                                  id=''
                                  className='border w-[40px] text-center py-1 '
                                />
                                <button
                                  className='border text-center py-1 px-2'
                                  onClick={() => hanndleFetchUpdateQuantity('plus', item.id, item.quantity)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className='text-xl text-red-600 font-bold'>
                              {formatToVND(item.sellPrice * item.quantity)}
                            </p>
                            <p className='text-end line-through text-gray-500'>
                              {formatToVND(item.originalPrice * item.quantity)}
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
