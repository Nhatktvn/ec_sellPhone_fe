import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducer/rootReducer'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { checkOutStockItem, deleteCartItem, getListCart, updateQuantityCartItem } from '../../apis/cart.api'
import { toast } from 'react-toastify'
import { cartList } from '../../slices/cartSlice'
import { Link } from 'react-router-dom'
import { getAllDitrict, getAllProvince, getAllWard, getFee } from '../../apis/address.api'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cartItem } from '../../types/cart.type'
import { orderCod, orderVnpay } from '../../apis/order.api'
import formatToVND from '../../helpers/currencyFormatter'
interface dataProvince {
  ProvinceID: number
  ProvinceName: string
}
interface dataDistrict {
  DistrictID: number
  DistrictName: string
}
interface dataWard {
  WardCode: number
  WardName: string
}

interface addressCode {
  provinceName: string
  districtName: string
  wardName: string
}
interface addressName {
  provinceName: string
  districtName: string
  wardName: string
  street: string
}

interface checkStock {
  idLineItem: number
  available: number
}

export default function ListCart() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const [listProvince, setListProvince] = useState<dataProvince[]>([])
  const [listDistrict, setListDistrict] = useState<dataDistrict[]>([])
  const [cartItems, setCartItems] = useState<cartItem[]>()
  const [fee, setFee] = useState<number>(0)
  const [typePayment, setTypePayment] = useState<string>('cod')
  const [nameDelivery, setNameDelivery] = useState<string>('')
  const [phoneDelivery, setPhoneeDelivery] = useState<string>('')
  const [listItemOutStock, setListItemOutStock] = useState<checkStock[]>([])
  const [addressCodeDelivery, setAddressCodeDelivery] = useState<addressCode>({
    districtName: '',
    provinceName: '',
    wardName: ''
  })
  const [listWard, setListWard] = useState<dataWard[]>([])
  const [addressNameDelivery, setAddressNameDelivery] = useState<addressName>({
    districtName: '',
    provinceName: '',
    wardName: '',
    street: ''
  })
  // const [selectProvince, setSelectProvince] = useState()
  // const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const dispatch = useDispatch()
  const handleChangeProvince = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeAddress(event)
    getDistrict(parseInt(event.target.value))
  }

  useEffect(() => {
    getCodeAddress()
  }, [addressCodeDelivery])
  useEffect(() => {
    getCheckOutStockItem()
  }, [])
  console.log(listItemOutStock)

  const getCheckOutStockItem = async () => {
    try {
      const fetchCheckOutStockItem = await checkOutStockItem()
      if (fetchCheckOutStockItem && fetchCheckOutStockItem.status === 200 && fetchCheckOutStockItem.data.length > 0) {
        setListItemOutStock(fetchCheckOutStockItem.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeAddress(event)
    getWard(parseInt(event.target.value))
  }
  const hanndleFetchUpdateQuantity = async (type: string, idCartItem: number, quantity: number) => {
    try {
      const dataBody = type == 'plus' ? { idCartItem, quantity: quantity + 1 } : { idCartItem, quantity: quantity - 1 }
      const rs = await updateQuantityCartItem(dataBody)
      if (rs && rs.status === 200) {
        await getCountCart()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteItem = async (idCartItem: number) => {
    try {
      console.log('xóa items')
      const rs = await deleteCartItem(idCartItem)
      if (rs && rs.status === 200) {
        toast.success('Xóa sản phẩm thành công')
      }
      getCountCart()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    console.log('okoko')

    getProvince()
    getCountCart()
  }, [])
  console.log(cartItems)

  const getProvince = async () => {
    try {
      const rsGetProvince = await getAllProvince()
      if (rsGetProvince && rsGetProvince.status == 200) {
        const dtProvince = rsGetProvince.data.data.sort(function (a: dataProvince, b: dataProvince) {
          return a.ProvinceName.localeCompare(b.ProvinceName)
        })
        setListProvince(dtProvince)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(addressNameDelivery)

  const getDistrict = async (provinceId: number) => {
    try {
      const data = { province_id: provinceId }
      const rsGetDistrict = await getAllDitrict(data)
      if (rsGetDistrict && rsGetDistrict.status == 200) {
        const dataDistrict = rsGetDistrict.data.data.sort(function (a: dataDistrict, b: dataDistrict) {
          return a.DistrictName.localeCompare(b.DistrictName)
        })
        setListDistrict(dataDistrict)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getWard = async (districtId: number) => {
    try {
      const data = { district_Id: districtId }
      const rsGetWard = await getAllWard(data)
      if (rsGetWard && rsGetWard.status == 200) {
        const dataWard = rsGetWard.data.data.sort(function (a: dataWard, b: dataWard) {
          return a.WardName.localeCompare(b.WardName)
        })
        setListWard(dataWard)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(cartItems)

  const getCountCart = async () => {
    try {
      const rsGetCart = await getListCart()
      if (rsGetCart && rsGetCart.status === 200) {
        dispatch(cartList(rsGetCart.data))
        setCartItems(rsGetCart.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeAddress = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value, selectedIndex } = event.target
    const selectedText = event.target.options[selectedIndex].text
    if (value == '0') return
    setAddressNameDelivery((prevAddressNameDelivery) => ({
      ...prevAddressNameDelivery,
      [id]: selectedText
    }))
    setAddressCodeDelivery((prevListCodeDistrict) => ({
      ...prevListCodeDistrict,
      [id]: value
    }))
  }
  const getCodeAddress = async () => {
    if (addressCodeDelivery.wardName == '') {
      return
    }
    try {
      const dataGetFee = {
        from_district_id: 1454,
        from_ward_code: '21211',
        service_id: 53320,
        service_type_id: null,
        to_district_id: 1452,
        to_ward_code: '21012',
        height: 20,
        length: 20,
        weight: 2000,
        width: 20,
        insurance_value: 0,
        cod_failed_amount: 2000,
        coupon: null
      }
      const rsGetFee = await getFee(dataGetFee)
      if (rsGetFee && rsGetFee.status === 200) {
        setFee(rsGetFee.data.data.total)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleOrder = async () => {
    try {
      const addressTmp = Object.values(addressNameDelivery).join(', ')
      console.log(addressTmp)
      const formData = new FormData()
      formData.append('provinceAddress', addressNameDelivery.provinceName)
      formData.append('districtAddress', addressNameDelivery.districtName)
      formData.append('wardAddress', addressNameDelivery.districtName)
      formData.append('streetAddress', addressNameDelivery.street)
      formData.append('name', nameDelivery)
      formData.append('phone', phoneDelivery)
      console.log(addressTmp)
      if (typePayment === 'cod') {
        const rsOrderCod = await orderCod({
          provinceAddress: addressNameDelivery.provinceName,
          districtAddress: addressNameDelivery.districtName,
          wardAddress: addressNameDelivery.districtName,
          streetAddress: addressNameDelivery.street,
          phone: phoneDelivery,
          name: nameDelivery
        })
        if (rsOrderCod && rsOrderCod.status === 201) {
          console.log(rsOrderCod)
          toast.success('Thanh toán thành công')
          getCountCart()
        }
      } else {
        const totalPrice =
          cartItems &&
          cartItems?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.sellPrice * currentValue.quantity
          }, 0) + fee
        const rsOrderVnpay = await orderVnpay(formData, totalPrice)
        if (rsOrderVnpay) {
          console.log(rsOrderVnpay.data)
          window.location.href = rsOrderVnpay.data
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container grid grid-cols-12 gap-3 mt-5'>
      <div className='lg:col-span-7 rounded-xl bg-white p-3'>
        {isAuthenticated ? (
          cartItems && cartItems.length > 0 ? (
            <div className='w-full h-[550px] scroll-cart-details px-1'>
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item, idx) => {
                  listItemOutStock &&
                    listItemOutStock.length > 0 &&
                    listItemOutStock.some((p) => p.idLineItem === item.id)
                  return (
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
                        {}
                        <div className='mt-2 text-sm text-orange'>Số lượng vượt quá (4 còn lại)</div>
                      </div>
                    </div>
                  )
                })}
            </div>
          ) : (
            <span className='bg-[#fff3cd] w-full block p-3 text-[#856404] rounded-lg'>
              Không có sản phẩm nào. Quay lại{' '}
              <Link to={'/'} className='font-bold'>
                cửa hàng
              </Link>{' '}
              để tiếp tục mua sắm.
            </span>
          )
        ) : (
          <span className='bg-[#fff3cd] w-full block p-3 text-[#856404] rounded-lg '>
            Vui lòng{' '}
            <Link to={'/dang-nhap'} className='font-bold'>
              đăng nhập
            </Link>{' '}
            để xem giỏ hàng.
          </span>
        )}
      </div>
      {isAuthenticated && cartItems && cartItems?.length > 0 && (
        <div className='lg:col-span-5 h-full bg-white rounded-xl p-5'>
          <h3 className='uppercase text-3xl font-bold mt-4'>Thông tin khách hàng</h3>
          <div className='flex gap-2 mt-5'>
            <div className='flex items-center gap-1'>
              <input type='radio' name='gender' id='male' />
              <label htmlFor='male'>Anh</label>
            </div>
            <div className='flex items-center gap-1'>
              <input type='radio' name='gender' id='female' />
              <label htmlFor='female'>Chị</label>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-2 mt-4'>
            <input
              onChange={(e) => setNameDelivery(e.target.value)}
              className='col-span-6 border p-2 text-sm rounded-md'
              type='text'
              placeholder='Họ và tên'
            />
            <input
              onChange={(e) => setPhoneeDelivery(e.target.value)}
              className='col-span-6 border p-2 text-sm rounded-md'
              type='text'
              placeholder='Số điện thoại'
            />
          </div>
          <div className='grid grid-cols-12 gap-2 mt-5'>
            <select
              className='col-span-6 border p-2 rounded-md cursor-pointer'
              id='provinceName'
              onChange={handleChangeProvince}
            >
              <option value='0'>Chọn Tỉnh / Thành Phố</option>
              {listProvince &&
                listProvince.map((p: dataProvince) => (
                  <option key={p.ProvinceID} value={p.ProvinceID}>
                    {p.ProvinceName}
                  </option>
                ))}
            </select>
            <select
              disabled={!addressNameDelivery.provinceName}
              className='col-span-6 border p-2 rounded-md cursor-pointer'
              id='districtName'
              onChange={handleChangeDistrict}
            >
              <option value='0'>Chọn Quận / Huyện</option>
              {listDistrict &&
                listDistrict.map((p: dataDistrict) => (
                  <option key={p.DistrictID} value={p.DistrictID}>
                    {p.DistrictName}
                  </option>
                ))}
            </select>
            <select
              disabled={!addressNameDelivery.districtName}
              className='col-span-6 border p-2 rounded-md cursor-pointer'
              id='wardName'
              onChange={handleChangeAddress}
            >
              <option value='0'>Chọn Phường / Xã</option>
              {listWard &&
                listWard.map((p: dataWard) => (
                  <option key={p.WardCode} value={p.WardCode}>
                    {p.WardName}
                  </option>
                ))}
            </select>
            <input
              className='col-span-6 border p-2 rounded-md cursor-pointer'
              type='text'
              placeholder='Nhập số nhà, tên đường'
              id='street'
              onChange={(e) =>
                setAddressNameDelivery((prevAddressNameDelivery) => ({
                  ...prevAddressNameDelivery,
                  [e.target.id]: e.target.value
                }))
              }
            />
          </div>
          <div className='mt-5'>
            <h3>Phương thức thanh toán: </h3>
            <select
              onChange={(e) => setTypePayment(e.target.value)}
              className='border p-2 mt-2'
              value={typePayment}
              name='typeOrder'
              id=''
            >
              <option value='cod'>Thanh toán khi nhận hàng</option>
              <option value='VnPay'>Thanh toán bằng VNPay</option>
            </select>
          </div>
          <div className='mt-5'>
            <p className='flex justify-between text-xl'>
              Tổng tiền:{' '}
              <span>
                {cartItems
                  ? formatToVND(
                      cartItems?.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.sellPrice * currentValue.quantity
                      }, 0)
                    )
                  : formatToVND(0)}
              </span>
            </p>
            <p className='flex justify-between my-1 text-xl'>
              Giảm giá khuyến mãi:{' '}
              <span>
                {cartItems
                  ? formatToVND(
                      cartItems?.reduce((accumulator, currentValue) => {
                        return (
                          accumulator + (currentValue.originalPrice - currentValue.sellPrice) * currentValue.quantity
                        )
                      }, 0)
                    )
                  : formatToVND(0)}
              </span>
            </p>
            <p className='flex justify-between my-1 text-xl'>
              Phí giao hàng: <span>{formatToVND(fee)}</span>
            </p>
            <p className='flex justify-between text-2xl font-bold'>
              Thanh toán:{' '}
              <span className='text-orange'>
                {cartItems
                  ? formatToVND(
                      cartItems?.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.sellPrice * currentValue.quantity
                      }, 0) + fee
                    )
                  : formatToVND(0)}
              </span>
            </p>
          </div>
          <button
            className='bg-orange w-full p-3 mt-4 rounded-md text-white font-bold text-xl uppercase hover:opacity-85 active:scale-95 duration-150'
            onClick={handleOrder}
          >
            Thanh toán
          </button>
        </div>
      )}
    </div>
  )
}

function findItemById(items: any[], id: number): any | undefined {
  return items.find((item) => item.idLineItem === id)
}
