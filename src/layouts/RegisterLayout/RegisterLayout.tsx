import Footer from '../../components/Footer'
import RegisterHeader from '../../components/RegisterHeader'

interface Props {
  children?: React.ReactNode
  titileHeader: string
}
export default function RegisterLayout({ children, titileHeader }: Props) {
  return (
    <div>
      <RegisterHeader titleHeader={titileHeader} />
      {children}
      <Footer />
    </div>
  )
}
