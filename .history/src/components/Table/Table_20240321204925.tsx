import React from 'react'
import { Column, useTable, useSortBy } from 'react-table'

interface Data {
  id: number
  name: string
  email: string
  role: string
}

interface Props {
  data: Data[]
}

const Table: React.FC<Props> = ({ data }) => {
  const columns = React.useMemo<Column<Data>[]>(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Role', accessor: 'role' }
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy)

  return (
    <table {...getTableProps()} className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-40'>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.ge)} className='px-6 py-3'>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              {row.cells.map((cell) => {
                return (
                  <td className='px-6 py-4' {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
