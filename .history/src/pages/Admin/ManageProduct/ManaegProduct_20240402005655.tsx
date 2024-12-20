import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import { product } from '../../../types/product.type'
import { getProducts } from '../../../apis/product.api'

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

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState<product[]>()
  const [editingKey, setEditingKey] = useState<number>()

  useEffect(() => {
    fetchDataProduct()
  }, [])
  const fetchDataProduct = async () => {
    try {
      const rsDataProduct = await getProducts()
      if (rsDataProduct && rsDataProduct.status === 200) {
        console.log(rsDataProduct.data.products)
        setData(rsDataProduct.data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const isEditing = (record: product) => record.id === editingKey

  const edit = (record: Partial<product> & { id: number }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey(-1)
  }

  const save = async (key: React.Key) => {
    try {
      console.log(key)

      // const row = (await form.validateFields()) as Item
      // const newData : product[] = [...data]
      // const index = newData.findIndex((item) => key === item.id)
      // if (index > -1) {
      //   const item = newData[index]
      //   newData.splice(index, 1, {
      //     ...item,
      //     ...row
      //   })
      //   setData(newData)
      //   setEditingKey('')
      // } else {
      //   newData.push(row)
      //   setData(newData)
      //   setEditingKey('')
      // }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true
    },
    {
      title: 'address',
      dataIndex: 'address',
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
          <Typography.Link onClick={() => edit(record)}>Edit</Typography.Link>
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

export default App
