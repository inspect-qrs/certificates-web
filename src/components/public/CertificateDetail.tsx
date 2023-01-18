import { Certificate } from '@/types/certificate.interface'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

interface CertificateDetailProps {
  certificate: Certificate
}

const CertificateDetail = ({ certificate }: CertificateDetailProps): ReactElement => {
  const navigate = useNavigate()

  const handleClickShow = (): void => {
    navigate(`/imprimir-certificado?id=${certificate.id}`)
  }

  return (
    <div className='mt-5 p-3 shadow-card bg-gray-100'>
      <div className=''>
        <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
          <p className='font-semibold'>Nombre</p>
          <p className='capitalize'>{certificate.fullName.toLowerCase()}</p>
        </div>
        <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
          <p className='font-semibold'>Dni</p>
          <p>{certificate.dni}</p>
        </div>
        <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
          <p className='font-semibold'>Certificado</p>
          <p className='capitalize'>{certificate.course.toLowerCase()}</p>
        </div>
        <div className='grid grid-cols-[1fr_2fr] py-1 border-b border-gray-light'>
          <p className='font-semibold'>Emitido el</p>
          <p className='capitalize'>{new Date(certificate.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className='grid grid-cols-[1fr_2fr] py-1'>
          <p className='font-semibold'>Estado</p>
          <p>Activo</p>
        </div>
      </div>
      <button
        onClick={handleClickShow}
        className='bg-red text-white px-4 py-2 rounded-lg text-lg mt-4'
      >Mostrar certificado</button>
    </div>
  )
}

export default CertificateDetail
