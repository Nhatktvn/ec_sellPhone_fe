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

import React from 'react'

const Table: React.FC<EditableTableProps> = ({ columns, data }) => {
  return <div></div>
}
export default Table
