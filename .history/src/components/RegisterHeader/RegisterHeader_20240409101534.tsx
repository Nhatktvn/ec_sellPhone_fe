import { Link } from 'react-router-dom'
import logoMain from '../../assets/big_bn_slide_8da64cdf00984930b0d15d2df8d28679.webp'
interface Props {
  titleHeader: string // hoặc bất kỳ kiểu dữ liệu nào bạn muốn
}
export default function RegisterHeader({ titleHeader }: Props) {
  return (
    <header>
      <div className='container py-7 flex items-end justify-between'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img src={logoMain} alt='' />
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
