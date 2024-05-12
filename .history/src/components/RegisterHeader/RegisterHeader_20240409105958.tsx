import { Link } from 'react-router-dom'
interface Props {
  titleHeader: string // hoặc bất kỳ kiểu dữ liệu nào bạn muốn
}
export default function RegisterHeader({ titleHeader }: Props) {
  return (
    <header className='bg-orange'>
      <div className='container py-7 flex items-end justify-between'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img src='https://file.hstatic.net/200000823693/file/logo_f06b40e76f4e462b9be384df2a27f075.png' alt='' />
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
