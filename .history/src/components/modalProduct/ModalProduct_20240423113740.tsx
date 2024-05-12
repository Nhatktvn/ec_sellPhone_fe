import { product } from '../../types/product.type'

interface props {
  setShowModal: any
  product: product
}
const ModalProduct = ({ setShowModal, product }: props) => {
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'></div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}

export default ModalProduct
