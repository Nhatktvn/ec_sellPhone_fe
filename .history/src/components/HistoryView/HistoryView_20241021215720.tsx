function HistoryView() {
  return (
    <div className='container bg-white py-3 rounded-lg'>
      <h2 className='font-bold text-xl'>Sản phẩm đã xem</h2>
      <div className='grid grid-cols-12'>
        <div className='col-span-3 grid grid-cols-12 gap-4 border border-gray-300 p-2 rounded-lg'>
          <div className='col-span-4'>
            <img
              src='https://cdn.tgdd.vn/Products/Images/44/329075/acer-aspire-3-a315-58-529v-i5-nxaddsv00n-140924-125407-600x600.jpg'
              alt=''
            />
          </div>
          <div className='col-span-8 flex flex-col justify-between'>
            <h4>iPhone 13 Pro Max</h4>
            <h4 className='font-bold text-orange'>9.590.000 ₫</h4>
          </div>
        </div>
      </div>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        navigation
        slidesPerView={windowWidth >= 768 ? 2 : 1}
        // pagination={{ type: 'progressbar' }}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        loop={true}
        spaceBetween={20}
      >
        {items &&
          items.length > 0 &&
          items.map((item, idx) => (
            <SwiperSlide>
              <div
                className='container-cate object-cover rounded-xl'
                style={{
                  height: '220px',
                  background: `url("https://file.hstatic.net/200000823693/file/slide-img1_b3926f5602ce46bab1bdfc5c2a333fad.png") no-repeat`,
                  backgroundSize: 'cover',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default HistoryView