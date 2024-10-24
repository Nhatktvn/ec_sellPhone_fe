//Format number to string $VND
export default function formatToVND(number: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.floor(number / 1000) * 1000)
}

//iPhone 13 Pro ==> iPhone-13-Pro
export const convertName = (namePhone: string) => {
  const arrLink = namePhone.toLowerCase().split(' ')
  return arrLink.join('-')
}
