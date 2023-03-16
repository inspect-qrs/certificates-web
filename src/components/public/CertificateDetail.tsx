import { CertificatesService } from '@/api/certificates.service'
import { Certificate, STATUS } from '@/types/certificate.interface'
import React, { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface CertificateDetailProps {
  certificate: Certificate
  setCertificate: (certificate: Certificate) => void
}

const CertificateDetail = ({ certificate, setCertificate }: CertificateDetailProps): ReactElement => {
  const certificatesService = new CertificatesService()
  const navigate = useNavigate()

  const handleClickShow = (): void => {
    navigate(`/imprimir-certificado?id=${certificate.id}`)
  }

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' })
  }

  const getExpiredDate = (): string => {
    const date = new Date(certificate.date)
    date.setMonth(date.getMonth() + certificate.validity)

    return formatDate(date.toDateString())
  }

  const isBeforeToday = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const getStatus = (status: STATUS): string => {
    const statusDic = {
      active: 'activo',
      expired: 'expirado'
    }

    return statusDic[status]
  }

  useEffect(() => {
    const expiredDate = new Date(certificate.date)
    expiredDate.setMonth(expiredDate.getMonth() + certificate.validity)
    if (isBeforeToday(expiredDate) && certificate.status === 'active') {
      const { id, ...updateCertificate } = certificate
      updateCertificate.status = 'expired'
      void certificatesService.update(id, updateCertificate)
        .then(setCertificate)
    }
  }, [certificate])

  return (
    <div className='mt-5'>
      <p className={`${certificate.status === 'active' ? 'bg-success' : 'bg-red'} mb-4 rounded-lg text-white py-2 text-center uppercase font-bold`} >El certificado { certificate.status === 'active' ? 'es válido' : 'ha expirado'}</p>
      <div className='p-3 shadow-card bg-gray-100'>
        <div className=''>
          <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
            <p className='font-semibold'>Nombre</p>
            <p className='uppercase'>: {certificate.fullName.toLowerCase()}</p>
          </div>
          <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
            <p className='font-semibold'>DNI</p>
            <p className='uppercase'>: {certificate.dni}</p>
          </div>
          <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
            <p className='font-semibold'>Certificado</p>
            <p className='uppercase'>: {certificate.course.toLowerCase()}</p>
          </div>
          <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
            <p className='font-semibold'>Emitido el</p>
            <p className='uppercase'>: {certificate.date}</p>
          </div>
          <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
            <p className='font-semibold'>Vence el</p>
            <p className='uppercase'>: {getExpiredDate()}</p>
          </div>
          <div className='grid grid-cols-[1fr_2fr] py-1'>
            <p className='font-semibold'>Estado</p>
            <p className='uppercase'>: {getStatus(certificate.status)}</p>
          </div>
        </div>
        <button
          onClick={handleClickShow}
          className='bg-red text-white px-4 py-2 rounded-lg text-lg mt-4 uppercase'
        >Mostrar certificado</button>
      </div>
    </div>
  )
}

export default CertificateDetail
