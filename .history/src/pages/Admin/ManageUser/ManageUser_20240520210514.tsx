import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import { product } from '../../../types/product.type'
import { getProducts } from '../../../apis/product.api'
import { useNavigate } from 'react-router-dom'
import { User } from '../../../types/user.type'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text' | 'file'
  record: User
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
  const inputNode = inputType === 'number' ? <InputNumber /> : inputType === 'text' ? <Input /> : <input type='file' />

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
  const navigation = useNavigate()
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
    const { id, name, discount } = { ...record }
    form.setFieldsValue({ id, name, discount })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey(-1)
  }

  const save = async (key: React.Key) => {
    try {
      console.log(key)
      setEditingKey(-1)
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
      title: 'Id',
      dataIndex: 'id',
      width: '5%',
      editable: true
    },
    {
      title: 'fullname',
      dataIndex: 'fullname',
      width: '20%',
      editable: true
    },
    {
      title: 'birthDate',
      dataIndex: 'birthDate',
      width: '20%',
      editable: true
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      width: '20%',
      editable: true
    },
    {
      title: 'urlAvatar',
      dataIndex: 'urlAvatar',
      width: '15%',
      editable: true,
      render: (_: any, record: product) => {
        return <img className='w-16 h-16' src={`${record.urlImage}`} />
      }
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      width: '10%',
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
          <div className='flex  gap-4'>
            <Typography.Link onClick={() => edit(record)}>
              <span className='text-blue-500 hover:text-white hover:bg-blue-500 p-2 rounded-md duration-200 font-semibold'>
                Edit
              </span>
            </Typography.Link>
            <Typography.Link onClick={() => edit(record)}>
              <span className='text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md duration-200 font-semibold'>
                Delete
              </span>
            </Typography.Link>
          </div>
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
        inputType: col.dataIndex === 'urlImage' ? 'file' : col.dataIndex === 'id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  return (
    <div>
      <div className='float-end'>
        <button
          onClick={() => navigation('/admin/manage-products/add-new')}
          className='bg-[#1677ff] text-white font-bold px-4 py-3 mr-5 rounded-md btn hover:opacity-85 active:scale-95 duration-150'
        >
          Add new
        </button>
      </div>
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
    </div>
  )
}

export default App