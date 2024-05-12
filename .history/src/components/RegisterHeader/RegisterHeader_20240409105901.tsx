import { Link } from 'react-router-dom'
import IconLogo from '../Icon/IconLogo'
interface Props {
  titleHeader: string // hoặc bất kỳ kiểu dữ liệu nào bạn muốn
}
export default function RegisterHeader({ titleHeader }: Props) {
  return (
    <header className='bg-orange'>
      <div className='container py-7 flex items-end justify-between'>
        <nav className='flex items-end'>
          <Link to='/'>
            <IconLogo />
          </Link>
          <h2 className='text-xl lg:text-2xl px-4'>{titleHeader}</h2>
        </nav>
        <Link className='text-sm text-orange' to='/'>
          Bạn cần giúp đỡ?
        </Link>
      </div>
    </header>
  )
}
