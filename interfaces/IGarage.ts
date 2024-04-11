export default interface IGarage {
  id: number;
  name: string;
  link: string;
  image: string;
  phone: string;
  address: string;
  marker: string;
  active: boolean;
  pos: {lat: number, lng: number};
}
