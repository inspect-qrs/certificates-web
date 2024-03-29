import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { CertificatesService } from '@/api/certificates.service'
import { Certificate } from '@/types/certificate.interface'
import ImportExcel from './ImportExcel'
import { useNavigate } from 'react-router-dom'
import { SortIconDesc, SortIconAsc } from '@/assets/SortIcons'
import useMediaQuery from '@/hooks/UseMediaQuery'
import { Column } from 'react-table'
import Table from '../Table'
import DeleteModal from './DeleteModal'
import { useAuthStore } from '@/config/store/auth'
import { User } from '@/types/user.interface'

interface CertificatesProps {
  dni?: string
  isExcelModalShowed?: boolean
  closeExcelModal?: () => void
  isDeleteModalShowed?: boolean
  closeDeleteModal?: () => void
}

const FILTER_COLUMNS = [
  { name: 'Nombre completo', value: 'fullName' },
  { name: 'Dni', value: 'dni' },
  { name: 'Curso', value: 'course' },
  { name: 'Empresa', value: 'company' },
  { name: 'Lugar', value: 'place' },
  { name: 'Certificado', value: 'certification' },
  { name: 'Nota', value: 'mark' }
]

const Certificates = ({ dni = '', isExcelModalShowed = false, closeExcelModal = () => { console.log('closeExcelModal') }, isDeleteModalShowed = false, closeDeleteModal = () => { console.log('closeExcelModal') } }: CertificatesProps): ReactElement => {
  const certificatesService = new CertificatesService()
  const [certificates, setCertificates] = useState<Certificate[]>([])

  const [sortColumn, setSortColumn] = useState<keyof Certificate>('fullName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterColumn, setFilterColumn] = useState<keyof Certificate>('dni')
  const [filterText, setFilterText] = useState('')

  const userAuth = useAuthStore<User>((state) => state.user)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    setIsAdmin(userAuth.role === 'admin')
  }, [userAuth])

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
  }, [])

  const handleSortColumn = (column: string): void => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    }

    setSortColumn(column as keyof Certificate)
  }

  const getSortIcon = (column: string): React.ReactElement => {
    if (sortColumn !== column) return (<span></span>)
    const className = 'text-white w-6 h-6'
    return sortDirection === 'asc' ? <SortIconAsc className={className} /> : <SortIconDesc className={className} />
  }

  const getExpiredDate = (date: string, validity: number): Date => {
    const dateObj = new Date(date)
    dateObj.setMonth(dateObj.getMonth() + validity)
    return dateObj
  }
  const filteredData = useMemo(() => {
    let filtered = certificates
    if (filterText) {
      filtered = filtered.filter(item =>
        item[filterColumn].toString().toLowerCase().includes(filterText.toLowerCase())
      )
    }
    if (sortColumn) {
      filtered.sort((a, b) => {
        if (sortColumn === 'status') {
          const auxA = new Date() > getExpiredDate(a.date, a.validity) ? 'Expirado' : 'Activo'
          const auxB = new Date() > getExpiredDate(b.date, b.validity) ? 'Expirado' : 'Activo'
          if (auxA < auxB) {
            return sortDirection === 'asc' ? -1 : 1
          }
          if (auxA > auxB) {
            return sortDirection === 'asc' ? 1 : -1
          }
          return 0
        } else {
          if (a[sortColumn] < b[sortColumn]) {
            return sortDirection === 'asc' ? -1 : 1
          }
          if (a[sortColumn] > b[sortColumn]) {
            return sortDirection === 'asc' ? 1 : -1
          }
          return 0
        }
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

  const handleRemovePeople = (certificatesToRemove: Certificate[]): void => {
    const certificatesToRemoveIds = certificatesToRemove.map(certificate => certificate.certification)
    setCertificates(certificates.filter(certificate => !certificatesToRemoveIds.includes(certificate.certification)))
  }

  const handleRowClick = (id: string): void => {
    navigate(`/imprimir-certificado?id=${id}`)
  }

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  const COLUMN_HEADERS: Array<Column<Certificate>> = [
    { Header: 'Certificación', accessor: 'certification' },
    { Header: 'Nombre completo', accessor: 'fullName' },
    { Header: 'Dni', accessor: 'dni' },
    { Header: 'Curso', accessor: 'course' },
    {
      Header: 'Estado',
      accessor: row => {
        return new Date() > getExpiredDate(row.date, row.validity) ? 'Expirado' : 'Activo'
      },
      id: 'status'
    },
    { Header: 'Nota', accessor: 'mark' },
    { Header: 'Cantidad de fechas', accessor: row => row.date.split(',').length },
    { Header: 'Última Fecha', accessor: row => row.date.split(',')[0].split('/').reverse().join('/') },
    {
      Header: 'Vencimiento',
      accessor: row => {
        const dates = row.date.split(',')
        const lastDate = dates[dates.length - 1].trim().split('/').reverse().join('/')
        return formatDate(getExpiredDate(lastDate, row.validity).toDateString())
      }
    },
    { Header: 'Compañia', accessor: 'company' },
    { Header: 'Duración', accessor: 'duration' }
  ]

  const filterMobile = (): ReactElement => (
    <>
      <div className='mb-2'>
        <p className='font-medium uppercase'>Filtro</p>
        <input
          type="text"
          value={filterText}
          className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none'
          placeholder='Enter value to filter'
          onChange={e => { setFilterText(e.target.value) }}
        />
      </div>
      <div>
        <p className='font-medium uppercase'>Columna a filtrar</p>
        <select value={filterColumn} onChange={handleChangeFilterColumn} className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none uppercase'>
          {
            FILTER_COLUMNS.map(({ value, name }, index) => (
              <option key={index} value={value}>{name}</option>
            ))
          }
        </select>
      </div>
    </>
  )

  const filterDesktop = (): ReactElement => (
    <>
      <div className='grid grid-cols-filter gap-4'>
        <p className='font-medium uppercase'>Filtro</p>
        <p className='font-medium uppercase'>Columna a filtrar</p>
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
            FILTER_COLUMNS.map(({ value, name }, index) => (
              <option key={index} value={value}>{name}</option>
            ))
          }
        </select>
      </div>
    </>
  )

  return (
    <main className='mb-5'>
      {isDeleteModalShowed && <DeleteModal close={closeDeleteModal} removeCertificates={handleRemovePeople} />}
      {isExcelModalShowed && <ImportExcel close={closeExcelModal} addCertificates={handleImportExcel} />}
      <div className='mb-4'>
        {isAboveSmallScreens ? filterDesktop() : filterMobile()}
      </div>

      <Table columns={COLUMN_HEADERS} data={filteredData} sortIcon={getSortIcon} setSortColumn={handleSortColumn} onRowClick={ isAdmin ? handleRowClick : () => {}} />
    </main >
  )
}

export default Certificates
