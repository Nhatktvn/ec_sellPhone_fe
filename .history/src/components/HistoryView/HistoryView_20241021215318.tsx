function HistoryView() {
  return (
    <div className='container bg-white py-3 rounded-lg'>
      <h2 className='font-bold text-xl'>Sản phẩm đã xem</h2>
      <div className='grid grid-cols-12'>
        <div className='col-span-4 grid grid-cols-12 gap-3 border border-gray-300 p-2 rounded-lg'>
          <div className='col-span-4'>
            <img
              src='https://cdn.tgdd.vn/Products/Images/44/329075/acer-aspire-3-a315-58-529v-i5-nxaddsv00n-140924-125407-600x600.jpg'
              alt=''
            />
          </div>
          <div className='col-span-8'>
            <h3>iPhone 13 Pro Max</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryView
