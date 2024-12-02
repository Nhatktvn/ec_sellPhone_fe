//Format number to string $VND
export default function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
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
export const formatDateTime = (originalDateString: any) => {
  const date = new Date(originalDateString)
  const formattedDate = date.toLocaleString('vi-VN', {
    day: '2-digit', // Ngày có 2 chữ số
    month: '2-digit', // Tháng có 2 chữ số
    year: 'numeric', // Năm dạng số
    hour: '2-digit', // Giờ có 2 chữ số
    minute: '2-digit', // Phút có 2 chữ số
    hour12: false // Định dạng 24 giờ
  })
  return formattedDate
}
