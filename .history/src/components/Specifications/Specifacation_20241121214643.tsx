import { product } from '../../types/product.type'

interface props {
  product: product
}
function Specifacation(props: props) {
  const product = props.product

  return (
    <div>
      {/* <h3 className='text-xl font-semibold uppercase mb-2'>Thông số kỹ thuật</h3> */}
      <table className='table-auto'>
        {(() => {
          if (product.category_name.toLocaleLowerCase() == 'điện thoại') {
            return (
              <tbody className='rounded-lg block overflow-hidden border-gray-300 border'>
                <tr className='bg-gray-100 px-2'>
                  <td className='w-max block mr-5 py-2 font-bold'>
                    <span className='pl-2'>Kích thước màn hình</span>
                  </td>
                  <td>{product.specificationDTO.sizeScreen}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Công nghệ màn hình</span>
                  </td>
                  <td>{product.specificationDTO.screenTechnology}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Camera sau</span>
                  </td>
                  <td>{product.specificationDTO.cameraRear}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Camera trước</span>
                  </td>
                  <td>{product.specificationDTO.cameraFront}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Chipset</span>
                  </td>
                  <td>{product.specificationDTO.chipset}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Ram</span>
                  </td>
                  <td>{product.specificationDTO.ram}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Rom</span>
                  </td>
                  <td>{product.specificationDTO.rom}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Dung lượng pin</span>
                  </td>
                  <td>{product.specificationDTO.battery}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Độ phân giải</span>
                  </td>
                  <td>{product.specificationDTO.screenResolution}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>
                    <span className='pl-2'>Hệ điều hành</span>
                  </td>
                  <td>{product.specificationDTO.operaSystem}</td>
                </tr>
              </tbody>
            )
          } else if (product.category_name.toLocaleLowerCase() == 'laptop') {
            return (
              <tbody className='rounded-lg block overflow-hidden border-gray-300 border'>
                <tr className='bg-gray-100 '>
                  <td className='w-max block mr-5 py-2 font-bold'>Kích thước màn hình:</td>
                  <td>{product.specificationDTO.screen}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Công nghệ CPU:</td>
                  <td>{product.specificationDTO.cpu}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-2 font-bold'>Card màn hình:</td>
                  <td>{product.specificationDTO.gpu}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>RAM:</td>
                  <td>{product.specificationDTO.ram}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-2 font-bold'>Bộ nhớ:</td>
                  <td>{product.specificationDTO.rom}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Pin:</td>
                  <td>{product.specificationDTO.battery}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-2 font-bold'>Hệ điều hành:</td>
                  <td>{product.specificationDTO.operaSystem}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Trọng lượng:</td>
                  <td>{product.specificationDTO.weight}</td>
                </tr>
                <tr className='bg-gray-100'>
                  <td className='py-2 font-bold'>Cổng kết nối:</td>
                  <td>{product.specificationDTO.ports}</td>
                </tr>
                <tr>
                  <td className='py-2 font-bold'>Tính năng nổi bật:</td>
                  <td>{product.specificationDTO.additionalFeatures || 'Đang cập nhật'}</td>
                </tr>
              </tbody>
            )
          } else if (product.category_name.toLocaleLowerCase() == 'phụ kiện') {
          } else if (product.category_name.toLocaleLowerCase() == 'tablet') {
          } else if (product.category_name.toLocaleLowerCase() == 'smartwatch') {
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
