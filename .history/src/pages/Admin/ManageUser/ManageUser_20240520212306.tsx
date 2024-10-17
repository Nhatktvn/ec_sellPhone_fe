import Table from 'react-bootstrap/Table'
function ManageUser() {
  const fetchGetUsers = await() =>{
try {
  
} catch (error) {
  
}
  } 
  return (
    <div>
      <table className=' mt-4 table table-hover table-bordered '>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Username</th>
            <th scope='col'>Fullname</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>CreatedDate</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 ? (
            listUsers.map((user, idx) => {
              return (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className='d-flex gap-3'>
                    <button className='btn btn-secondary' onClick={() => handleClickView(user)}>
                      View
                    </button>
                    <button className='btn btn-primary' onClick={() => handleClickUpdate(user)}>
                      Upadate
                    </button>
                    <button className='btn btn-danger' onClick={() => handleClickDelete(user)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={'4'} className='text-center'>
                Not found user
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUser
