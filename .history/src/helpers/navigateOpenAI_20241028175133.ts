import { useNavigate } from 'react-router-dom'

const navigation = useNavigate()
export const navigatePageByAi = (content: string) => {
  switch (content) {
    case 'Đã chuyển đến trang chủ.':
      return '/'
      break

    default:
      break
  }
}
