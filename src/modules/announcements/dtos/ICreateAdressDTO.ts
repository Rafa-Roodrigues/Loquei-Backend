export interface ICreateAdressDTO {
  id?: number;
  city: string;
  state: string;
  district: string;
  zip_code: string;
  adress: string;
  number: string;
  complement?: string;
  latitude: string;
  longitude: string;
}
