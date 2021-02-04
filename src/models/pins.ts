
export interface ICoords {
  lat: number,
  lng: number
}

export interface IPin {
  id: string,
  text: string,
  public?: boolean,

  coords: ICoords
}
