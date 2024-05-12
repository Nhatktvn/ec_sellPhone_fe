import React from 'react'
import Table from '../../components/Table/Table'

const AdminTable: React.FC = () => {
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role' }
  ]

  const data = [
    { key: '1', name: 'User 1', email: 'user1@example.com', role: 'Admin' },
    { key: '2', name: 'User 2', email: 'user2@example.com', role: 'User' },
    { key: '3', name: 'User 3', email: 'user3@example.com', role: 'User' }
  ]

  return (
    <div>
      <h1>Admin page</h1>
      <Table columns={} />
    </div>
  )
}

export default AdminTable
