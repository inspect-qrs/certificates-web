import React, { ReactElement, useContext } from 'react'
import { Certificate } from '@/types/certificate.interface'
import { Column, usePagination, useTable } from 'react-table'
import { BackIcon, DoubleBackIcon, DoubleForwardIcon, ForwardIcon } from '@/assets/PaginationIcon'
import Pagination, { PaginationButton } from './Pagination'
import { SelectedRowsContext } from '@/pages/Dashboard'

interface TableProps {
  columns: Array<Column<Certificate>>
  data: Certificate[]
  onRowClick?: (id: string) => void
  sortIcon: (column: string) => ReactElement
  setSortColumn: (column: string) => void
}

const Table = ({ columns, data, sortIcon, setSortColumn, onRowClick = (id) => { console.log(id) } }: TableProps): ReactElement => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    usePagination
  )

  const { selectedRows, setSelectedRows } = useContext(SelectedRowsContext)

  const handleSetPageSize = (page: number): void => {
    setPageSize(page)
  }

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target
    const id = event.target.attributes.getNamedItem('id')?.value ?? ''

    const rows = checked ? [...selectedRows, id] : selectedRows.filter(row => row !== id)
    setSelectedRows(rows)
  }

  const headStyle = 'text-sm font-medium text-white px-6 py-4 capitalize cursor-pointer'
  const bodyStyle = 'text-sm font-light px-6 py-4 whitespace-nowrap uppercase cursor-pointer'

  const PAGINATION_BUTTONS: PaginationButton[] = [
    {
      disabled: canPreviousPage,
      onClick: () => { gotoPage(0) },
      icon: <DoubleBackIcon className='w-5 h-5' />
    },
    {
      disabled: canPreviousPage,
      onClick: () => { previousPage() },
      icon: <BackIcon className='w-5 h-5' />
    },
    {
      disabled: canNextPage,
      onClick: () => { nextPage() },
      icon: <ForwardIcon className='w-5 h-5' />
    },
    {
      disabled: canNextPage,
      onClick: () => { gotoPage(pageCount - 1) },
      icon: <DoubleForwardIcon className='w-5 h-5' />
    }
  ]

  return (
    <>
      <div className='mb-4'>
        <Pagination
          buttons={PAGINATION_BUTTONS}
          pageOptions={{ pageIndex, pageSize, length: pageOptions.length, setPageSize: handleSetPageSize }} />
      </div>

      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table {...getTableProps()} className='min-w-full'>
              <thead className='border-b bg-black'>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    <th className='px-4'></th>
                    {headerGroup.headers.map((column, index) => (
                      <th className={headStyle} {...column.getHeaderProps()} key={index} onClick={() => { setSortColumn(column.id ?? '') }} >
                        <p className='flex items-center justify-center gap-4'>{column.render('Header')} {sortIcon(column.id ?? '')}</p>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row)
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={row.original.id}
                      className={`bg-white border-b transition duration-300 ease-in-out ${selectedRows.includes(row.original.id) ? 'bg-blue text-white' : 'hover:bg-gray-200'}`}
                    >
                      <th className='max-w-[40px]'> <input type="checkbox" id={row.original.id} onChange={handleChangeCheckbox} checked={selectedRows.includes(row.original.id)} /> </th>
                      {row.cells.map((cell, index) => (
                        <td
                          {...cell.getCellProps()}
                          key={index}
                          className={`${bodyStyle} ${selectedRows.includes(row.original.id) ? 'text-white' : 'text-gray-900'}`}
                          onClick={() => { onRowClick(row.original.id) }}
                        >{cell.render('Cell')} { }</td>
                      ))}

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <Pagination
          buttons={PAGINATION_BUTTONS}
          pageOptions={{ pageIndex, pageSize, length: pageOptions.length, setPageSize: handleSetPageSize }} />
      </div>
    </>
  )
}

export default Table
