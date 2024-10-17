import { product } from "../../types/product.type"

function Specifacation(product: product) {
  return (
    <div>
      <h3 className='text-xl font-semibold uppercase mb-2'>Thông số kỹ thuật</h3>
      <table className='table-auto'>
        {()=>if (product)}
      </table>
    </div>
  )
}

export default Specifacation
