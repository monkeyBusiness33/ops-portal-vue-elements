export interface IOrganisationTypeData {
  id: number
  tiny_repr: string
  short_repr: string
  full_repr: string
  details: {
    registered_name: string
    trading_name: any
    type: IType
  }
}
export interface IType {
  id: number
  name: string
}
