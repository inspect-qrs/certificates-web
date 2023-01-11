import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { CertificatesService } from '@/api/certificates.service'
import { Certificate } from '@/types/certificate.interface'
import ImportExcel from './ImportExcel'
import { useNavigate } from 'react-router-dom'
import { FilterIconDesc, FilterIconAsc } from '@/assets/FilterIcon'
import useMediaQuery from '@/hooks/UseMediaQuery'

interface CertificatesProps {
  dni?: string
  isModalShowed?: boolean
  close?: () => void
}

const COLUMNS = ['fullName', 'dni', 'course', 'company', 'place', 'certification']

const Certificates = ({ dni = '', isModalShowed = false, close = () => { console.log('close') } }: CertificatesProps): ReactElement => {
  const certificatesService = new CertificatesService()
  const [certificates, setCertificates] = useState<Certificate[]>([])

  const [sortColumn, setSortColumn] = useState<keyof Certificate>('fullName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterColumn, setFilterColumn] = useState<keyof Certificate>('dni')
  const [filterText, setFilterText] = useState('')

  const navigate = useNavigate()

  const isAboveSmallScreens = useMediaQuery('(min-width: 640px)')

  useEffect(() => {
    if (dni === '') {
      void certificatesService.findAll()
        .then(setCertificates)
    } else {
      void certificatesService.findAllByDni(dni)
        .then(setCertificates)
    }
  }, [dni])

  const handleSortColumn = (column: string): void => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    }

    setSortColumn(column as keyof Certificate)
  }

  const filteredData = useMemo(() => {
    let filtered = certificates
    if (filterText) {
      filtered = filtered.filter(item =>
        item[filterColumn].toLowerCase().includes(filterText.toLowerCase())
      )
    }
    if (sortColumn) {
      filtered.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === 'asc' ? -1 : 1
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return filtered
  }, [certificates, filterText, sortColumn, sortDirection])

  const handleChangeFilterColumn = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target

    setFilterText('')
    setFilterColumn(value as keyof Certificate)
  }

  const handleImportExcel = (newCertificates: Certificate[]): void => {
    setCertificates(certificates.concat(newCertificates))
  }

  const headStyle = 'text-sm font-medium text-white px-6 py-4 capitalize cursor-pointer'
  const bodyStyle = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap '

  const COLUMN_HEADERS = ['fullName', 'dni', 'course', 'duration', 'company', 'place', 'certification', 'startDate', 'endDate']

  const getFilterIcon = (): React.ReactElement => {
    const className = 'text-white w-6 h-6'
    return sortDirection === 'asc' ? <FilterIconAsc className={className} /> : <FilterIconDesc className={className} />
  }

  const filterMobile = (): ReactElement => (
    <>
      <div className='mb-2'>
        <p className='font-medium uppercase'>Filter</p>
        <input
          type="text"
          value={filterText}
          className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none'
          placeholder='Enter value to filter'
          onChange={e => { setFilterText(e.target.value) }}
        />
      </div>
      <div>
        <p className='font-medium uppercase'>Column to filter</p>
        <select value={filterColumn} onChange={handleChangeFilterColumn} className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none uppercase'>
          {
            COLUMNS.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))
          }
        </select>
      </div>
    </>
  )

  const filterDesktop = (): ReactElement => (
    <>
      <div className='grid grid-cols-filter gap-4'>
        <p className='font-medium uppercase'>Filter</p>
        <p className='font-medium uppercase'>Column to filter</p>
      </div>
      <div className='mb-6 grid grid-cols-filter gap-4'>
        <input
          type="text"
          value={filterText}
          className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none'
          placeholder='Enter value to filter'
          onChange={e => { setFilterText(e.target.value) }}
        />
        <select value={filterColumn} onChange={handleChangeFilterColumn} className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none uppercase'>
          {
            COLUMNS.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))
          }
        </select>
      </div>
    </>
  )

  return (
    <main>
      {isModalShowed && <ImportExcel close={close} addCertificates={handleImportExcel} />}
      <div className='mb-4'>
        {isAboveSmallScreens ? filterDesktop() : filterMobile()}
      </div>

      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full'>
              <thead className='border-b bg-black'>
                <tr>
                  {
                    COLUMN_HEADERS.map((header, index) => (
                      <th
                        key={index}
                        scope='col' className={headStyle} onClick={() => { handleSortColumn(header) }}
                      >
                        <p className='flex items-center justify-center gap-4'>{header} {sortColumn === header && getFilterIcon()}</p>
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  filteredData.map(({ id, fullName, dni, course, duration, company, place, certification, startDate, endDate }) => (
                    <tr key={id}
                      onClick={() => {
                        navigate(`/certificate?id=${id}`)
                      }}
                      className='bg-white border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200'
                    >
                      <td className={bodyStyle}>{fullName}</td>
                      <td className={bodyStyle}>{dni}</td>
                      <td className={bodyStyle}>{course}</td>
                      <td className={bodyStyle}>{duration}</td>
                      <td className={bodyStyle}>{company}</td>
                      <td className={bodyStyle}>{place}</td>
                      <td className={bodyStyle}>{certification}</td>
                      <td className={bodyStyle}>{startDate}</td>
                      <td className={bodyStyle}>{endDate}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </main>
  )
}

export default Certificates
