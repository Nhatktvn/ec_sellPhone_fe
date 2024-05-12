import { Link } from 'react-router-dom'
interface Props {
  titleHeader: string // hoặc bất kỳ kiểu dữ liệu nào bạn muốn
}
export default function RegisterHeader({ titleHeader }: Props) {
  return (
    <header>
      <div className='container py-7 flex items-end justify-between bg-orange'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img src='' alt='' />
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
