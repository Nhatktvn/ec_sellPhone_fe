import React from 'react'
import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

const ManageProduct: React.FC = () => {
  return <Table columns={columns} dataSource={data} />
}
export default ManageProduct
