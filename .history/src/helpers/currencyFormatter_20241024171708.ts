import { product } from '../types/product.type'

//Format number to string $VND
export default function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.floor(number / 1000) * 1000)
}

//iPhone 13 Pro ==> iPhone-13-Pro
export const convertName = (namePhone: string) => {
  const arrLink = namePhone.toLowerCase().split(' ')
  return arrLink.join('-')
}

export const formatUrlLinkProduct = (categoryName: string, nameProduct: string) => {
  return `${(() => {
    if (categoryName.toLocaleLowerCase() == 'điện thoại') return '/dien-thoai/'
    else if (categoryName.toLocaleLowerCase() == 'laptop') return '/laptop/'
    else if (categoryName.toLocaleLowerCase() == 'phụ kiện') return '/phu-kien/'
    else if (categoryName.toLocaleLowerCase() == 'smartwatch') return '/smart-watch/'
    else return '/tablet/'
  })()}${convertName(nameProduct)}`
}
