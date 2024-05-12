import React, { useState } from 'react'
import { Table, Button, Modal } from 'antd'
// import 'antd/dist/antd.css'
import 'antd/dist/reset.css'

interface Column {
  title: string
  dataIndex: string
}

interface DataItem {
  key: React.Key
  [key: string]: any
}

interface EditableTableProps {
  columns: Column[]
  data: DataItem[]
}

const EditableTable: React.FC<EditableTableProps> = ({ columns, data }) => {
  const [visible, setVisible] = useState(false)
  const [editedData, setEditedData] = useState<DataItem | null>(null)

  const handleEdit = (record: DataItem) => {
    setEditedData(record)
    setVisible(true)
  }

  const handleSave = () => {
    // Implement your save logic here
    console.log('Edited data:', editedData)
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Table
        dataSource={data}
        columns={[
          ...columns,
          {
            title: 'Action',
            dataIndex: 'action',
            render: (_text: string, record: DataItem) => <Button onClick={() => handleEdit(record)}>Edit</Button>
          }
        ]}
      />
      <Modal title='Edit Data' visible={visible} onOk={handleSave} onCancel={handleCancel}>
        {editedData && (
          <table>
            <tbody>
              {Object.entries(editedData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    <input
                      type='text'
                      value={value}
                      onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal>
    </>
  )
}

export default EditableTable
