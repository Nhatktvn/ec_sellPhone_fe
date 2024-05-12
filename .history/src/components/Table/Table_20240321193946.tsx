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

const Table = (props) => {
  return <div></div>
}

Table.propTypes = {}

export default Table
