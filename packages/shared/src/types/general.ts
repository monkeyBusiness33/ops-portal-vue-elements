export interface ITypeReference {
  id: number
  name: string
}

export interface ILabeledEntity {
  id: number
  full_repr: string
}

export interface IDetailsReference {
  registered_name: string
  trading_name: any
}

export interface IPaginatedResponse<D> {
  links: {
    first: string | null
    last: string | null
    next: string | null
    prev: string | null
  }
  meta: {
    pagination: {
      page: number
      pages: number
      count: number
    }
  }
  results: D
}
