import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import { getProducts } from '../../../apis/product.api'
import { product } from '../../../types/product.type'
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: product
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const ManageProduct: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<product[]>()
  const [editingKey, setEditingKey] = useState<number | null>()

  const isEditing = (record: product) => record.id === editingKey
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

  const edit = (record: Partial<product>) => {
    // form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey(null)
  }
  const save = async (key: React.Key) => {
    try {
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: true
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
      key: 'category_id',
      editable: true
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      editable: true
    },
    {
      title: 'UrlThumb',
      dataIndex: 'urlImage',
      key: 'urlImage',
      editable: true,
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
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== null} onClick={() => edit(record)}>
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

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          onChange: cancel
        }}
      />
    </Form>
  )
}
export default ManageProduct
