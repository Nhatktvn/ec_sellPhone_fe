import SwiperMain from '../Swiper'
import bannerMainImg from '../../assets/big_bn_slide_8da64cdf00984930b0d15d2df8d28679.webp'
const BannerMain = () => {
  return (
    <div>
      <div className='relative'>
        <div className=''>
          <img src={bannerMainImg} alt='' />
        </div>
        <div className='w-full container absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
          <SwiperMain />
        </div>
        {/* <div className='container grid grid-cols-12 gap-3'>
        <div className='col-span-8'>
          <SwiperMain />
        </div>
        <div className='col-span-4 flex flex-col gap-2'>
          <div
            className='h-[50%] object-cover'
            style={{
              background: `url("https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638448861376459644_H2_385x100.png") no-repeat`,
              backgroundSize: '100% 100%'
            }}
          ></div>
          <div
            className='h-[50%] '
            style={{
              background: `url("https://bizweb.dktcdn.net/100/446/885/themes/851448/assets/right_banner_1.jpg?1709201218605") no-repeat`,
              backgroundSize: '100% 100%'
            }}
          ></div>
        </div>
      </div> */}
      </div>
      <div className='w-full h-10 bg-red-300 mt-[130px]'>
        <div className='flex gap-2 items-center'>
          <img
            src='https://file.hstatic.net/200000823693/file/img_poli_2_cb649a9dd4ef4f1d88aa2e9664476336_icon.png'
            alt=''
          />
          <span>Sản phẩm an toàn</span>
        </div>
      </div>
    </div>
  )
}

export default BannerMain
