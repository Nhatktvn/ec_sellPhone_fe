import { product } from "../../types/product.type"

function Specifacation(product: product) {
  return (
    <div>
      <h3 className='text-xl font-semibold uppercase mb-2'>Thông số kỹ thuật</h3>
      <table className='table-auto'>
        {if (product && product.category_id == 1){
            return (        <tbody>
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
          </tbody>)
          }
          else{
            
          }
        }
      </table>
    </div>
  )
}

export default Specifacation
