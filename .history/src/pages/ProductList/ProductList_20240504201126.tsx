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
  console.log(category)

  useEffect(() => {
    console.log('ef1')
    getProductsByCateName()
  }, [category])
  useEffect(() => {
    console.log('ef2')
    getListCategory()
  }, [])

  useEffect(() => {}, [productsFilter])
  useEffect(() => {
    console.log('ef3')
    handleFilterProduct()
  }, [listPriceChoose])
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
        handleFilterProduct()
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(products)
  console.log(productsFilter)

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
                    value={'under2m'}
                    className='mr-2 '
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor=''>Dưới 2 triệu</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    value={'2mTo4m'}
                    className='mr-2 '
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor=''>Từ 2 - 4 triệu</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    value={'4mTo7m'}
                    className='mr-2'
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor=''>Từ 4 - 7 triệu</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    value={'7mTo13m'}
                    className='mr-2'
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor=''>Từ 7 - 13 triệu</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input
                    type='checkbox'
                    name='price'
                    value={'above13m'}
                    className='mr-2'
                    onChange={handleChangeInputPrice}
                  />
                  <label htmlFor=''>Trên 13 triệu</label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className='py-3 mb-2 font-bold'>Dung lượng</h4>
            <div className='text-sm grid grid-cols-2 gap-2'>
              <label htmlFor='' className='flex gap-2 items-center'>
                <input type='checkbox' />
                <span>Tất cả</span>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <input type='checkbox' />
                <span>32GB</span>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <input type='checkbox' />
                <span>64GB</span>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <input type='checkbox' />
                <span>128GB</span>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <input type='checkbox' />
                <span>256GB</span>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <input type='checkbox' />
                <span>512GB</span>
              </label>
              <label htmlFor='' className='flex gap-2 items-center'>
                <input type='checkbox' />
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
              <select value={'Giá'} name='' id='' className='bg-white p-2 rounded col-span-12 md:col-span-6'>
                <option value=''>Giá: thấp đến cao</option>
                <option value=''>Giá: cao đến thấp</option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-12 gap-3 m-3 '>
            {!productsFilter ? (
              <div className='col-span-12 mt-10 mx-auto'>
                <span className='mx-auto animate-spin h-10 w-10 block border-[4px] border-l-transparent rounded-full border-spacing-2 border-orange z-10'></span>
              </div>
            ) : (
              productsFilter.length > 0 &&
              productsFilter.map((product, idx) => (
                <ProductCart className={'col-span-6 sm:col-span-4 lg:col-span-3'} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
