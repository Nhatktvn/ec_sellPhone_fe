import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import { getProducts } from '../../../apis/product.api'
import { product } from '../../../types/product.type'

// interface Item {
//   key: string
//   name: string
//   age: number
//   address: string
// }

// const originData: Item[] = []
// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`
//   })
// }
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

const ManageProduct: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<product[]>()
  const [editingKey, setEditingKey] = useState<Number | null>()

  useEffect(() => {
    getDataProduct()
  }, [])
  const getDataProduct = async () => {
    try {
      const rsGetProduct = await getProducts()
      if (rsGetProduct && rsGetProduct.status === 200) {
        console.log(rsGetProduct.data.products)
        setData(rsGetProduct.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const isEditing = (record: product) => record.id === editingKey

  const edit = (record: Partial<product> & { key: React.Key }) => {
    form.setFieldsValue()
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey(null)
  }

  const save = async (key: React.Key) => {
    // try {
    //   const row = (await form.validateFields()) as Item
    //   const newData = [...data]
    //   const index = newData.findIndex((item) => key === item.key)
    //   if (index > -1) {
    //     const item = newData[index]
    //     newData.splice(index, 1, {
    //       ...item,
    //       ...row
    //     })
    //     setData(newData)
    //     setEditingKey('')
    //   } else {
    //     newData.push(row)
    //     setData(newData)
    //     setEditingKey('')
    //   }
    // } catch (errInfo) {
    //   console.log('Validate Failed:', errInfo)
    // }
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '25%',
      editable: true
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true
    },
    {
      title: 'category',
      dataIndex: 'category',
      width: '15%',
      editable: true
    },
    {
      title: 'discount',
      dataIndex: 'discount',
      width: '40%',
      editable: true
    },
    {
      title: 'urlImage',
      dataIndex: 'urlImage',
      width: '40%',
      editable: true
    },
    {
      title: 'description',
      dataIndex: 'description',
      width: '40%',
      editable: true
    },
    {
      title: 'images',
      dataIndex: 'images',
      width: '40%',
      editable: true
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
          <Typography.Link disabled={editingKey !== null}>
            {/* onClick={() => edit(record)} */}
            Edit
          </Typography.Link>
        )
      }
    }
  ]

  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: product) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

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
