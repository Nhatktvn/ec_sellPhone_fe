import Table from '../../components/Table/Table'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    editable: true
  },
  {
    title: 'Email',
    dataIndex: 'email',
    editable: true
  },
  {
    title: 'Role',
    dataIndex: 'role',
    editable: true
  }
]

const data = [
  { key: '1', name: 'User 1', email: 'user1@example.com', role: 'Admin' },
  { key: '2', name: 'User 2', email: 'user2@example.com', role: 'User' },
  { key: '3', name: 'User 3', email: 'user3@example.com', role: 'User' }
]
function AdminTable() {
  return (
    <div>
      <Table data={data} />
    </div>
  )
}

export default AdminTable
