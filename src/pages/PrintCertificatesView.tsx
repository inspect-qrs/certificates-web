import { CertificatesService } from '@/api/certificates.service'
import Header from '@/components/Header'
import CertificateToPdf from '@/components/public/CertificatePdf'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

const PrintCertificatesView = (): ReactElement => {
  const certificatesService = new CertificatesService()
  const [certificateIds, setCertificateIds] = useState<string[]>([])
  const certificatesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const selectedRows = JSON.parse(localStorage.getItem('selectedRows') ?? '[]')
    if (selectedRows !== null && selectedRows.length > 0) {
      setCertificateIds(selectedRows)
    } else {
      getAllCertificateIds()
    }
  }, [])

  const getAllCertificateIds = (): void => {
    void certificatesService.findAll()
      .then(response => {
        setCertificateIds(response.map(certificate => certificate.id))
      })
  }

  const handlePrint = useReactToPrint({
    content: () => certificatesRef.current
  })

  return (
    <>
      <Header />
      <div>
      <button className='ml-4 px-4 py-1 rounded-lg text-white bg-red' onClick={handlePrint}>Imprimir</button>
        <div ref={certificatesRef}>
          {
            certificateIds.map(certificateId => (
              <CertificateToPdf key={certificateId} id={certificateId} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default PrintCertificatesView
