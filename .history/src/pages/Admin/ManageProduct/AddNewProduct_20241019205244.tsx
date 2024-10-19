import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { TiDelete } from 'react-icons/ti'
import { FaPlus } from 'react-icons/fa'
import { FaUpload } from 'react-icons/fa6'
import { getBrandByCategoryId, getBrands } from '../../../apis/brand.api'
import { getAllCategories } from '../../../apis/category.api'
import { Link, useNavigate } from 'react-router-dom'
import Editor from '../../../components/Editor'
import { addProduct } from '../../../apis/product.api'
interface variant {
  color: string
  storageCapacity: string
  OrigianlPrice: number
  sellPrice: number
  available: number
}

const AddNewProduct = () => {
  const navigation = useNavigate()
  const [listCategory, setListCategory] = useState([])
  const [chooseCate, setChooseCate] = useState('')
  const [inputName, setinputName] = useState('')
  const [chooseBrand, setChooseBrand] = useState('')
  const [listBrand, setListBrand] = useState([])
  const [isInputVariant, setIsInputVariant] = useState(false)
  const [isInputImage, setIsInputImage] = useState(false)
  const [specification, setSpecification] = useState({
    sizeScreen: '',
    screenTechnology: '',
    cameraRear: '',
    cameraFront: '',
    chipset: '',
    ram: '',
    rom: '',
    battery: 0,
    operaSystem: '',
    screenResolution: ''
  })
  const [listVariant, setListVariant] = useState<variant[]>([
    { color: 'Trắng', storageCapacity: '64GB', OrigianlPrice: 9590000, sellPrice: 9590000, available: 50 },
    { color: 'Trắng', storageCapacity: '128GB', OrigianlPrice: 10990000, sellPrice: 10590000, available: 50 },
    { color: 'Đen', storageCapacity: '64GB', OrigianlPrice: 12090000, sellPrice: 11790000, available: 50 },
    { color: 'Đen', storageCapacity: '128GB', OrigianlPrice: 13490000, sellPrice: 13090000, available: 50 }
  ])
  console.log(listVariant)

  const [newVariant, setNewVariant] = useState<variant>({
    color: '',
    storageCapacity: '',
    OrigianlPrice: 0,
    sellPrice: 0,
    available: 0
  })
  const [imageThumb, setImageThumb] = useState<string | ArrayBuffer | null>()
  const [image, setImage] = useState<File | null>()
  const [listImageData, setListImageData] = useState<File[] | null>([])
  const [listImagePreview, setListImagePreview] = useState<string[] | ArrayBuffer[]>([])
  const [description, setDescription] = useState<string>('')
  useEffect(() => {
    getAllCate()
    // handleGetBrandByCategory()
  }, [])
  useEffect(() => {
    console.log('Change cate')
    handleGetBrandByCategory()
  }, [chooseCate])

  const changeInputSpecification = (e: any) => {
    const { name, value } = e.target
    setSpecification({
      ...specification, // Giữ nguyên các thuộc tính khác
      [name]: value // Cập nhật thuộc tính dựa trên name của input
    })
  }
  console.log(specification)

  const getAllCate = async () => {
    try {
      const fecthAllCate = await getAllCategories()
      if (fecthAllCate.status == 200) {
        setChooseCate(fecthAllCate.data[0].id)
        console.log(fecthAllCate.data)

        setListCategory(fecthAllCate.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddImageList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    setImage(selectedFile)
    if (selectedFile) setListImageData((prevImages) => (prevImages ? [...prevImages, selectedFile] : [selectedFile]))
    const reader = new FileReader()
    reader.onload = () => {
      const arrImagePriview: any = [...listImagePreview, reader.result]
      setListImagePreview(arrImagePriview)
    }
    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
    setIsInputImage(false)
  }

  console.log(chooseCate)

  const handleGetBrandByCategory = async () => {
    try {
      if (!chooseCate) {
        return
      }
      const getAllBrand = await getBrandByCategoryId(chooseCate)
      if (getAllBrand.status == 200) {
        console.log('list brand')
        console.log(getAllBrand.data)
        setChooseBrand(getAllBrand.data[0].id)
        setListBrand(getAllBrand.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      console.log(reader.result)
      setImageThumb(reader.result)
    }
    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleCreateVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewVariant((prevNewVariant) => ({
      ...prevNewVariant,
      [name]: value
    }))
  }

  const handleAddListVariant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      newVariant.color === '' ||
      newVariant.storageCapacity === '' ||
      newVariant.OrigianlPrice == 0 ||
      newVariant.sellPrice == 0 ||
      newVariant.available == 0
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }

    setListVariant((prevData) => {
      if (prevData && prevData.length > 0) {
        return [...prevData, newVariant]
      } else {
        return [newVariant]
      }
    })
    setNewVariant({
      color: '',
      storageCapacity: '',
      OrigianlPrice: 0,
      sellPrice: 0,
      available: 0
    })
  }
  //  console.log(chooseBrand);

  const handleRemoveVariant = (idx: number) => {
    console.log(idx)
    const arrayTmp: variant[] = listVariant
    arrayTmp.splice(idx, 1)
    setListVariant([...arrayTmp])
  }
  console.log(description)

  const handleAddProduct = async () => {
    try {
      console.log('add product')

      if (!image) {
        return
      }
      const formData: FormData = new FormData()
      formData.append('name', inputName)
      formData.append('category_id', chooseCate)
      formData.append('imageThumb', image)
      formData.append('description', description)
      formData.append('variant', JSON.stringify(listVariant))
      listImageData &&
        listImageData.forEach((image: File) => {
          formData.append('imagesProduct', image) // Dùng 'images[]' để biểu thị rằng đây là mảng
        })
      formData.append('specification', JSON.stringify(specification))
      formData.append('brand_id', chooseBrand)
      // formData.append('imagesProduct', listImageData)
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value)
      // }
      // console.log(formData)
      const fetchAddProduct = await addProduct(formData)
      if (fetchAddProduct && fetchAddProduct.status == 200) {
        toast.success('Têm sản phẩm thành công')
        navigation('/admin/manage-products')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=' w-full p-4 bg-gray-100 mt-[-10px]'>
      <div className=' grid grid-cols-12 gap-5'>
        <div className='col-span-5 bg-white p-4 rounded-lg'>
          <div className='flex flex-col gap-1'>
            <label className='font-medium text-lg' htmlFor='name'>
              Tên sản phẩm:
            </label>
            <input
              placeholder='Enter name...'
              className='border h-8 px-2 border-gray-500 rounded-md'
              type='text'
              id='name'
              name='name'
              onChange={(e) => setinputName(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-12 gap-3 mt-3'>
            <div className='flex flex-col gap-1 col-span-6'>
              <label className='font-medium text-lg' htmlFor='category'>
                Loại:
              </label>
              <select
                defaultValue={chooseCate}
                onChange={(e) => setChooseCate(e.target.value)}
                name='category'
                id='category'
                className='border h-8 px-2 border-gray-500 rounded-md cursor-pointer'
              >
                {listCategory &&
                  listCategory.map((cate: any, idx) => {
                    return (
                      <option value={cate.id} key={cate.id}>
                        {cate.name}
                      </option>
                    )
                  })}
                {/* <option value='0'>Select category...</option>
            <option value='1'>Iphone</option>
            <option value='2'>Samsung</option>
            <option value='3'>Xiaomi</option> */}
              </select>
            </div>
            <div className='flex flex-col gap-1 col-span-6'>
              <label className='font-medium text-lg' htmlFor='brand'>
                Thương hiệu (hãng):
              </label>
              <select
                defaultValue={chooseBrand}
                name='brand'
                id='brand'
                className='border  h-8 px-2 border-gray-500 rounded-md'
                onChange={(e) => setChooseBrand(e.target.value)}
              >
                {listBrand &&
                  listBrand.map((brand: any, idx) => {
                    return (
                      <option value={brand.id} key={brand.id}>
                        {brand.name}
                      </option>
                    )
                  })}
                {/* <option value='0'>Select category...</option>
            <option value='1'>Iphone</option>
            <option value='2'>Samsung</option>
            <option value='3'>Xiaomi</option> */}
              </select>
            </div>
          </div>
          <div className='flex flex-col gap-1 col-span-12 mt-2'>
            <label className='font-medium text-lg' htmlFor='imageThumb'>
              Hình ảnh chính:
            </label>
            <div className='w-full h-[150px] flex justify-center'>
              <label
                className='cursor-pointer font-medium h-[150px] w-[150px]  flex justify-center items-center text-xl rounded-3xl border-4 border-dashed'
                htmlFor='imageThumb'
              >
                {imageThumb ? (
                  <img src={imageThumb as string} alt='Preview' style={{ maxWidth: '150px', maxHeight: '150px' }} />
                ) : (
                  <div className='text-slate-400 text-3xl'>
                    <FaUpload />
                  </div>
                )}
              </label>
              <input
                accept='image/*'
                placeholder='Enter available...'
                className='border h-8 px-2 border-gray-500 rounded-md hidden'
                type='file'
                id='imageThumb'
                name='imageThumb'
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className='flex flex-col gap-1 col-span-12'>
            <label className='font-medium text-lg' htmlFor=''>
              Danh sách hình ảnh:
            </label>
            <div className='w-full  grid grid-cols-12 gap-3 items-center'>
              {listImagePreview &&
                listImagePreview.length > 0 &&
                listImagePreview.map((image, idx) => {
                  return (
                    <div className='w-full h-[100px] col-span-3' key={idx}>
                      <button
                        className='text-red-600 text-2xl p-2 absolute top-0 right-0'
                        onClick={() => setIsInputImage(false)}
                      >
                        <TiDelete />
                      </button>
                      <label
                        className='cursor-pointer font-medium h-[100px] w-[100px] bg-slate-200 flex justify-center items-center text-[40px] rounded-3xl'
                        htmlFor='imageThumb'
                      >
                        <img src={image as string} alt='Preview' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      </label>
                      <input
                        accept='image/*'
                        placeholder='Enter available...'
                        className='border h-8 px-2 border-gray-500 rounded-md hidden'
                        type='file'
                        id='imageThumb'
                        name='imageThumb'
                        onChange={handleImageChange}
                      />
                    </div>
                  )
                })}
              {!isInputImage ? (
                <div className='col-span-3 flex justify-center items-center'>
                  <div
                    className=' w-10 h-10 border-2 text-gray-400 bg-gray-100 rounded-md flex justify-center items-center text-xl cursor-pointer active:scale-95'
                    onClick={() => setIsInputImage(true)}
                  >
                    <FaPlus />
                  </div>
                </div>
              ) : (
                <div className='col-span-3 flex justify-center relative group'>
                  <button
                    className='text-red-600 text-2xl p-2 absolute top-0 right-0 opacity-0 duration-100 group-hover:opacity-100 '
                    onClick={() => setIsInputImage(false)}
                  >
                    <TiDelete />
                  </button>
                  <label
                    className='cursor-pointer font-medium h-[100px] w-[100px] flex justify-center items-center text-xl rounded-3xl border-2 border-dashed'
                    htmlFor='imageList'
                  >
                    <div className='text-slate-400'>
                      <FaUpload />
                    </div>
                  </label>
                  <input
                    accept='image/*'
                    placeholder='Enter available...'
                    className='border h-8 px-2 border-gray-500 rounded-md hidden'
                    type='file'
                    id='imageList'
                    name='imageList'
                    onChange={handleAddImageList}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {specificationOfType('phone', changeInputSpecification)}
        <div className='col-span-12'>
          <label className='font-medium text-lg' htmlFor='variant'>
            Mô tả:
          </label>
          <Editor setDescription={setDescription} />
        </div>
        <div className='flex flex-col gap-1 col-span-12 p-4 bg-white rounded-lg'>
          <label className='font-medium text-lg' htmlFor='variant'>
            Biến thể:
          </label>
          <div className='w-full flex gap-2 items-center'>
            {listVariant &&
              listVariant.map((variant, idx) => {
                return (
                  <div className='border-2 p-2 rounded-md relative group hover:border-orange duration-150' key={idx}>
                    <button
                      className='text-red-600 font-bold p-1 absolute hidden group-hover:block -top-1 -right-1 text-2xl'
                      onClick={() => handleRemoveVariant(idx)}
                    >
                      <TiDelete />
                    </button>
                    <table>
                      <tr>
                        <span className='font-medium'>Color:</span>
                        <td>{variant.color}</td>
                      </tr>
                      <tr>
                        <span className='font-medium'>Storage:</span>
                        <td>{variant.storageCapacity}</td>
                      </tr>
                      <tr>
                        <span className='font-medium'>Origianl price:</span>
                        <td>{formatToVND(variant.OrigianlPrice)}</td>
                      </tr>
                      <tr>
                        <span className='font-medium'>Sell price:</span>
                        <td>{formatToVND(variant.sellPrice)}</td>
                      </tr>
                      <tr>
                        <span className='font-medium'>Available:</span>
                        <td>{variant.available}</td>
                      </tr>
                    </table>
                  </div>
                )
              })}
            {!isInputVariant ? (
              <div
                className='w-10 h-10 border-2 border-dashed text-gray-400 border-gray-400 rounded-md flex justify-center items-center text-xl cursor-pointer'
                onClick={() => setIsInputVariant(true)}
              >
                <FaPlus />
              </div>
            ) : (
              <form
                onSubmit={handleAddListVariant}
                className='w-max border-2 border-orange rounded-md flex flex-col gap-1 p-2 relative'
              >
                <button
                  className='text-red-600 font-bold text-2xl absolute top-0 right-0'
                  onClick={() => setIsInputVariant(false)}
                >
                  <TiDelete />
                </button>
                <input
                  className='w-[150px] p-1'
                  type='text'
                  value={newVariant.color}
                  name='color'
                  placeholder='Enter color...'
                  onChange={handleCreateVariant}
                />
                <input
                  className='w-[150px] p-1'
                  type='text'
                  value={newVariant.storageCapacity}
                  name='storageCapacity'
                  placeholder='Enter storage...'
                  onChange={handleCreateVariant}
                />
                <input
                  className='w-[150px] p-1'
                  type='number'
                  value={newVariant.OrigianlPrice || ''}
                  name='OrigianlPrice'
                  placeholder='Enter origianlPrice...'
                  onChange={handleCreateVariant}
                />
                <input
                  className='w-[150px] p-1'
                  type='number'
                  value={newVariant.sellPrice || ''}
                  name='sellPrice'
                  placeholder='Enter sellPrice...'
                  onChange={handleCreateVariant}
                />
                <input
                  className='w-[150px] p-1'
                  type='number'
                  value={newVariant.available || ''}
                  name='available'
                  placeholder='Enter available...'
                  onChange={handleCreateVariant}
                />
                <button type='submit' className='bg-red-500 '>
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className='my-5'></div>
      <div className='flex gap-5 float-end font-medium my-5'>
        <Link
          to={'/admin/manage-products'}
          className='min-w-[65px] bg-slate-400 text-white py-3 px-3 rounded-md hover:bg-slate-500 hover:font-bold '
        >
          Cancel
        </Link>
        <button
          onClick={handleAddProduct}
          className='min-w-[65px] bg-blue-500 text-white py-3 px-3 rounded-md hover:bg-blue-600 hover:font-bold'
        >
          Save
        </button>
      </div>
    </div>
  )
}
function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

function specificationOfType(type: string, changeInputSpecification: any) {
  switch (type) {
    case 'phone':
      return (
        <div className='col-span-7 bg-white p-4 rounded-lg h-max'>
          <div className='grid grid-cols-12 gap-3'>
            <div className='flex flex-col gap-1 col-span-4'>
              <label className='font-medium text-lg' htmlFor='sizeScreen'>
                Kích thước màn hình:
              </label>
              <input
                placeholder='Enter size screen...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='sizeScreen'
                name='sizeScreen'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-4'>
              <label className='font-medium text-lg' htmlFor='screenTechnology'>
                Công nghệ màn hình:
              </label>
              <input
                placeholder='Enter screen technology...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='screenTechnology'
                name='screenTechnology'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-4'>
              <label className='font-medium text-lg' htmlFor='screenResolution'>
                Độ phân giải màn hình:
              </label>
              <input
                placeholder='Enter screen resolution...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='screenResolution'
                name='screenResolution'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-6'>
              <label className='font-medium text-lg' htmlFor='cameraRear'>
                Camera sau:
              </label>
              <input
                placeholder='Enter camera rear...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='cameraRear'
                name='cameraRear'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-6'>
              <label className='font-medium text-lg' htmlFor='cameraFront'>
                Camera trước:
              </label>
              <input
                placeholder='Enter camera font...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='cameraFront'
                name='cameraFront'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-12'>
              <label className='font-medium text-lg' htmlFor='chipset'>
                Chip:
              </label>
              <input
                placeholder='Enter chip...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='chipset'
                name='chipset'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-3'>
              <label className='font-medium text-lg' htmlFor='ram'>
                Ram:
              </label>
              <input
                placeholder='Enter ram...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='ram'
                name='ram'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-3'>
              <label className='font-medium text-lg' htmlFor='rom'>
                Rom:
              </label>
              <input
                placeholder='Enter rom...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='rom'
                name='rom'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-3'>
              <label className='font-medium text-lg' htmlFor='battery'>
                Dung lượng pin:
              </label>
              <input
                placeholder='Enter battery...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='number'
                id='battery'
                name='battery'
                onChange={changeInputSpecification}
              />
            </div>
            <div className='flex flex-col gap-1 col-span-12'>
              <label className='font-medium text-lg' htmlFor='operaSystem'>
                Hệ điều hành:
              </label>
              <input
                placeholder='Enter screen technology...'
                className='border h-8 px-2 border-gray-500 rounded-md'
                type='text'
                id='operaSystem'
                name='operaSystem'
                onChange={changeInputSpecification}
              />
            </div>
          </div>
        </div>
      )
      break

    default:
      break
  }
}

export default AddNewProduct
