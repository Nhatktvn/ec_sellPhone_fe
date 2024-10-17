import { product } from '../../types/product.type'

function Specifacation(product: product) {
  return (
    <div>
      <h3 className='text-xl font-semibold uppercase mb-2'>Thông số kỹ thuật</h3>
      <table className='table-auto'>
        {(() => {
          if (product.category_id == 1) {
            return <p>Value is less than 5</p>
          } else if (product.category_id == 2) {
            return <p>Value is between 5 and 9</p>
          } else {
            return <p>Value is 10 or greater</p>
          }
        })()}
      </table>
    </div>
  )
}

export default Specifacation
