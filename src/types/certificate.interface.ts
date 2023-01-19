export interface Certificate {
  id: string
  fullName: string
  dni: string
  area: string
  course: string
  mark: number
  company: string
  modality: string
  duration: string
  validity: number
  certification: string
  date: string
  status: STATUS
}

export type STATUS = 'active' | 'expired'
