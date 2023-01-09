import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { CertificatesService } from '@/api/certificates.service'
import { Certificate } from '@/types/certificate.interface'
import ImportExcel from './ImportExcel'
import { useNavigate } from 'react-router-dom'

const COLUMNS = ['name', 'lastName', 'dni', 'course', 'company', 'place']

const Certificates = (): ReactElement => {
  const certificatesService = new CertificatesService()
  const [certificates, setCertificates] = useState<Certificate[]>([])

  const [sortColumn, setSortColumn] = useState<keyof Certificate>('id')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterColumn, setFilterColumn] = useState<keyof Certificate>('dni')
  const [filterText, setFilterText] = useState('')

  const [isModalShowed, setIsModalShowed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    void certificatesService.findAll()
      .then(setCertificates)
  }, [])

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

  return (
    <main>
      {isModalShowed && <ImportExcel close={() => { setIsModalShowed(!isModalShowed) }} addCertificates={handleImportExcel} />}
      <div className='flex justify-between items-center mb-5'>
        <h1 className='uppercase font-bold text-xl'>Certificates</h1>
        <button className='bg-blue text-white px-4 py-1' onClick={() => { setIsModalShowed(!isModalShowed) }}>Import</button>
      </div>

      <div>
        <input
          type="text"
          value={filterText}
          onChange={e => { setFilterText(e.target.value) }}
        />
        <select value={filterColumn} onChange={handleChangeFilterColumn}>
          {
            COLUMNS.map((column, index) => (
              <option key={index} value={column}>{column}</option>
            ))
          }
        </select>
      </div>

      <table className='w-full'>
        <thead>
          <tr>
            <th onClick={() => { handleSortColumn('name') }}>Name</th>
            <th onClick={() => { handleSortColumn('lastName') }}>LastName</th>
            <th onClick={() => { handleSortColumn('dni') }}>Dni</th>
            <th onClick={() => { handleSortColumn('course') }}>Course</th>
            <th onClick={() => { handleSortColumn('duration') }}>Duration</th>
            <th onClick={() => { handleSortColumn('company') }}>Company</th>
            <th onClick={() => { handleSortColumn('place') }}>Place</th>
            <th onClick={() => { handleSortColumn('startDate') }}>Start Date</th>
            <th onClick={() => { handleSortColumn('endDate') }}>End Date</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map(({ id, name, lastName, dni, course, duration, company, place, startDate, endDate }) => (
              <tr key={id}
                onClick={() => {
                  navigate(`/certificate?id=${id}`)
                }}
                className='cursor-pointer hover:bg-gray-light'
              >
                <td>{name}</td>
                <td>{lastName}</td>
                <td>{dni}</td>
                <td>{course}</td>
                <td>{duration}</td>
                <td>{company}</td>
                <td>{place}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}

export default Certificates
