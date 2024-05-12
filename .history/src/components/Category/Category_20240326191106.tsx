function Category() {
  return (
    <div className='w-[120px]  flex flex-col justify-center items-center rounded-md overflow-hidden group cursor-pointer'>
      <div className='rounded-full overflow-hidden group-hover:shadow-lg transition duration-150'>
        <img
          className='h-[120px] '
          src='http://res.cloudinary.com/dzjpaoyds/image/upload/v1711454903/ae87977d-e791-43b7-a637-4240a5ab9b5b.jpg'
          alt=''
        />
      </div>
      <h4 className='mt-1 text-center'>Apple</h4>
    </div>
  )
}

export default Category
