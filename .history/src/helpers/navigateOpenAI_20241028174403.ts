import { useNavigate } from 'react-router-dom'

const navigation = useNavigate()
export const convertName = (content: string) => {
  switch (content.toLowerCase()) {
    case 'đã chuyển sang trang chủ.':
      navigation('/')
      break

    default:
      break
  }
}
