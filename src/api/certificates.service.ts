import { Certificate } from '@/types/certificate.interface'
import { AppServices } from './api.service'

export class CertificatesService extends AppServices {
  constructor () {
    super({ url: 'certificates' })
  }

  findAll = async (): Promise<Certificate[]> => {
    return await this.get<Certificate[]>('')
      .then(response => response.data)
  }

  findAllByDni = async (dni: string): Promise<Certificate[]> => {
    return await this.get<Certificate[]>(`/dni/${dni}`)
      .then(response => response.data)
  }

  findOneById = async (id: string): Promise<Certificate> => {
    return await this.get<Certificate>(`/${id}`)
      .then(response => response.data)
  }

  importExcel = async (file: any): Promise<Certificate[]> => {
    return await this.post<Certificate[]>('/import-excel', file)
      .then(response => response.data)
  }

  removeMultiple = async (ids: string[]): Promise<Certificate[]> => {
    return await this.patch<Certificate[]>('/remove-multiple', { ids })
      .then(response => response.data)
  }
}
