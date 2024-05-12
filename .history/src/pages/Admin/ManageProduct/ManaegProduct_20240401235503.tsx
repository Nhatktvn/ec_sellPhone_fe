import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { getProducts } from '../../../apis/product.api'
import { product } from '../../../types/product.type'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const ManageProduct: React.FC = () => {
  const [data, setData] = useState<product[]>()
  const fetchDataProduct = async () => {
    try {
      const rsFetchProduct = await getProducts()
      if (rsFetchProduct && rsFetchProduct.status === 200) {
        setData(rsFetchProduct.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(data)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green'
    //         if (tag === 'loser') {
    //           color = 'volcano'
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         )
    //       })}
    //     </>
    //   )
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size='middle'>
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   )
    // }
  ]
  return <Table columns={columns} dataSource={data} />
}
export default ManageProduct
