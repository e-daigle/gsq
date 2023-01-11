export default interface IGarage {
  id: number;
  name: string;
  link: string;
  image: string;
  phone: string;
  address: string;
  marker: string;
  lat: number;
  lng: number;
  pos: {lat: number, lng: number};
}
