import { Link, useParams } from 'react-router-dom'
import ProductCart from '../../components/Product/ProductCard'
import { getProductsByCate } from '../../apis/product.api'
import { ChangeEvent, useEffect, useState } from 'react'
import { product } from '../../types/product.type'
import { getCategories } from '../../apis/category.api'

interface category {
  id: number
  name: String
  description: String
  urlImage: String
}
export default function ProductList() {
  const { category } = useParams()
  const [products, setProduct] = useState<product[] | null>([])
  const [productsFilter, setProductsFilter] = useState<product[] | null>([])
  const [listCategory, setListCategory] = useState<category[] | null>()
  const [listPriceChoose, setListPriceChoose] = useState<string[]>([])
  const [listStorageChoose, setListStorageChoose] = useState<string[]>([])
  console.log(category)

  useEffect(() => {
    console.log('ef1')
    getProductsByCateName()
  }, [category])
  useEffect(() => {
    console.log('ef2')
    getListCategory()
  }, [])

  // useEffect(() => {
  //   console.log('filter change')
  // }, [productsFilter])
  useEffect(() => {
    console.log('ef3')
    handleFilterProduct()
  }, [listPriceChoose, listStorageChoose])
  const handleFilterProduct = () => {
    let listProductFilter: product[] | null = []
    if (listPriceChoose && listPriceChoose.length > 0) {
      console.log(listPriceChoose.length)
      listPriceChoose?.map((priceRange) => {
        const rsFilter: product[] | null = handleFilterProductByPrice(priceRange)
        console.log(rsFilter)

        if (listProductFilter) {
          listProductFilter = rsFilter ? [...listProductFilter, ...rsFilter] : [...listProductFilter]
        } else {
          listProductFilter = rsFilter ? [...rsFilter] : []
        }
      })
    } else {
      listProductFilter = products ? [...products] : []
    }

    if (listStorageChoose && listStorageChoose.length > 0) {
      listProductFilter = listProductFilter.filter((product) => {
        let bool = false
        for (let i = 0; i < product.variantDTOList.length; i++) {
          if (listStorageChoose.includes(product.variantDTOList[i].storageCapacity)) {
            bool = true
            break
          }
        }
        return bool
      })
    }
    setProductsFilter([...listProductFilter])
  }

  const handleFilterProductByPrice = (priceRange: string) => {
    let filtered: product[] | null | undefined = []
    switch (priceRange) {
      case 'under2m':
        filtered = products && products.filter((product) => product.variantDTOList[0].price < 2000000)
        break
      case '2mTo4m':
        filtered =
          products &&
          products.filter(
            (product) => product.variantDTOList[0].price > 2000000 && product.variantDTOList[0].price < 4000000
          )
        break
      case '4mTo7m':
        filtered =
          products &&
          products.filter(
            (product) => product.variantDTOList[0].price > 4000000 && product.variantDTOList[0].price < 7000000
          )
        break
      case '7mTo13m':
        filtered =
          products &&
          products.filter(
            (product) => product.variantDTOList[0].price > 7000000 && product.variantDTOList[0].price < 13000000
          )
        break
      case 'above13m':
        filtered = products && products.filter((product) => product.variantDTOList[0].price > 13000000)
        break
    }
    return filtered
  }

  const handleChangeInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    if (checked) {
      setListPriceChoose([...listPriceChoose, value])
    } else {
      setListPriceChoose(listPriceChoose.filter((price) => price !== value))
    }
    console.log(listPriceChoose)
  }
  const handleChangeInputStorage = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    if (checked) {
      setListStorageChoose([...listStorageChoose, value])
    } else {
      setListStorageChoose(listStorageChoose.filter((price) => price !== value))
    }
  }

  const getListCategory = async () => {
    try {
      const rsGetCategory = await getCategories()
      if (rsGetCategory && rsGetCategory.status === 200) {
        setListCategory(rsGetCategory.data)
      }
    } catch (error) {}
  }

  const getProductsByCateName = async () => {
    try {
      console.log(category)
      const rsGetProductByCate = await getProductsByCate(category)
      if (rsGetProductByCate && rsGetProductByCate.status === 200) {
        setProduct(rsGetProductByCate.data)
        setProductsFilter(rsGetProductByCate.data)
        setListPriceChoose([])
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(listStorageChoose)

  return (
    <div className='container'>
      <div className='main-filter mt-5 grid grid-cols-12'>
        <div className='col-span-12 md:col-span-3 pl-5'>
          <div className='mb-7'>
            <h3 className='py-3 mb-2 font-bold '>Hãng sản xuất</h3>
            <div className='text-sm grid grid-cols-2 gap-2'>
              <label htmlFor='cate-all' className='col-span-1 flex gap-2 items-center cursor-pointer'>
                <input type='radio' name='cateSelect' id='cate-all' className='mr-2' />
                <span>Tất cả</span>
              </label>
              {listCategory &&
                listCategory.length > 0 &&
                listCategory.map((cate) => (
                  <Link to={`/danh-sach/${cate.name}`}>
                    <label
                      htmlFor={`cate-${cate.id}`}
                      key={cate.id}
                      className='col-span-1 flex gap-2 items-center cursor-pointer'
                    >
                      <input
                        type='radio'
                        name='cateSelect'
                        id={`cate-${cate.id}`}
                        checked={cate.name == category}
                        className='mr-2 '
                      />
                      <span>{cate.name}</span>
                    </label>
                  </Link>
                ))}
            </div>
          </div>
          <div>
            <h3 className='font-bold'>Mức giá</h3>
            <div className='text-sm'>
              <div className='flex flex-col gap-2 mt-2'>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    id='under2m'
                    value={'under2m'}
                    className='mr-2 '
                    checked={listPriceChoose.includes('under2m')}
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor='under2m' className='cursor-pointer'>
                    Dưới 2 triệu
                  </label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    id='2mTo4m'
                    checked={listPriceChoose.includes('2mTo4m')}
                    value={'2mTo4m'}
                    className='mr-2 '
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor='2mTo4m' className='cursor-pointer'>
                    Từ 2 - 4 triệu
                  </label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    id='4mTo7m'
                    value={'4mTo7m'}
                    checked={listPriceChoose.includes('4mTo7m')}
                    className='mr-2'
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor='4mTo7m' className='cursor-pointer'>
                    Từ 4 - 7 triệu
                  </label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    id='7mTo13m'
                    checked={listPriceChoose.includes('7mTo13m')}
                    value={'7mTo13m'}
                    className='mr-2'
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor='7mTo13m' className='cursor-pointer'>
                    Từ 7 - 13 triệu
                  </label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    id='above13m'
                    checked={listPriceChoose.includes('above13m')}
                    value={'above13m'}
                    className='mr-2'
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor='above13m' className='cursor-pointer'>
                    Trên 13 triệu
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className='py-3 mb-2 font-bold'>Dung lượng</h4>
            <div className='text-sm grid grid-cols-2 gap-2'>
              <label htmlFor='32GB' className='flex gap-2 items-center cursor-pointer'>
                <input type='checkbox' name='storage' value='32GB' id='32GB' onChange={handleChangeInputStorage} />
                <span>32GB</span>
              </label>
              <label htmlFor='64GB' className='flex gap-2 items-center cursor-pointer'>
                <input type='checkbox' name='storage' value='64GB' id='64GB' onChange={handleChangeInputStorage} />
                <span>64GB</span>
              </label>
              <label htmlFor='128GB' className='flex gap-2 items-center cursor-pointer'>
                <input type='checkbox' name='storage' value='128GB' id='128GB' onChange={handleChangeInputStorage} />
                <span>128GB</span>
              </label>
              <label htmlFor='256GB' className='flex gap-2 items-center cursor-pointer'>
                <input type='checkbox' name='storage' value='256GB' id='256GB' onChange={handleChangeInputStorage} />
                <span>256GB</span>
              </label>
              <label htmlFor='512GB' className='flex gap-2 items-center cursor-pointer'>
                <input type='checkbox' name='storage' value='512GB' id='512GB' onChange={handleChangeInputStorage} />
                <span>512GB</span>
              </label>
              <label htmlFor='1TB' className='flex gap-2 items-center cursor-pointer'>
                <input type='checkbox' name='storage' value='1TB' id='1TB' onChange={handleChangeInputStorage} />
                <span>1TB</span>
              </label>
            </div>
          </div>
        </div>
        <div className='col-span-12 md:col-span-9'>
          <div className='flex gap-3 text-sm py-3 mx-3 bg-[#EDEDED] items-center pl-2'>
            <h3>Sắp xếp theo</h3>
            <div className='grid grid-cols-12 gap-3 mr-2'>
              <div className='col-span-12 md:col-span-6 flex gap-3'>
                <button className='bg-orange text-white p-2 rounded'>Phổ biến</button>
                <button className='bg-white p-2 rounded'>Mới nhất</button>
                <button className='bg-white p-2 rounded'>Bán chạy</button>
              </div>
              <select
                defaultValue='priceDownToUp'
                name=''
                id=''
                className='bg-white p-2 rounded col-span-12 md:col-span-6'
              >
                <option value='priceDownToUp'>Giá: thấp đến cao</option>
                <option value='priceUpToDown'>Giá: cao đến thấp</option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-3 m-3 '>
            {!productsFilter ? (
              <div className='col-span-12 mt-10 mx-auto'>
                <span className='mx-auto animate-spin h-10 w-10 block border-[4px] border-l-transparent rounded-full border-spacing-2 border-orange z-10'></span>
              </div>
            ) : productsFilter.length > 0 ? (
              productsFilter.map((product, idx) => (
                <ProductCart className={'col-span-6 sm:col-span-4 lg:col-span-3'} product={product} />
              ))
            ) : (
              <span className='w-max pl-2 text-orange'>Không có sản phẩm</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
