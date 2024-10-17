import { product } from '../../types/product.type'

interface props {
  product: product
}
function Specifacation(props: props) {
  const product = props.product
  return (
    <div>
      <h3 className='text-xl font-semibold uppercase mb-2'>Thông số kỹ thuật</h3>
      <table className='table-auto'>
        {(() => {
          if (product.category_id == 1) {
            return (
              <tbody>
                <tr>
                  <td className='w-max block mr-5 py-2 font-bold'>Kích thước màn hình:</td>
                  <td>{product.specificationDTO.sizeScreen}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Công nghệ màn hình:</td>
                  <td>{product.specificationDTO.screenTechnology}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Camera sau:</td>
                  <td>{product.specificationDTO.cameraRear}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Camera trước:</td>
                  <td>{product.specificationDTO.cameraFront}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Chipset:</td>
                  <td>{product.specificationDTO.chipset}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Ram:</td>
                  <td>{product.specificationDTO.ram}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Rom:</td>
                  <td>{product.specificationDTO.rom}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Dung lượng pin:</td>
                  <td>{product.specificationDTO.battery}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Độ phân giải:</td>
                  <td>{product.specificationDTO.screenResolution}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Hệ điều hành:</td>
                  <td>{product.specificationDTO.operaSystem}</td>
                </tr>
              </tbody>
            )
          } else if (product.category_id == 2) {
            return (
              <tbody>
                <tr>
                  <td className='w-max block mr-5 py-2 font-bold'>Kích thước màn hình:</td>
                  <td>{product.specificationDTO.screen}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Công nghệ CPU:</td>
                  <td>{product.specificationDTO.cpu}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Card màn hình:</td>
                  <td>{product.specificationDTO.gpu}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>RAM:</td>
                  <td>{product.specificationDTO.ram}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Bộ nhớ:</td>
                  <td>{product.specificationDTO.rom}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Pin:</td>
                  <td>{product.specificationDTO.battery}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Hệ điều hành:</td>
                  <td>{product.specificationDTO.operaSystem}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Trọng lượng:</td>
                  <td>{product.specificationDTO.weight}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Cổng kết nối:</td>
                  <td>{product.specificationDTO.ports}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Tính năng nổi bật:</td>
                  <td>{product.specificationDTO.additionalFeatures | 'Không có'}</td>
                </tr>
              </tbody>
            )
          } else if (product.category_id == 3) {
          } else if (product.category_id == 4) {
          } else if (product.category_id == 5) {
          } else {
            return <p>Value is 10 or greater</p>
          }
        })()}
      </table>
    </div>
  )
}

export default Specifacation

{
  /* <h3 className='text-xl font-semibold uppercase mb-2'>Thông số kỹ thuật</h3>
              <table className='table-auto'>
                <tbody>
                  <tr>
                    <td className='w-max block mr-5 py-2 font-bold'>Kích thước màn hình:</td>
                    <td>{product.specificationDTO.sizeScreen}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Công nghệ màn hình:</td>
                    <td>{product.specificationDTO.screenTechnology}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Camera sau:</td>
                    <td>{product.specificationDTO.cameraRear}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Camera trước:</td>
                    <td>{product.specificationDTO.cameraFront}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Chipset:</td>
                    <td>{product.specificationDTO.chipset}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Ram:</td>
                    <td>{product.specificationDTO.ram}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Rom:</td>
                    <td>{product.specificationDTO.rom}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Dung lượng pin:</td>
                    <td>{product.specificationDTO.battery}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Độ phân giải:</td>
                    <td>{product.specificationDTO.screenResolution}</td>
                  </tr>
                  <tr>
                    <td className='py-2 font-bold'>Hệ điều hành:</td>
                    <td>{product.specificationDTO.operaSystem}</td>
                  </tr>
                </tbody>
              </table> */
}
