import SwiperMain from '../Swiper'

const BannerMain = () => {
  return (
    <div className=' my-5'>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-8'>
          <SwiperMain />
        </div>
        <div className='col-span-4 flex flex-col gap-2'>
          <div
            className='h-[50%] object-cover'
            style={{
              background: `url("https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638448861376459644_H2_385x100.png") no-repeat`,
              backgroundSize: 'fill'
            }}
          ></div>
          <div
            className='h-[50%] object-cover'
            style={{
              background: `url("https://cf.shopee.vn/file/vn-50009109-c5335039e1b1aab390cc29f3446908fc_xhdpi") no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default BannerMain
