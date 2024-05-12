import React, { useEffect, useState } from 'react'
import { Popconfirm, Space, Table, Tag, Typography } from 'antd'
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
  useEffect(() => {
    fetchDataProduct()
  }, [])
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true
    },
    {
      title: 'Category_id',
      dataIndex: 'category_id',
      key: 'category_id'
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount'
    },
    {
      title: 'UrlThumb',
      dataIndex: 'urlImage',
      key: 'urlImage',
      render: (_: any, record: product) => {
        return <img src={`${record.urlImage}`} />
      }
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: product) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        )
      }
    }
  ]
  // const columns: TableProps<product>['columns'] = [

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

  return <Table columns={columns} dataSource={data} />
}
export default ManageProduct